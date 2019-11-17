var _ = require('lodash'),
    Promise = require('bluebird'),
    assert = require('assert'),
    Connection = require('../lib/connection'),
    nock = require('nock');

const assetScope = nock('http://localhost-mock')
    .filteringRequestBody(body => {
        console.log(body);
        return true;
    })
    .post('/asset')
    .reply(200, {
        "success": true,
        "errors": [],
        "requestId": "6efc#16c8967a21f",
        "warnings": [],
        "result": [
            {
                "id": 4363,
                "name": "Smart List Test 01",
                "createdAt": "2019-06-03T23:01:13Z+0000",
                "updatedAt": "2019-06-04T17:37:45Z+0000",
                "url": "https://app-sjqe.marketo.com/#SL4363A1LA1"
            }
        ]
    });

const tokenScope = nock('http://localhost-mock')
    .filteringRequestBody(body => {
        console.log(body);
        return true;
    })
    .post('/rest/v1')
    .reply(200, {
        "moreResult": true,
        "nextPageToken": "string",
        "requestId": "string",
        "result": [
            {
            "id": 0,
            "membership": {
                "acquiredBy": false,
                "isExhausted": false,
                "membershipDate": "string",
                "nurtureCadence": "string",
                "progressionStatus": "string",
                "reachedSuccess": false,
                "stream": "string"
            },
            "reason": {
                "code": "string",
                "message": "string"
            },
            "status": "string"
            }
        ],
        "success": true
    });

const ASSET_URL = 'asset',
      TOKEN_URL = 'rest/v1',
      IDENTITY_URL = 'identity';

Connection.prototype.getOAuthToken = function() {
    return Promise.resolve({access_token: 'test_token'});
}

function getUrl(path) {
    return 'http://localhost-mock/' + path;
}
    
function getConnection() {
    var options = {
        endpoint: getUrl(''),
        identity: getUrl(IDENTITY_URL),
        clientId: 'someId',
        clientSecret: 'someSecret'
    };
    return new Connection(options);
}

describe('Connection', function() {
    it('token type pagination', function() {
        return getConnection().post(TOKEN_URL, {data: {_method: 'GET', maxReturn: 200}}).then(resp => {
            assert.equal(typeof resp.nextPage, 'function')
        });
    });

    it('offset type pagination', function() {
        return getConnection().post(ASSET_URL, {data: {_method: 'GET', maxReturn: 200}}).then(resp => {
            assert.equal(typeof resp.nextPage, 'function')
        });
    });
});
  