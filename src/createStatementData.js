const createCalculator = require("./calculator/createCalculator");

module.exports = function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(p => {
    const perf = { ...p };
    perf.play = playFor(perf);
    const calculator = createCalculator(perf);
    perf.amount = calculator.amount;
    perf.volumeCredits = calculator.volumeCredits;
    return perf;
  });
  statementData.totalAmount = totalAmount(statementData.performances);
  statementData.totalVolumeCredits = totalVolumeCredits(
    statementData.performances
  );
  return statementData;

  //=========================================================

  function playFor(perf) {
    return plays[perf.playID];
  }

  function totalAmount(performances) {
    return performances.reduce((total, perf) => total + perf.amount, 0);
  }

  function totalVolumeCredits(performances) {
    return performances.reduce((total, perf) => total + perf.volumeCredits, 0);
  }
};
