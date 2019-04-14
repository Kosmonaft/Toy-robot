'use strict';
var inquirer = require('inquirer');

let appData = {
    lengthX: 5,
    lengthY: 5,
    directions: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
    appInit: false,
    currentPosition: [null, null, null]
}

let appMessages = {
    welcome: 'This is Toy Robot Simulator',
    exit: 'See you later!',
    outOfTable: 'Position out of the table',
    unknownCommand: `Sorry I did't get this. Please try again`,
    wrongInitCommand: 'The first command has to be PLACE X,Y,Z',
    place: {
        wrongDirection: 'Unknown direction. Please try again',
        invalidCommand: 'Invalid PLACE command. Please try again',
        invalidPosition: `Invalid position attributes. X should be between 0 and ${appData.lengthX - 1}, Y Should be between 0 and ${appData.lengthY - 1}. Please try again`,
        wrongPositionTypes: 'The position attributes have to be numbers'
    }
}

const movementPrompt = {
    type: 'input',
    name: 'robotMovement',
    message: 'What is your command?'
};

const main = () => {
    console.log(appMessages.welcome);
    toyRobot.askUser();
}

const askUser = () => {
    inquirer.prompt(movementPrompt).then(answer => {
        if (answer.robotMovement.toLowerCase() !== 'exit') {
            if (!appData.appInit && answer.robotMovement.toLowerCase().indexOf('place') === -1) {
                console.log(appMessages.wrongInitCommand)
                toyRobot.askUser();
            } else {
                toyRobot.verifyInput(answer.robotMovement);
            }
        } else {
            console.log(appMessages.exit)
        }
    });
}


const verifyInput = (answer) => {
    let lowerCaseAnswer = answer.toLowerCase();
    if (lowerCaseAnswer === 'right' || lowerCaseAnswer === 'left') {
        toyRobot.rotateTheRobot(lowerCaseAnswer);
    } else if (lowerCaseAnswer === 'report') {
        toyRobot.reportPosition();
    } else if (lowerCaseAnswer === 'move') {
        toyRobot.moveRobot();
    } else if (lowerCaseAnswer.indexOf('place') !== -1) {
        toyRobot.placeRobot(answer);
    } else {
        console.log(appMessages.unknownCommand);
        toyRobot.askUser();
    }
}

const placeRobot = (answer) => {
    let robotCordinates = toyRobot.verifyPlaceCommand(answer);
    if (robotCordinates !== false) {

        if (!appData.appInit) {
            appData.appInit = true;
        }

        appData.currentPosition = [robotCordinates[0], robotCordinates[1], appData.directions.indexOf(robotCordinates[2].toUpperCase())];
    }
    toyRobot.askUser();
}

const verifyPlaceCommand = (answer) => {
    let answerParts = answer.trim().split(/(?:\s+|,\s*)/i);
    let positionX = Number(answerParts[1]);
    let positionY = Number(answerParts[2]);

    if (answerParts.length !== 4) {
        console.log(appMessages.place.invalidCommand);
        return false;
    } else if (isNaN(positionX) || isNaN(positionY)) { // Position parameters are not numbers
        console.log(appMessages.place.wrongPositionTypes);
        return false;
    } else if (positionX > appData.lengthX - 1 || positionY > appData.lengthY - 1 || positionX < 0 || positionY < 0) {  // Position parameters are out of board range
        console.log(appMessages.outOfTable);
        console.log(appMessages.place.invalidPosition)
        return false;
    } else if (appData.directions.indexOf(answerParts[3].toUpperCase()) === -1) { // Facing parameter is invalid
        console.log(appMessages.place.wrongDirection);
        return false;
    }

    return answerParts.splice(1);
}

const rotateTheRobot = (direction) => {
    let changeTo = (direction.toLowerCase() === 'left') ? -1 : 1;
    let newPosition = appData.currentPosition[2] + changeTo;
    if (newPosition < 0) {
        newPosition = appData.directions.length - 1;
    } else if (newPosition > appData.directions.length - 1) {
        newPosition = 0;
    }
    appData.currentPosition[2] = newPosition;
    toyRobot.askUser();
}

const moveRobot = () => {
    let currentDirectionIndex = appData.currentPosition[2];
    let moveRobotTo = (currentDirectionIndex <= 1) ? 1 : -1;
    let moveDirection = (currentDirectionIndex % 2 == 0) ? 'lengthY' : 'lengthX';

    let newPosition = (moveDirection == 'lengthY') ? Number(appData.currentPosition[1]) : Number(appData.currentPosition[0]);
    newPosition += Number(moveRobotTo);
    if (newPosition >= appData[moveDirection] || newPosition < 0) {
        console.log(appMessages.outOfTable);
    } else {
        (moveDirection == 'lengthY') ? appData.currentPosition[1] = newPosition : appData.currentPosition[0] = newPosition;
    }
    toyRobot.askUser();
}

const reportPosition = () => {
    let currentPosition = appData.currentPosition;
    currentPosition[2] = appData.directions[currentPosition[2]];
    console.log(`******** ROBOT POSITION ********\nThe position of the ROBOT is: ${currentPosition.join(',').toUpperCase()}\n********************************`);
    toyRobot.askUser();
}

const toyRobot = {
    main, askUser, verifyInput, placeRobot, verifyPlaceCommand, rotateTheRobot, moveRobot, reportPosition, appMessages, appData
}
module.exports = toyRobot;
