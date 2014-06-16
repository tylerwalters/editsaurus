(function(){

	'use strict';

	/* global $ */
	/* global console */

	$( document ).tooltip();

	$('#writing-check-button').click(function(e) {
		e.preventDefault();

		var selectedChecks = $("input:checkbox:checked").map(function(){return $(this).val();}).toArray();
		var textInput = $('#writing-check-input').val();
		var checkedText = checkText(textInput, selectedChecks);

		$('#writing-check-output').html(checkedText);
	});

	function checkText(text, choices) {
		text = '<p>' + text.replace(/\r\n|\n\r|\n\n|\r\r/g, '</p><p>') + '</p>';
		for (var i = 0, max = choices.length; i < max; i++) {
			text = text.replace(checkOptions[choices[i]].regex, '<span class="' + checkOptions[choices[i]].name + '" title="' + checkOptions[choices[i]].title + '">$&</span>');
		}
		return text;
	}

	var checkOptions = {
		adverb: {name: 'adverb', regex: /\w*ly\b/g, title: 'This may be an unnecessary adverb.'},
		fillerWords: {name: 'filler-words', regex: /\bvery\b|\bseveral\b|\bmany\b|\bmost\b|\bfew\b|\bvast\b|\bjust\b|\bquite\b|\boften\b|\bvarious\b|\ba number of\b/g, title: 'This may be an unnecessary filler word.'},
		passiveVoice: {name: 'passive-voice', regex: /\bwas\b|\bwasn't\b|\bwere\b|\bweren't\b|\bhad\b|\w*ing\b/g, title: 'This may be an unnecessary use of passive voice.'},
		pronoun: {name: 'pronoun', regex: /\bhe\b|\bshe\b|\bit\b/g, title: 'This may be a point of view issue.'},
		lexicalIllusions: {name: 'lexical-illusions', regex: /\b(\w+)\s+\1\b/g, title: 'This may be a lexical illusion.'},
		misusedWords: {name: 'misused-words', regex: /\btheir\b|\bthey're\b|\bthere\b|\byour\b|\byou're\b|\bits\b|\bit's\b|\bwhose\b|\bwho's\b/g, title: 'This word is commonly misused.'}
	};

})();