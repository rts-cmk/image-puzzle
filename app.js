var xStart;
var xEnd;
var yStart;
var yEnd;
var limit = 20;
var tolerance = 40;

var moveMe = document.querySelectorAll(".moveMe");
var wrapper = document.querySelector(".wrapper");

moveMe.forEach(function(div) {
	div.addEventListener("touchstart", startTouch);
	div.addEventListener("touchend", endTouch);
});

function startTouch(event) {
	xStart = event.changedTouches[0].pageX;
	yStart = event.changedTouches[0].pageY;
}

function endTouch(event) {
	xEnd = event.changedTouches[0].pageX;
	yEnd = event.changedTouches[0].pageY;

	var stepX = parseInt(event.target.dataset.x);
	var stepY = parseInt(event.target.dataset.y);

	// move on X-axis
	if ((xEnd + tolerance) < xStart
		&& yEnd < (yStart + limit)
		&& yEnd > (yStart - limit)) {
		stepX = stepX - 200;
		if (isOccupied(stepX, stepY)) return;
		if (stepX <= 0) stepX = 0;
		event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
		event.target.dataset.x = stepX;
	}
	if ((xEnd - tolerance) > xStart
		&& yEnd < (yStart + limit)
		&& yEnd > (yStart - limit)) {
		stepX = stepX + 200;
		if (isOccupied(stepX, stepY)) return;
		if (stepX >= 400) stepX = 400;
		event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
		event.target.dataset.x = stepX;
	}

	// move on Y-axis
	if ((yEnd + tolerance) < yStart
		&& xEnd < (xStart + limit)
		&& xEnd > (xStart - limit)) {
		stepY = stepY - 200;
		if (isOccupied(stepX, stepY)) return;
		if (stepY <= 0) stepY = 0;
		event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
		event.target.dataset.y = stepY;

	}
	if ((yEnd - tolerance) > yStart
		&& xEnd < (xStart + limit)
		&& xEnd > (xStart - limit)) {
		stepY = stepY + 200;
		if (isOccupied(stepX, stepY)) return;
		if (stepY >= 400) stepY = 400;
		event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
		event.target.dataset.y = stepY;
	}
}

function isOccupied(x, y) {
	var toggle = false;
	
	moveMe.forEach(function(div) {
		if (div.dataset.x == x && div.dataset.y == y) {
			toggle = true;
		}
	});

	return toggle;
}


// IIFE - Immediately Invoked Function Expression

(function() {
	moveMe.forEach(function(div) {
		div.style.transform = `translate(${div.dataset.x}px, ${div.dataset.y}px)`;
	});
})()

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}