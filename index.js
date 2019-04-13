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

var movementPrompt = {
    type: 'input',
    name: 'robotMovement',
    message: 'What is your command?'
};

function main() {
    console.log('This is Toy Robot Simulator');
    askUser();
}

function askUser() {
    inquirer.prompt(movementPrompt).then(answer => {
        if (answer.robotMovement.toLowerCase() !== 'exit') {
            if (!appData.appInit && answer.robotMovement.toLowerCase().indexOf('place') === -1) {
                console.log('The first command has to be PLACE X,Y,Z')
                askUser();
            } else {
                verifyInput(answer.robotMovement);
            }
        } else {
            console.log('See you later!')
        }
    });
}


function verifyInput(answer) {
    let lowerCaseAnswer = answer.toLowerCase();
    if (lowerCaseAnswer === 'right' || lowerCaseAnswer === 'left') {
        rotateRobot(lowerCaseAnswer);
    } else if (lowerCaseAnswer === 'prompt') {
        promptPosition();
    } else if (lowerCaseAnswer === 'move') {
        moveRobot();
    } else if (lowerCaseAnswer.indexOf('place') !== -1) {
        placeRobot(answer);
    } else {
        console.log('Sorry I did\'t get this. Please try again');
        askUser();
    }
}

function placeRobot(answer) {
    let robotCordinates = verifyPlaceCommand(answer);
    if (robotCordinates !== false) {
        
        if(!appData.appInit){
            appData.appInit = true;
        }

        appData.currentPosition = [robotCordinates[0], robotCordinates[1], robotCordinates[2]];
    }
    askUser();
}

function verifyPlaceCommand(answer) {
    let answerParts = answer.trim().split(/(?:\s+|,\s*)/i);

    if (answerParts.length !== 4) {
        console.log('Unvalid Place command. Please try again');
        return false;
    } else if (isNaN(Number(answerParts[1])) || isNaN(Number(answerParts[2]))) {
        console.log('Invalid position attributes. Please try again');
        return false;
    } else if ((Number(answerParts[1]) > appData.lengthX - 1) || (Number(answerParts[2]) > appData.lengthY - 1)) {
        console.log('Position out of the table');
        return false;
    } else if (appData.directions.indexOf(answerParts[3].toUpperCase()) === -1) {
        console.log('Unknown direction. Please try again');
        return false;
    }

    return answerParts.splice(1);
}

function rotateRobot(direction) {
    let changeTo = 1;
    if(direction.toLowerCase() === 'left'){
        changeTo = -1;
    }
    let currentFacingPosition = appData.directions.indexOf(appData.currentPosition[2].toUpperCase());
    let newPosition = currentFacingPosition + changeTo;
    if(newPosition < 0) {
        newPosition = appData.directions.length - 1 ;
    } else if( newPosition > appData.directions.length - 1){
        newPosition = 0;
    }
    appData.currentPosition[2] = appData.directions[newPosition];
    askUser();
}

function moveRobot() {
    if (a == 'a') { // can move

    } else { // else return error

    }
    console.log('moveRobot');
    askUser();
}

function promptPosition() {
    console.log('****** ROBOT POSITION ******');
    console.log('The ROBOT position is: ' + appData.currentPosition.join(',').toUpperCase());
    console.log('****************************');
    askUser();
}



main();