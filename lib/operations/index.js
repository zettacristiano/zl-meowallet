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
  getOperations: function getOperations(query, callback) {
    var options = sharedOptions('operations/?' + query);

    request.get(options, function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, body);
    });
  },

  getOperation: function getOperation(id, callback) {
    var options = sharedOptions('operations/' + id);

    request.get(options, function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, body);
    });
  },

  refund: function refundOperation(id, type, callback) {
    var options = sharedOptions('operations/' + id + '/refund');
    options.json = { 'type': type };

    request.get(options, function(error, response, body) {
      if (error) { return callback(error, null); }
      return callback(null, body);
    });
  }
};