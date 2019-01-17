class PerformanceCalculator {
  constructor(aPerformance) {
    this.performance = aPerformance;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

module.exports = PerformanceCalculator;
