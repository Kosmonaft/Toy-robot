#!/usr/bin/env node

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
        invalidPosition: `Invalid position attributes. X should be between 0 and ${appData.lengthX}, Y Should be between 0 and ${appData.lengthY}. Please try again`,
        wrongPositionTypes: 'The position attributes have to be numbers'
    }
}

var movementPrompt = {
    type: 'input',
    name: 'robotMovement',
    message: 'What is your command?'
};

function main() {
    console.log(appMessages.welcome);
    askUser();
}

function askUser() {
    inquirer.prompt(movementPrompt).then(answer => {
        if (answer.robotMovement.toLowerCase() !== 'exit') {
            if (!appData.appInit && answer.robotMovement.toLowerCase().indexOf('place') === -1) {
                console.log(appMessages.wrongInitCommand)
                askUser();
            } else {
                verifyInput(answer.robotMovement);
            }
        } else {
            console.log(appMessages.exit)
        }
    });
}


function verifyInput(answer) {
    let lowerCaseAnswer = answer.toLowerCase();
    if (lowerCaseAnswer === 'right' || lowerCaseAnswer === 'left') {
        rotateRobot(lowerCaseAnswer);
    } else if (lowerCaseAnswer === 'report') {
        reportPosition();
    } else if (lowerCaseAnswer === 'move') {
        moveRobot();
    } else if (lowerCaseAnswer.indexOf('place') !== -1) {
        placeRobot(answer);
    } else {
        console.log(appMessages.unknownCommand);
        askUser();
    }
}

function placeRobot(answer) {
    let robotCordinates = verifyPlaceCommand(answer);
    if (robotCordinates !== false) {

        if (!appData.appInit) {
            appData.appInit = true;
        }

        appData.currentPosition = [robotCordinates[0], robotCordinates[1], appData.directions.indexOf(robotCordinates[2].toUpperCase())];
    }
    askUser();
}

function verifyPlaceCommand(answer) {
    let answerParts = answer.trim().split(/(?:\s+|,\s*)/i);

    if (answerParts.length !== 4) {
        console.log(appMessages.place.invalidCommand);
        return false;
    } else if (isNaN(Number(answerParts[1])) || isNaN(Number(answerParts[2]))) {
        console.log(appMessages.place.wrongPositionTypes);
        return false;
    } else if ((Number(answerParts[1]) > appData.lengthX - 1) || (Number(answerParts[2]) > appData.lengthY - 1) || (Number(answerParts[1]) < 0) || (Number(answerParts[2]) < 0 )) {
        console.log(appMessages.outOfTable);
        console.log(appMessages.place.invalidPosition)
        return false;
    } else if (appData.directions.indexOf(answerParts[3].toUpperCase()) === -1) {
        console.log(appMessages.place.wrongDirection);
        return false;
    }

    return answerParts.splice(1);
}

function rotateRobot(direction) {
    let changeTo = 1;
    if (direction.toLowerCase() === 'left') {
        changeTo = -1;
    }

    let newPosition = appData.currentPosition[2] + changeTo;
    if (newPosition < 0) {
        newPosition = appData.directions.length - 1;
    } else if (newPosition > appData.directions.length - 1) {
        newPosition = 0;
    }
    appData.currentPosition[2] = appData.directions[newPosition];
    askUser();
}

function moveRobot() {
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
    askUser();
}

function reportPosition() {
    let currentPosition = appData.currentPosition;
    currentPosition[2] = appData.directions[currentPosition[2]];
    console.log('****** ROBOT POSITION ******');
    console.log('The ROBOT position is: ' + currentPosition.join(',').toUpperCase());
    console.log('****************************');
   // askUser();
}

main();