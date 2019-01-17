const ComedyPerformanceCalculator = require("./ComedyPerformanceCalculator");
const TragedyPerformanceCalculator = require("./TragedyPerformanceCalculator");

const createCalculator = aPerformance => {
  switch (aPerformance.play.type) {
    case "comedy":
      return new ComedyPerformanceCalculator(aPerformance);
    case "tragedy":
      return new TragedyPerformanceCalculator(aPerformance);
    default:
      throw new Error(`Unknown play type ${aPerformance.play.type}`);
  }
};

module.exports = createCalculator;
