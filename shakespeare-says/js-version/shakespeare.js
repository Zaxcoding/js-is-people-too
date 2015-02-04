var FullFileText;

var Dictionary = [];
var DictionaryCreated = false;
var IndexToString = [];
            
function Setup() {
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', FileSelected);
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

function ReadSourceFile(e) {
	var wordArray = e.target.result.toLowerCase().match(/\S+/g);
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
}

function GenerateWords(numWords) {
	if (!DictionaryCreated) {
		document.getElementById('generated-text').innerHTML = "Generate the dictionary first!";
		return;
	}

	var Answer = "";
	var currIndex = Math.floor(Math.random()*Dictionary.length);
	var curr = IndexToString[currIndex];
	Answer += curr;

	var SecondIndex;


	for (var i = 0; i < numWords; i++) {
		while (!curr) {
			currIndex = Math.floor(Math.random()*Dictionary.length);
			curr = IndexToString[currIndex];
		}

		currIndex = Math.floor(Math.random()*Dictionary[curr].length);

		curr = Dictionary[curr][currIndex];
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