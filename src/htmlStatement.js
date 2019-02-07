const createStatementData = require("./createStatementData");
const renderHtml = require("./renderHtml");

function statement(invoice, plays) {
  const statementData = createStatementData(invoice, plays);
  return renderHtml(statementData);
}

module.exports = statement;
