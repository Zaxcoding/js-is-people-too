var FullFileText;

var Dictionary = [];
var DictionaryCreated = false;
var IndexToString = [];
            
function Setup() {
	var fileInput = document.getElementById('fileInput');

	var wordArray;

	fileInput.addEventListener('change', function(e) {

	    var file = fileInput.files[0];

		if (file.type.match('text/plain')) {
			var reader = new FileReader();

			reader.onload = function(e) {
				wordArray = e.target.result.toLowerCase().match(/\S+/g);
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
			};

			reader.readAsText(file);
		}
	});
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

	document.getElementById('generated-text').innerHTML = Answer;
}

Setup();