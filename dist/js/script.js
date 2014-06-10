(function(){
	'use strict';

	/* global $ */
	/* global console */

	var textInput = '',
			checkedText = '';

	$('#writing-check-button').click(function(e) {
		e.preventDefault();
		textInput = $('#writing-check-input').val();
		checkedText = checkText(textInput);
		$('#writing-check-output').html(checkedText);
	});

	function checkText(text) {
		text = text.replace(/\r?\n/g, '<br />');
		text = text.replace(/\w*ly\b/g, '<span class="adverb">$&</span>');
		return text;
	}
})();