const statement = require("./plainTextStatement");

const invoice = require("./data/invoice");
const plays = require("./data/plays");

statement(invoice[0], plays); //?
