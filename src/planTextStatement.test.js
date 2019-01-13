const plainTextStatement = require("./plainTextStatement");
const invoice = require("./data/invoice");
const plays = require("./data/plays");

describe("plainTextStatement", () => {
  it("prints plain text statement with given invoice and plays", () => {
    expect(plainTextStatement(invoice[0], plays)).toMatchSnapshot();
  });
});
