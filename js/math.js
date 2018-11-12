/***** ELEMENTS *****/
let startButton 	= document.getElementById("start");
let startButton2 	= document.getElementById("start2");
let startButton3 	= document.getElementById("start3");
let startButton4 	= document.getElementById("start4");
let inputField 		= document.getElementById("in");
let form 			= document.querySelector("form");
let p			 	= document.getElementById("p");
let q 				= document.getElementById("q");
let op 				= document.getElementById("op");
let response 		= document.getElementById("response"); // used for Try Again text
let results 		= document.getElementById("results");
let category 		= document.getElementById("category");
let timer 			= document.getElementById("timer");

/***** STATE letIABLES *****/
let max = 20;
let num1;
let num2;
let answer;
let type = 1;

let correctAnswers = 0;

let startTime;
let endTime;
let timerInt;


let timerLeft = 8000;

let count; // number of correct answers
let times = [];

/***** INITIALIZING *****/
inputField.className = "hide";

/***** EVENTS *****/
startButton.onclick = function() {
	// initializing the count
	count = 0;
	times = [];
	timerLeft = 8000;
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	startButton.className = "hide"; // hide the start button
	startButton2.className = "hide"; // hide the start button
	startButton3.className = "hide"; // hide the start button
	startButton4.className = "hide"; // hide the start button
	inputField.focus();
};

startButton2.onclick = function() {
	// initializing the count
	count = 0;
	type = 2;
	max = 100;
	times = [];
	timerLeft = 10000;
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	startButton.className = "hide"; // hide the start button
	startButton2.className = "hide"; // hide the start button
	startButton3.className = "hide"; // hide the start button
	startButton4.className = "hide"; // hide the start button
	inputField.focus();
};

startButton3.onclick = function() {
	// initializing the count
	count = 0;
	type = 3;
	max = 10;
	timerLeft = 12000;
	times = [];
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	startButton.className = "hide"; // hide the start button
	startButton2.className = "hide"; // hide the start button
	startButton3.className = "hide"; // hide the start button
	startButton4.className = "hide"; // hide the start button
	inputField.focus();
};

startButton4.onclick = function() {
	// initializing the count
	count = 0;
	type = 2;
	max = 1000;
	times = [];
	timerLeft = 12000;
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	startButton.className = "hide"; // hide the start button
	startButton2.className = "hide"; // hide the start button
	startButton3.className = "hide"; // hide the start button
	startButton4.className = "hide"; // hide the start button
	inputField.focus();
};

form.onsubmit = function(e) {
	// need to prevent the default form submission wich reloads the page
	e.preventDefault();
	getAnswer();
};

function stopButton() {
	let resultString;
	let categoryString;
	if (times.length > 0) {
		// getting mean time
		let total = 0;
		for (let i = 0; i < times.length; i++) {
			total += times[i];
		}
		let mean = (total / times.length) / 1000;
		resultString = "Tempo médio por questão: " + mean.toPrecision(4) + " sec <br> Respostas certas: "+correctAnswers;
		categoryString = getCategory(mean);
	} else {
		resultString = "Calma que?";
		categoryString = "";
	}

	clearInterval(timerInt);
	timer.innerHTML = "";

	inputField.className = "hide"; // hide the input field
	stopButton.className = "hide"; // hide the stop button
	startButton.className = ""; // show the start button
	startButton2.className = ""; // hide the start button
	startButton3.className = ""; // hide the start button
	startButton4.className = ""; // hide the start button

	// clear numbers and present results
	p.innerHTML = "";
	q.innerHTML = "";
	op.innerHTML = "";
	correctAnswers = 0;
	response.innerHTML = ""; // clear response in case it was set
	results.innerHTML = resultString;
	category.innerHTML = categoryString;
};

/***** FUNCTIONS ******/
let refreshNums = function() {
	// Getting some random numbers
	num1 = Math.floor((Math.random() * max) + 1);
	num2 = Math.floor((Math.random() * max) + 1);
	// Printing numbers to user
	p.innerHTML = num1;
	if(type === 1){
		timerLeft = 8000;
		op.innerHTML = "+";
	}else if(type === 2){
		timerLeft = 12000;
		op.innerHTML = "-";
	} else {
		timerLeft = 10000;
		op.innerHTML = "X";
	}
	q.innerHTML = num2;
	timer.style.color = "green";
	clearInterval(timerInt);

	timerInt = setInterval(function(){
		timerLeft -= 5;
		timer.innerHTML = timerLeft+"s";
		if(timerLeft == 4000){
			timer.style.color = "yellow";
		}
		if(timerLeft == 2000){
			timer.style.color = "red";
		}
		if(timerLeft == 0){
			stopButton();
			clearInterval(timerInt);
			timer.innerHTML = "";
		}
	}, 1);


	// Starting timer
	startTime = new Date();
};

/*
* This is called in the onsubmit event
*/
let getAnswer = function() {
	let correct = 0;
	if(type === 1){
		correct = num1 + num2;
	}else if(type === 2){
		correct = num1 - num2;
	} else {
		correct = num1 * num2;
	}
	// Getting the users attempt
	answer = parseInt(inputField.value);

	if (answer === correct) {
		// Stopping the timer and adding the time to the times array
		correctAnswers += 1;
		console.log(correctAnswers);
		endTime = new Date();
		times[count++] = endTime.getTime() - startTime.getTime();
		// the answer was correct, so no need for "Try Again"
		response.innerHTML = "";
		refreshNums();
	} else {
		stopButton();
	}
	// clear the input field for the next round
	inputField.value = "";
};

let getCategory = function(mean) {
	let total = correctAnswers / mean;

	if(max > 500){
		if(correctAnswers == 1){
			return "Você é um deus."
		} else {
			return "Calculadora não vale."
		}
	}

	if(correctAnswers < 5){
		return "Menos de 5, sério?"
	}
	if (total < 1) {
		return "Se for pra demorar assim nem tenta cara.";
	} else if (total < 2) {
		return "Aí não da nê.";
	} else if (total < 3) {
		return "Aceitável...";
	} else if (total < 4) {
		return "Hum... Eu daria nota 8";
	} else if (total < 6) {
		return "Você é bom.";
	} else {
		return "Quase um robô...";
	}
};
