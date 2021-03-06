'use strict';

require('should');
const config = require('../../config');
const SlackClient = require('../../server/slackClient');

describe('SlackClient', () => {
    describe('slackClient connect', () => {
        it('Should successfully connect to slack', (done) => {
            const slackClient = new SlackClient(config.slackToken, config.slackLogLevel, null, null, config.log('test'));
            slackClient.start((slackRes) => {
                slackRes.ok.should.be.true;
                return done();
            });
        });
    });
});