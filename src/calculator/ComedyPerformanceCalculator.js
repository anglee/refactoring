const PerformanceCalculator = require("./PerformanceCalculator");

class ComedyPerformanceCalculator extends PerformanceCalculator {
  constructor(aPerformance) {
    super(aPerformance);
  }

  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

module.exports = ComedyPerformanceCalculator;