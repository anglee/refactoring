const PerformanceCalculator = require("./PerformanceCalculator");

module.exports = class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    // add extra credit for every ten comedy attendees
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
};
