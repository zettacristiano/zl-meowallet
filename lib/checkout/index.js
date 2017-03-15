var request = require('request');
var fs = require('fs');
var path = require('path');
var cnf = fs.readFileSync(path.resolve("./config.json"), 'utf8');
var env = "dev";
cnf = JSON.parse(cnf);

switch (process.env.NODE_ENV) {
  case "production":
  case "staging":
    env = "prod";
    break;
  case "test":
    env = "test";
    break;
}

var config = (cnf[env] || cnf['dev'] || {}).meowallet || {};
var sharedOptions = function(url) {
  return {
    url: config.url + url,
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'application/json',
      'Authorization': 'WalletPT ' + config.key
    }
  }
};

module.exports = {
  create: function createCheckout(payment, callback) {
    var options = sharedOptions('checkout');
    options.json = {
      "payment": payment,
      "url_confirm": config.url_confirm,
      "url_cancel": config.url_cancel
    };

    request.post(options, function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, body);
    });
  },

  get: function getCheckout(id, callback) {
    request.get(sharedOptions("checkout/" + id), function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, JSON.parse(body));
    });
  },

  delete: function deleteCheckout(id, callback) {
    request.del(sharedOptions("checkout/" + id), function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, JSON.parse(body));
    });
  }
};