const statement = require("./statement");

const [invoice] = require("./data/invoice");
const plays = require("./data/plays");

statement(invoice, plays); //?
