//===================================================================
// All Global Variables
//===================================================================

//static settings
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10; 
var w = 350;
var h = 350;
var score = 0;
var high = 0;
var click = false;

//dynamically created variables
var snake;
var food;
//We first test a single enemy snake
var enemy;
/*
//key code enums
//http://keycode.info
var keys = {
	ENTER: 13,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};
*/