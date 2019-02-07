const createStatementData = require("./createStatementData");
const renderPlainText = require("./renderPlainText");

function statement(invoice, plays) {
  const statementData = createStatementData(invoice, plays);
  return renderPlainText(statementData);
}

module.exports = statement;
