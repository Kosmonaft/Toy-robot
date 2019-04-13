#!/usr/bin/env node

'use strict';
var inquirer = require('inquirer');

let configData = {
    lengthX: 5,
    lengthY: 5,
    directions: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
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
            verifyInput(answer.robotMovement);
        } else {
            console.log('See you later!')
        }
    });
}


function verifyInput(answer) {
    let lowerCaseAnswer = answer.toLowerCase();
    if (lowerCaseAnswer === 'right' || lowerCaseAnswer === 'left') {
        rotateRobot();
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
    console.log('placeRobot');
    let robotCordinates = verifyPlaceCommand(answer);
    if(robotCordinates !== false){
        // robotCordinates[0] = x
        // robotCordinates[1] = y
        // robotCordinates[2] = f
    }
    askUser();
}

function verifyPlaceCommand(answer) {
    let answerParts = (answer.indexOf(',') !== -1 ) ? answer.split(',') :  answer.split(' ');

    if (answerParts.length !== 4) {
        console.log('Unvalid Place command. Please try again');
        return false;
    } else if (isNaN(Number(answerParts[1])) || isNaN(Number(answerParts[2]))) {
        console.log('Invalid position attributes. Please try again');
        return false;
    } else if ((Number(answerParts[1]) > configData.width - 1) || (Number(answerParts[2]) > configData.height - 1)) {
        console.log('Position out of the table');
        return false;
    } else if (configData.directions.indexOf(answerParts[3].toUpperCase()) === -1) {
        console.log('Unknown direction. Please try again');
        return false;
    }
    
    return answerParts.splice(0,1);
}

function rotateRobot(direction) {
    // rotate robot to left or right
    console.log('rotateRobot');
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
    console.log('Return robot position');
    console.log('****************************');
    askUser();
}



main();