var request = require('request');

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