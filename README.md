# Toy-robot

## Installation
Install a mocha (js test framework) globally
`npm install --global mocha`

Install instanbul (js coverage) globally
`npm install --global nyc`

Install All packages for toy-robot app
`npm install`

## Start the program
Open your terminal and type
`npm start`

To run the test 
`npm test`

The tests are written in mocha and an additional libarary called instanbul (nyc) is used for coverage


## Test data

The expected output is based on re-run the app each time.
If you didn't stop (type: exit) and run again the app, EXAMPLE 4 and EXAMPLE 5 will have different output

Example 1
------------

PLACE 2, 3, NORTH
MOVE
LEFT
REPORT


Expected output:

The position of the ROBOT is: 2, 4, WEST


Example 2
------------

PLACE 0, 2, WEST
MOVE
LEFT
MOVE
MOVE
REPORT


Expected output:

The position of the ROBOT is: 0, 0, SOUTH


Example 3
------------

PLACE 4, 2, EAST
MOVE
RIGHT
MOVE
MOVE
LEFT
REPORT


Expected output:

The position of the ROBOT is: 4, 0, EAST


Example 4
------------

PLACE 2, 5, EAST


Expected output:

Position out of the table
Invalid position attributes. X should be between 0 and 4, Y Should be between 0 and 4. Please try again


Example 5
------------

PLACE 2, 5, EAST
REPORT


Expected output:

Position out of the table
Invalid position attributes. X should be between 0 and 4, Y Should be between 0 and 4. Please try again

The first command has to be PLACE X,Y,Z




