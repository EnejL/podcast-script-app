let counter = 1;

window.onload = function() {
	if (window.jQuery) {
		// jQuery is loaded
		console.log("jQuery is working!");
	} else {
		// jQuery is not loaded
		console.log("jQuery doesn't Work");
	}

	$("#main-content").sortable({
		cursor: "move"
	});
}

// handling the text input and the corresponding calculations
function onInput(textarea) {
	// getting the textarea id and storing the textarea in a variable
	let textAreaId = textarea.id;
	let textArea = document.getElementById(textAreaId);

	// counting the number of characters
	let text = textArea.value;
	let charCount = text.length;

	// counting the number of words and calculating est. reading time
	const wpm = 200;
	let wordCount = text.split(" ").length;
	let readTimeCalculation = Math.ceil(wordCount / wpm);

	// outputting the char count and word count into their brackets
	let a = $(textarea.id[0]);
	let b = $(a.prevObject[0].activeElement);

	let characterCountContainer = b[0].parentElement.children[3];
	let readingTimeContainer = b[0].parentElement.children[4];

	characterCountContainer.innerHTML = 'Characters: ' + charCount;
	readingTimeContainer.innerHTML = 'Estimated reading time: ' + readTimeCalculation;

	// adjusting the textarea height based on content
	let taLineHeight = 20;
	let taHeight = textArea.scrollHeight;
	var numOfLines = Math.floor(taHeight / taLineHeight);
	textArea.style.height = (numOfLines * 20) + 'px';

	// return [charCount, readTimeCalculation];
};

// handling the creation of a new text block
function createNewBlock() {
	counter++;

	const div = document.createElement('div');
	div.className = 'text-area-wrapper';

	div.innerHTML =
			"<label for=\"textarea\" class=\"text-area-label\">Text block " + counter + "</label>\n" +
			"<input type=\"text\" class=\"text-block-title\" placeholder=\"Text block title ...\">\n" +
			"<textarea id=\"textarea-" + counter + "\" class=\"text-block\" placeholder=\"Type here your text ...\" oninput=\"onInput(this)\"></textarea>\n" +
			"<span id=\"char-count-" + counter + "\" class=\"char-count\">Characters: N/A</span>\n" +
			"<span id=\"reading-time-" + counter + "\" class=\"reading-time\">Estimated reading time: N/A</span>";

	document.getElementById('main-content').appendChild(div);
}

























