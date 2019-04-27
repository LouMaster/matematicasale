/***** ELEMENTS *****/
let startButton 	= document.getElementById("start");
let startButton2 	= document.getElementById("start2");
let startButton3 	= document.getElementById("start3");
let startButton4 	= document.getElementById("start4");
let inputField 		= document.getElementById("in");
let form 		    = document.querySelector("form");
let p		 	    = document.getElementById("p");
let q 			    = document.getElementById("q");
let op 			    = document.getElementById("op");
let response 		= document.getElementById("response"); // used for Try Again text
let results 		= document.getElementById("results");
let category 		= document.getElementById("category");
let timer 		    = document.getElementById("timer");

/***** STATE letIABLES *****/
let max = 20, num1, num2, answer, type = 1,

correctAnswers = 0,

startTime,
endTime,
timerInt;


let timerLeft = 8000;

let count; // number of correct answers
let times = [];

/***** INITIALIZING *****/
inputField.className = "hide";

/***** EVENTS *****/
startButton.onclick = () => {
	// initializing the count
	count = 0;
	max = 20;
	type = 1;
	timerLeft = 8000;
	resetEverything();
};

startButton2.onclick = () => {
	// initializing the count
	count = 0;
	type = 2;
	max = 100;
	timerLeft = 10000;
	resetEverything();
};

startButton3.onclick = () => {
	// initializing the count
	count = 0;
	type = 3;
    	max = 10;
    	timerLeft = 12000;
	resetEverything();
};

startButton4.onclick = () => {
	// initializing the count
	count = 0;
	type = 2;
    	max = 1000;
    	timerLeft = 12000;
	resetEverything();
};

form.onsubmit = (e) => {
	// need to prevent the default form submission wich reloads the page
	e.preventDefault();
	getAnswer();
};

resetEverything = () => {
    times = [];
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	startButton.className = "hide"; // hide the start button
	startButton2.className = "hide"; // hide the start button
	startButton3.className = "hide"; // hide the start button
	startButton4.className = "hide"; // hide the start button
	inputField.value = "";
	inputField.focus();
}

stopButton = () => {
	let resultString;
	let categoryString;
	if (times.length > 0) {
		// getting mean time
		let total = 0;
		for (let i = 0; i < times.length; i++) total += times[i];
		let mean = (total / times.length) / 1000;
		resultString = "Average seconds per question: " + mean.toPrecision(4) + " sec <br> Correct answers: "+correctAnswers;
		categoryString = getCategory(mean);
	} else {
		resultString = "Really?";
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
let refreshNums = () => {
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

	timerInt = setInterval(() => {
		timerLeft -= 5;
		timer.innerHTML = timerLeft+"s";
		if(timerLeft == 4000) timer.style.color = "yellow";
		if(timerLeft == 2000) timer.style.color = "red";
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
let getAnswer = () => {
	let correct = 0;
	if(type === 1) correct = num1 + num2;
	else if(type === 2) correct = num1 - num2;
    else correct = num1 * num2;
    
	// Getting the users attempt
	answer = parseInt(inputField.value);

	if (answer === correct) {
		// Stopping the timer and adding the time to the times array
		correctAnswers += 1;
		endTime = new Date();
		times[count++] = endTime.getTime() - startTime.getTime();
		// the answer was correct, so no need for "Try Again"
		response.innerHTML = "";
		refreshNums();
	} else stopButton();
	// clear the input field for the next round
	inputField.value = "";
};

let getCategory = (mean) => {
	let total = correctAnswers / mean;

	if(max > 500){
		if(correctAnswers == 1) return "You are a god."
		else return "You can't use a calculator..."
	}

	if(correctAnswers < 5) return "Less than five, really?"
	if (total < 1) return "If you are going to take this long why bother trying?";
	else if (total < 2) 
		return "C'mom man";
	else if (total < 3) 
		return "Not bad...";
	else if (total < 4) 
		return "To be honest I was expecting less from you.";
	else if (total < 6) 
		return "You are actually good";
	else 
		return "Jeezy, slow down bro";
	
};
