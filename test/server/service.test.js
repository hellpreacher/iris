'use strict';

require('should');
const request = require('supertest');
const config = require('../../config');
const service = require('../../server/service')(config);


describe('The express service', () => {
    describe('PUT /foo', ()=> {
        it('Should return HTTP 404', (done) => {
            request(service).put('/foo').expect(404, done);
        });
    });

    describe('Put /service/:intent/:port', () => {
        it('Should return HTTP 200 with valid result', (done) => {
            request(service)
                .put('/service/test/9999')
                .set('X-IRIS-API-TOKEN', config.irisApiToken)
                .set('X-IRIS-SERVICE-TOKEN', 'something')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.result.should.startWith('test at');
                    return done();
                });
        });

        it('Should return HTTP 403 with no API token provided', (done) => {
            request(service)
                .put('/service/test/9999')
                .expect(403)
                .end(done);
        });
    });
});