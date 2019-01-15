const statement = require("./statement");
const invoice = require("./data/invoice");
const plays = require("./data/plays");

describe("statement", () => {
  it("prints plain text statement with given invoice and plays", () => {
    expect(statement(invoice[0], plays)).toMatchSnapshot();
  });
});
