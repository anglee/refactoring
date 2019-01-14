const htmlStatement = require("./htmlStatement");
const invoice = require("./data/invoice");
const plays = require("./data/plays");

describe("htmlStatement", () => {
  it("prints html statement with given invoice and plays", () => {
    expect(htmlStatement(invoice[0], plays)).toMatchSnapshot();
  });
});
