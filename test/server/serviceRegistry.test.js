'use strict';

const should = require('should');
const ServiceRegistry = require('../../server/serviceRegistry');

describe('ServiceRegistry', () => {
    describe('New Service', () => {
        it('Should accept a timeout beign passed in', () => {
            const serviceRegistry = new ServiceRegistry(42);
            serviceRegistry._timeout.should.equal(42);
        });
    });

    describe('Test Add / get intent method & update service', () => {
        it('Should add a new Intent and provide it via get', () => {
            const serviceRegistry = new ServiceRegistry(30);
            serviceRegistry.add('test', '127.0.0.1', 9999);
            const testIntent = serviceRegistry.get('test');
            testIntent.intent.should.equal('test');
            testIntent.ip.should.equal('127.0.0.1');
            testIntent.port.should.equal(9999);
        });

        it('Should update service', () => {
            const serviceRegistry = new ServiceRegistry(30);
            serviceRegistry.add('test', '127.0.0.1', 9999);
            const testIntent = serviceRegistry.get('test');

            serviceRegistry.add('test', '127.0.0.1', 9999);
            const testIntent1 = serviceRegistry.get('test');

            Object.keys(serviceRegistry._services).length.should.equal(1);
            testIntent1.timestamp.should.be.greaterThanOrEqual(testIntent.timestamp);
        });
    });

    describe('Remove service', () => {
        it('should remove service from registry', () => {
            const serviceRegistry = new ServiceRegistry(30);
            serviceRegistry.add('test', '127.0.0.1', 9999);
            serviceRegistry.remove('test', '127.0.0.1', 9999);
            const testIntent = serviceRegistry.get('test');
            should.not.exist(testIntent);
        });
    });

    describe('Cleanup', () => {
        it('Remove expired services', () => {
            const serviceRegistry = new ServiceRegistry(-1);
            serviceRegistry.add('test', '127.0.0.1', 9999);
            const testIntent = serviceRegistry.get('test');
            should.not.exist(testIntent);
        });
    });
});

