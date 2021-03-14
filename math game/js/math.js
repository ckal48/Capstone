/***** ELEMENTS *****/
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var inputField = document.getElementById("in");
var form = document.querySelector("form");
var p = document.getElementById("p");
var q = document.getElementById("q");
var op = document.getElementById("op");
var results = document.getElementById("results");
var category = document.getElementById("category");
var sc = document.getElementById("sc");

/***** STATE VARIABLES *****/
var max = 500;
var num1;
var num2;
var answer;
var operation;
var score = 0;
var numQuestion = 20;

var startTime;
var endTime;

var count; // number of correct answers
var times = [];

/***** INITIALIZING *****/
inputField.className = "hide";
stopButton.className = "hide";

/***** EVENTS *****/
startButton.onclick = function() {
	// initializing the count
	count = 0;
	score = 0;
	times = [];
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	sc.innerHTML = ""; // clear sc
	refreshNums();
	inputField.className = ""; // show the input field
	stopButton.className = ""; // show the stop button
	startButton.className = "hide"; // hide the start button
	inputField.focus();
};

form.onsubmit = function(e) {
	// need to prevent the default form submission wich reloads the page
	e.preventDefault();
	getAnswer();
};

stopButton.onclick = function() {
	var resultString;
	var categoryString;
	if (times.length > 0) {
		// getting mean time
		var total = 0;
		for (var i = 0; i < times.length; i++) {
			total += times[i];
		}
		var mean = (total / times.length) / 1000;
		resultString = "Average time: " + mean.toPrecision(4) + " sec";
		categoryString = getCategory(mean);

	} else {
		resultString = "No results recorded. Hit the Enter key to submit your answers.";
		categoryString = "";
	}

	inputField.className = "hide"; // hide the input field
	stopButton.className = "hide"; // hide the stop button
	startButton.className = ""; // show the start button

	// clear numbers and present results
	p.innerHTML = "";
	q.innerHTML = "";
	op.innerHTML = "";
	results.innerHTML = resultString;
	category.innerHTML = categoryString;
	sc.innerHTML = "Final Score: " + score;
};

/***** FUNCTIONS ******/
var refreshNums = function() {
	if (count < numQuestion){
		// Getting some random numbers
		while (true){
			num1 = Math.floor((Math.random() * max) + 1);
			num2 = Math.floor((Math.random() * max) + 1);
			if (num1 >= num2){
				break;
			}
		}
		// Randomize Operations
		operation = Math.floor((Math.random() * 4));
		if(operation === 3){
			//Division, adjust num1 to ensure an integer result
			num1 = num1 - (num1 % num2);
		}

		// Printing numbers to user
		p.innerHTML = num1;
		if (operation === 0){
			// Addition
			op.innerHTML = "+"
		}
		else if (operation === 1){
			// Subtraction
			op.innerHTML = "-"
		}
		else if (operation === 2){
			// Multiplication
			op.innerHTML = "*"
		}
		else if (operation === 3){
			// Division
			op.innerHTML = "/"
		}
		q.innerHTML = num2;
		// Starting timer
		startTime = new Date();
	} else {
		stopButton.onclick();
	}
};

/*
* This is called in the onsubmit event
*/
var getAnswer = function() {
	var correct;
	if (operation === 0){
		// Addition
		correct = num1 + num2;
	}
	else if (operation === 1){
		// Subtraction
		correct = num1 - num2;
	}
	else if (operation === 2){
		// Multiplication
		correct = num1 * num2;
	}
	else if (operation === 3){
		// Division
		correct = num1 / num2;
	}
	// Getting the users attempt
	answer = parseInt(inputField.value);

	// Stopping the timer and adding the time to the times array
	endTime = new Date();
	times[count++] = endTime.getTime() - startTime.getTime();
	if (answer === correct) {
		score++;
	}
	// clear the input field for the next round
	inputField.value = "";
	refreshNums();
};

var getCategory = function(mean) {
	var c;
	if (mean < 2) {
		c = "Human Computer";
	} else if (mean < 4) {
		c = "Math Wiz";
	} else if (mean < 7) {
		c = "B Student";
	} else if (mean < 10) {
		c = "Study more!";
	} else {
		c = "Are you using a calculator?";
	}
	return c;
};
