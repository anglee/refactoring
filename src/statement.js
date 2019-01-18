const usd = require("./utils/usd");

function statement(invoice, plays) {

  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(p => {
    const perf = { ...p };
    perf.play = playFor(perf);
    perf.amount = amountFor(perf);
    perf.volumeCredits = volumeCreditsFor(perf);
    return perf;
  });

  statementData.totalAmount = totalAmount(statementData.performances);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData.performances);

  return renderPlainText(statementData);

  //=========================================================

  function playFor(perf) {
    return plays[perf.playID];
  }
  function amountFor(perf) {
    let ret = 0;

    switch (perf.play.type) {
      case "tragedy":
        ret = 40000;
        if (perf.audience > 30) {
          ret += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        ret = 30000;
        if (perf.audience > 20) {
          ret += 10000 + 500 * (perf.audience - 20);
        }
        ret += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${perf.play.type}`);
    }

    return ret;
  }
  function volumeCreditsFor(perf) {
    let ret = 0;

    // add volume credits
    ret += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === perf.play.type) {
      ret += Math.floor(perf.audience / 5);
    }

    return ret;
  }
  function totalAmount(performances) {
    let totalAmount = 0;
    for (let perf of performances) {
      totalAmount += perf.amount;
    }
    return totalAmount;
  }
  function totalVolumeCredits(performances) {
    let volumeCredits = 0;
    for (let perf of performances) {
      volumeCredits += perf.volumeCredits;
    }
    return volumeCredits;
  }
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

module.exports = statement;
