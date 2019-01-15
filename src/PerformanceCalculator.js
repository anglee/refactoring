class PerformanceCalculator {
  constructor (aPerformance) {
    this.performance = aPerformance;
  }

  get amount() {
    let result = 0;

    switch (this.performance.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.performance.play.type}`);
    }

    return result;
  }

  get volumeCredits() {
    let volumeCredits = 0;

    // add volume credits
    volumeCredits += Math.max(this.performance.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === this.performance.play.type) {
      volumeCredits += Math.floor(this.performance.audience / 5);
    }

    return volumeCredits;
  }
}

module.exports = PerformanceCalculator;
