var assert = require('assert'),
  _ = require('lodash'),
  marketo = require('./helper/connection');

describe('SmartLists', function () {
  describe('#find', function () {
  	it('displays list of smart lists', function (done) { 
      marketo.smartList.find({ maxReturn: 200 }).then(function (response) {
      	assert.equal(response.success, true);
        assert.equal(response.errors.length, 0);
        assert(_.has(response.result[0], 'name'));
        assert(_.has(response.result[0], 'workspace'));
        done();
      }).catch(done);
    });
  });
});