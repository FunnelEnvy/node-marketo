var _ = require('lodash'),
    Promise = require('bluebird'),
    util = require('../util'),
    log = util.logger();

var LISTS = util.createAssetPath('smartLists.json');

function SmartList(marketo, connection) {
  this._marketo = marketo;
  this._connection = connection;
}

SmartList.prototype = {
  find: function(options) {
    var arrayFields = [];
    options = _.extend({}, options, {
      _method: 'GET'
    });
    options = util.arrayToCSV(options, arrayFields);
    return this._connection.post(LISTS, {data: options});
  },

  byId: function(listId) {
    return this.find({id: [listId]});
  }
};

module.exports = SmartList;