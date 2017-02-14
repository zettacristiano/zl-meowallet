var fs = require('fs');
var path = require('path');
var cnf = fs.readFileSync(path.resolve("./config.json"), 'utf8');
var env = "dev";
switch (process.env.NODE_ENV) {
  case "production":
  case "staging":
    env = "prod";
    break;
  case "test":
    env = "prod";
    break;
}
var config = cnf[env].meowallet;

exports.checkout = require('./checkout');
exports.operations = require('./operations');