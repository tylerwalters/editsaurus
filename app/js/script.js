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
		adverb: {name: 'adverb', regex: /\w*ly\b/g, title: 'This adverb could be ommitted or replaced with a stronger verb.'},
		fillerWords: {name: 'filler-words', regex: /\b(very|several|many|most|few|vast|just|quite|often|various|a number of)\b/g, title: 'This word may be unnecessary and not add anything of value.'},
		passiveVoice: {name: 'passive-voice', regex: /\b(is|isn't|are|aren't|am|am not|was|wasn't|were|weren't|had|hadn't|has been|have been|had been|will be|being)\b\s+\b(\w*ed|arisen|babysat|been|beaten|become|bent|begun|bet|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|bought|caught|chosen|come|cost|cut|dealt|dug|done|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forbidden|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lit|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sold|sent|set|shaken|shone|shot|shown|shut|sung|sunk|sat|slept|slid|spoken|spent|spun|spread|stood|stolen|stuck|stung|struck|sworn|swept|swum|swung|taken|taught|torn|told|thought|thrown|understood|woken|worn|won|withdrawn|written|burnt|dreamt|learnt|smelt)\b/g, title: 'This may be an instance of passive voice. Consider an active sentence structure.'},
		pronoun: {name: 'pronoun', regex: /\b(he|she|it)\b/g, title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'},
		lexicalIllusions: {name: 'lexical-illusions', regex: /\b(\w+)\b\s+\1\b/g, title: 'This may be a lexical illusion. Double check that the repeated word was intentional.'},
		misusedWords: {name: 'misused-words', regex: /\b(their|they're|there|your|you're|its|it's|whose|who's)\b/g, title: 'This word is commonly mistaken for another. Double check that the correct word is used.'}
	};

	$('.definitions-list ul li').click(function() {
		$('.definitions-list ul li').each(function() {
			$(this).removeClass('active');
		});
		var active = $(this).attr('class');
		$(this).addClass('active');
		$('.description').each(function() {
			$(this).removeClass('active');
		});
		$('.' + active + '-description').addClass('active');
		$('.definitions-description').attr('class', 'pure-u-1 pure-u-md-2-3 definitions-description ' + active);
	});

})();