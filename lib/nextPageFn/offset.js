var _ = require('lodash');

module.exports =  (conn, method, args, options) => {
    return (offset) => {
        var params = options;
        if (method === 'get') {
            params = options.query = options.query || {};
        } else if (method === 'post' || method === 'put') {
            params = options.data = options.data || {};
        }

        params.offset = offset;

        return conn._request.apply(conn, _.flatten([method, args, options], true));
    }
};
