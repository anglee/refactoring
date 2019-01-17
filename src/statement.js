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
    let result = 0;

    switch (perf.play.type) {
      case "tragedy":
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${perf.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let result = 0;
    // add volume credits
    result += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === perf.play.type) {
      result += Math.floor(perf.audience / 5);
    }
    return result;
  }

  function totalAmount(performances) {
    return performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(performances) {
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
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
