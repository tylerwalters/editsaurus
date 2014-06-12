(function(){

	'use strict';

	/* global $ */
	/* global console */

	$('#writing-check-button').click(function(e) {
		e.preventDefault();

		var selectedChecks = $("input:checkbox:checked").map(function(){return $(this).val();}).toArray();
		var textInput = $('#writing-check-input').val();
		var checkedText = checkText(textInput, selectedChecks);

		$('#writing-check-output').html(checkedText);
	});

	function checkText(text, choices) {
		text = text.replace(/\r?\n/g, '<br />');
		for (var i = 0; i < choices.length; i++) {
			text = text.replace(checkOptions[choices[i]].regex, '<span class="' + checkOptions[choices[i]].name + '" title="' + checkOptions[choices[i]].title + '">$&</span>');
		}
		return text;
	}

	var checkOptions = {
		adverb: {name: 'adverb', regex: /\w*ly\b/g, title: 'This may be an unnecessary adverb.'},
		fillerWords: {name: 'filler-words', regex: /\w*ly\b/g, title: 'This may be an unnecessary filler word.'},
		passiveVoice: {name: 'passive-voice', regex: /\w*ly\b/g, title: 'This may be an unnecessary use of passive voice.'},
		pointOfView: {name: 'point-of-view', regex: /\w*ly\b/g, title: 'This may be a point of view issue.'},
		lexicalIllusions: {name: 'lexical-illusions', regex: /\w*ly\b/g, title: 'This may be a lexical illusion.'},
		misusedWords: {name: 'misused-words', regex: /\w*ly\b/g, title: 'This word is commonly misused.'}
	};

})();