var Dictionary = [];
var DictionaryCreated = false;
var IndexToString = [];
            
function Setup() {
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', FileSelected);
	
	var ExplanationText = "Either select a local txt file to use or choose from one of the source texts below, then generate as many words as you want!";

	FadeInEffect(ExplanationText, 0, 20);
}

function ReadLocal(whichFile) {
	$('#generated-text').html("Loading dictionary...");
	
	$.get(whichFile, function(data) {
		ReadSourceFile(null, data);
	});
}

function FileSelected(e) 
{
	$('#generated-text').html("Loading dictionary...");
    var file = fileInput.files[0];

	if (file.type.match('text/plain')) {
		var reader = new FileReader();

		reader.onload = ReadSourceFile;
		reader.readAsText(file);
	}
	else {
		$('#generated-text').html("Sorry, that wasn't a .txt file so it can't be used");
	}
}

function ReadSourceFile(e, local) {
	Dictionary = [];
	var wordArray;
	if (e != null)
		wordArray = e.target.result.toLowerCase().match(/\S+/g);
	else if (local != null)
		wordArray = local.toLowerCase().match(/\S+/g);
	for (var i = 0; i < wordArray.length; i++) {
		var word = wordArray[i];

		if (Dictionary[word] === undefined) {
			Dictionary[word] = [];
			IndexToString[IndexToString.length] = word;
		}
		if(wordArray[i+1]) {
			var word2 = wordArray[i+1];
			Dictionary[word][Dictionary[word].length] = word2;
		}
	}
	DictionaryCreated = true;
	$('#generated-text').html("Dictionary loaded, start generating some output!");
}

function GenerateWords() {
	if (!DictionaryCreated) {
		$('#generated-text').html("Generate the dictionary first!");
		return;
	}

	var numWords = Number($('input#numWords').val());

	if (typeof numWords != "number" || numWords < 1) {
		numWords = 100;
	}

	var Answer = "";
	var currIndex = Math.floor(Math.random()*Dictionary.length);
	var curr = IndexToString[currIndex];
	Answer += curr[0].toUpperCase() + curr.substring(1);

	var Capitalize;

	for (var i = 0; i < numWords - 1; i++) {
		Capitalize = false;
		while (!curr) {
			currIndex = Math.floor(Math.random()*Dictionary.length);
			curr = IndexToString[currIndex];
		}

		currIndex = Math.floor(Math.random()*Dictionary[curr].length);

		if (curr.indexOf(".") > -1 || curr.indexOf("!") > -1 || curr.indexOf("?") > -1)
			Capitalize = true; 

		curr = Dictionary[curr][currIndex];
		
		while (!curr) {
			currIndex = Math.floor(Math.random()*Dictionary.length);
			curr = IndexToString[currIndex];
		}

		if (Capitalize || curr == "i")		
			Answer += " " + curr[0].toUpperCase() + curr.substring(1);
		else
			Answer += " " + curr;
	}

	FadeInEffect(Answer, 0, 10);
}

function FadeInEffect(srcText, charsPrinted, delay) {
	if (charsPrinted < srcText.length) {
		$('#generated-text').html(srcText.substring(0, charsPrinted + 1));
		charsPrinted++;
		setTimeout(function() {
			FadeInEffect(srcText, charsPrinted, delay)
		}, delay);
	}
}

Setup();