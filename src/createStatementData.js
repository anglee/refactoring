const PerformanceCalculator = require("./PerformanceCalculator");

function createStatementData(invoice, plays) {
  const performances = invoice.performances.map(performance => {
    const perf = { ...performance };
    perf.play = playFor(perf);

    const calculator = new PerformanceCalculator(perf);
    perf.amount = calculator.amount;
    perf.volumeCredits = calculator.volumeCredits;
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

  function totalAmount(performances) {
    return performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(performances) {
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

module.exports = createStatementData;
