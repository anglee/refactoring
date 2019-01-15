const PerformanceCalculator = require("./PerformanceCalculator");

function createStatementData(invoice, plays) {
  const performances = invoice.performances.map(performance => {
    const calculator = new PerformanceCalculator(performance);

    const perf = { ...performance };
    perf.play = playFor(perf);
    perf.amount = amountFor(perf);
    perf.volumeCredits = volumeCreditsFor(perf);
    return perf;
  });
  const statementData = {
    customer: invoice.customer,
    performances,
    totalAmount: totalAmount(performances),
    totalVolumeCredits: totalVolumeCredits(performances)
  };
  return statementData;

  //============================================================================
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let volumeCredits = 0;

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === perf.play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    return volumeCredits;
  }

  function totalAmount(performances) {
    return performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(performances) {
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

module.exports = createStatementData;
