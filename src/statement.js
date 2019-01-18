const usd = require("./utils/usd");

function statement(invoice, plays) {
  return renderPlainText(invoice, plays);
}

function renderPlainText(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
      } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  //=========================================================

  function amountFor(perf) {
    let ret = 0;

    switch (playFor(perf).type) {
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
        throw new Error(`unknown type: ${playFor(perf).type}`);
    }

    return ret;
  }

  function playFor(perf) {
    return plays[perf.playID];
  }

  function volumeCreditsFor(perf) {
    let ret = 0;

    // add volume credits
    ret += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === playFor(perf).type) {
      ret += Math.floor(perf.audience / 5);
    }

    return ret;
  }

  function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }
}

module.exports = statement;
