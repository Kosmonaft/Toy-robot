var assert = require('assert');
var expect = require('chai').expect;
var robotApp = require('../index.js');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Robot test', function () {
    describe('Main', function () {
        it('should return false with wrong position', function () {
            expect(robotApp.verifyPlaceCommand('PLACE 3')).to.be.false;
        })
    })
})