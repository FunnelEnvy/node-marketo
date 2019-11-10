var _ = require('lodash'),
    env = process.env,
    defaults = {
      endpoint: 'https://402-GVR-527.mktorest.com/rest',
      identity: 'https://402-GVR-527.mktorest.com/identity',
      clientId: 'bcd0b3f6-b65c-4dba-965f-606cb5b199e9',
      clientSecret: '23BE0UfSPLmjZtOct7W4y0xzdJWKey5r'
    },
    credentials;

credentials = {
  endpoint: env.MARKETO_ENDPOINT || defaults.endpoint,
  identity: env.MARKETO_IDENTITY || defaults.identity,
  clientId: env.MARKETO_CLIENT_ID || defaults.clientId,
  clientSecret: env.MARKETO_CLIENT_SECRET || defaults.clientSecret
};

module.exports = {
  creds: {
    defaults: defaults,
    computed: credentials
  }
};
