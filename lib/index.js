var path = require('path');
var configFile = require(path.resolve('./config.json'));
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
var config = configFile[env].meowallet;

exports.checkout = require('./checkout');
exports.operations = require('./operations');