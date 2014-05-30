var textInput = '',
		checkedText = '';

$('#writing-check-button').click(function(e) {
	e.preventDefault();
	textInput = $('#writing-check-input').val();
	checkedText = checkText(textInput);
	$('#writing-check-output').html(checkedText);
});

function checkText(text) {
	console.log('text: ' + text);
	text = text.replace(/\w*ly\b/g, '<span class="adverb">$&</span>');
	console.log('text: ' + text);
	return text;
}