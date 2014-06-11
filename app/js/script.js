(function(){
	'use strict';

	/* global $ */
	/* global console */

	$('#writing-check-button').click(function(e) {
		e.preventDefault();

		var selectedChecks = $("input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();
		var textInput = $('#writing-check-input').val();
		var checkedText = checkText(textInput, selectedChecks);

		$('#writing-check-output').html(checkedText);
	});

	function checkText(text, choices) {
		text = text.replace(/\r?\n/g, '<br />');
		// Use an object to hold choice value, regex, replacement string. Loop through choices array and apply conditional statement to make selections on output.
		switch (choices.join()) {
			case choices.indexOf('adverbs') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="adverb" title="This may be an unnecessary adverb.">$&</span>');
				/* falls through */
			case choices.indexOf('filler-words') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="filler-words" title="This may be an unnecessary filler word.">$&</span>');
				/* falls through */
			case choices.indexOf('passive-voice') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="passive-voice" title="This may be an unnecessary use of passive voice.">$&</span>');
				/* falls through */
			case choices.indexOf('point-of-view') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="point-of-view" title="This may be an unnecessary point of view issue.">$&</span>');
				/* falls through */
			case choices.indexOf('lexical-illusions') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="lexical-illusions" title="This may be an unnecessary lexical illusion.">$&</span>');
				/* falls through */
			case choices.indexOf('misused-words') !== -1:
				text = text.replace(/\w*ly\b/g, '<span class="misused-words" title="This may be a commonly misused word.">$&</span>');
				break;
			default:
				console.log('choices: ' + choices);
				console.log('choices.indexOf("adverbs"): ' + choices.indexOf('adverbs'));
				text = 'You must select at least one thing to check.';
				break;
		}
		return text;
	}
})();