var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var robotApp = require('../app/robot');
var sandbox = require('sinon').createSandbox();
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
        sandbox.restore();
    })


    it('should trigger the rotate method', function () {
        let consoleCommand = 'Left';
        let rotateRobotStub = sandbox.stub(robotApp, 'rotateTheRobot');
        robotApp.verifyInput(consoleCommand);

        assert(rotateRobotStub.called)
    });

    it('should trigger the report method', function () {
        let consoleCommand = 'report';
        let reportStub = sandbox.stub(robotApp, 'reportPosition');

        robotApp.verifyInput(consoleCommand);

        assert(reportStub.called)
    });

    it('should trigger the move method', function () {
        let consoleCommand = 'MOVE';
        let moveRobotStub = sandbox.stub(robotApp, 'moveRobot');

        robotApp.verifyInput(consoleCommand);

        assert(moveRobotStub.called)
    });

    it('should trigger the place method', function () {
        let consoleCommand = 'Place 2,3,North';
        let placeRobotStub = sandbox.stub(robotApp, 'placeRobot');

        robotApp.verifyInput(consoleCommand);

        assert(placeRobotStub.called)
    });


    it('should ignore unknown methods', function () {
        let consoleCommand = 'Dance';

        let askUserStub = sandbox.stub(robotApp, 'askUser');
        robotApp.verifyInput(consoleCommand);

        expect(console.log.calledOnce).to.be.true;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.unknownCommand);
        assert(askUserStub.called)
    });

})

describe('verifyPlaceCommand function test', function () {
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore()
    })

    it('should return false and show message that the PLACE command is invalid', function () {
        let consoleCommand = 'PLACE X, Y';

        let runCommandResult = robotApp.verifyPlaceCommand(consoleCommand);

        expect(runCommandResult).to.be.false;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.place.invalidCommand);
    });

    it('should return false and show message that the Position parameters are not numbers', function () {
        let consoleCommand = 'PLACE X, Y, North';

        let runCommandResult = robotApp.verifyPlaceCommand(consoleCommand);

        expect(runCommandResult).to.be.false;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.place.wrongPositionTypes);
    });

    it('should return false and show messages that position out of table and the Position parameters are out of board range', function () {
        let consoleCommand = `PLACE -1, ${robotApp.appData.lengthY +5 }, North`;

        let runCommandResult = robotApp.verifyPlaceCommand(consoleCommand);

        expect(runCommandResult).to.be.false;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.outOfTable);
        expect(console.log.args[1][0]).to.equal(robotApp.appMessages.place.invalidPosition);
    });

    it('should return false and show messages that Facing parameter is invalid', function () {
        let consoleCommand = `PLACE 0,0, SouthEast`;

        let runCommandResult = robotApp.verifyPlaceCommand(consoleCommand);

        expect(runCommandResult).to.be.false;
        expect(console.log.args[0][0]).to.equal(robotApp.appMessages.place.wrongDirection);
    });

    it('should return Array with 3 parameters', function () {
        let positionX = 0, positionY = 0, facing ='NORTH';
        let consoleCommand = `PLACE ${positionX}, ${positionY}, ${facing}`;

        let runCommandResult = robotApp.verifyPlaceCommand(consoleCommand);

        expect(runCommandResult).to.be.an('array').to.have.length(3);

    });
    
})

describe('rotateRobot function test', function(){
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore();
        sandbox.restore();
    })
    it('should rotate the robot and face direction 0', function(){
        robotApp.appData.currentPosition = ['1', '2', 3];
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.rotateTheRobot('right'))

        expect(robotApp.appData.currentPosition[2]).to.be.equal(0);
    });

    it('should rotate the robot and face direction 3', function(){
        robotApp.appData.currentPosition = ['1', '2', 0];
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.rotateTheRobot('left'))

        expect(robotApp.appData.currentPosition[2]).to.be.equal(3);
    });
})

describe('MoveRobot function test', function(){
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore();
        sandbox.restore();
    })
    it('should prevent moving and return message that will be out of table', function(){
        let westPosition = robotApp.appData.directions.indexOf('WEST');
        robotApp.appData.currentPosition = [0, '2', westPosition];
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.moveRobot())
        expect(console.log.args[0][0]).to.be.equal(robotApp.appMessages.outOfTable);
    });
    it('should move the robot forward', function(){
        let westPosition = robotApp.appData.directions.indexOf('WEST');
        robotApp.appData.currentPosition = [1, '2', westPosition];
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.moveRobot())
        expect(robotApp.appData.currentPosition[0]).to.be.equal(0);
    });

})

describe('reportPosition function test', function(){
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore();
        sandbox.restore();
    });

    it('should return the position of the robot', function(){
        let westPosition = robotApp.appData.directions.indexOf('WEST');
        robotApp.appData.currentPosition = ['0', '2', westPosition];
        let expectedPositionOutcome = `******** ROBOT POSITION ********\nThe position of the ROBOT is: 0,2,WEST\n********************************`
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.reportPosition());
        expect(console.log.args[0][0]).to.be.equal(expectedPositionOutcome);
    });

})

describe('placeRobot function test', function(){
    beforeEach(() => {
        sinon.spy(console, 'log')
    })

    afterEach(() => {
        console.log.restore();
        sandbox.restore();
    });

    it('should ignore placement', function(){
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.placeRobot(`PLACE robot`));
        expect(robotApp.appData.appInit).to.be.false;
    });

    it('should init the app as PLACE is valid', function(){
        let askUserStub = sandbox.stub(robotApp, 'askUser');
        let callTestFunction = sandbox.spy(robotApp.placeRobot(`PLACE 2, 2, WEST`));
        expect(robotApp.appData.appInit).to.be.true;
    });

})