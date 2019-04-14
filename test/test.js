var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var robotApp = require('../app/robot');


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
/*
describe('Robot test', function () {
    describe('Main', function () {
        it('should return false with wrong position', function () {
            expect(robotApp.verifyPlaceCommand('PLACE 3')).to.be.false;
        })
    })
})
*/
describe('verifyInput function test', function () {
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore()
    })


    it('should trigger the rotate method', function () {
        let consoleCommand = 'Left';
        let rotateRobotStub = sinon.stub(robotApp, 'rotateRobot');
        robotApp.verifyInput(consoleCommand);

        assert(rotateRobotStub.called)
    });

    it('should trigger the report method', function () {
        let consoleCommand = 'report';
        let reportStub = sinon.stub(robotApp, 'reportPosition');

        robotApp.verifyInput(consoleCommand);

        assert(reportStub.called)
    });

    it('should trigger the move method', function () {
        let consoleCommand = 'MOVE';
        let moveRobotStub = sinon.stub(robotApp, 'moveRobot');

        robotApp.verifyInput(consoleCommand);

        assert(moveRobotStub.called)
    });

    it('should trigger the place method', function () {
        let consoleCommand = 'Place 2,3,North';
        let placeRobotStub = sinon.stub(robotApp, 'placeRobot');

        robotApp.verifyInput(consoleCommand);

        assert(placeRobotStub.called)
    });


    it('should ignore unknown methods', function () {
        let consoleCommand = 'Dance';

        let askUserStub = sinon.stub(robotApp, 'askUser');
        robotApp.verifyInput(consoleCommand);

        expect(console.log.calledOnce).to.be.true;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.unknownCommand);
        assert(askUserStub.called)
    });

})