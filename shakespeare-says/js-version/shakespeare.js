var Dictionary = [];
var DictionaryCreated = false;
var IndexToString = [];
            
function Setup() {
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', FileSelected);
}

function ReadLocal(whichFile) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", whichFile, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			ReadSourceFile(null, xhr.responseText);
		}
	}
	xhr.send();
}

function FileSelected(e) 
{
    var file = fileInput.files[0];

	if (file.type.match('text/plain')) {
		var reader = new FileReader();

		reader.onload = ReadSourceFile;
		reader.readAsText(file);
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
	document.getElementById('generated-text').innerHTML = "Dictionary loaded, go ahead and generate 100 words!";
}

function GenerateWords(numWords) {
	if (!DictionaryCreated) {
		document.getElementById('generated-text').innerHTML = "Generate the dictionary first!";
		return;
	}

	var Answer = "";
	var currIndex = Math.floor(Math.random()*Dictionary.length);
	var curr = IndexToString[currIndex];
	Answer += curr[0].toUpperCase() + curr.substring(1);

	var Capitalize;

	for (var i = 0; i < numWords; i++) {
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

	FadeInEffect(Answer, 0);
}

function FadeInEffect(srcText, charsPrinted) {
	if (charsPrinted < srcText.length) {
		document.getElementById('generated-text').innerHTML = srcText.substring(0, charsPrinted + 1);
		charsPrinted++;
		setTimeout(function() {
			FadeInEffect(srcText, charsPrinted)
		}, 10);
	}
}

Setup();