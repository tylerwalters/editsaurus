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
		fillerWords: {name: 'filler-words', regex: /\bvery\b|\bseveral\b|\bmany\b|\bmost\b|\bfew\b|\bvast\b|\bjust\b|\bquite\b|\boften\b|\bvarious\b|\ba number of\b/g, title: 'This word may be unnecessary and not add anything of value.'},
		passiveVoice: {name: 'passive-voice', regex: /(\bis\b|\bisn't\b|\bare\b|\baren't\b|\bam\b|\bam not\b|\bwas\b|\bwasn't\b|\bwere\b|\bweren't\b|\bhad\b|\bhadn't\b|\bhas been\b|\bhave been\b|\bhad been\b|\bwill be\b|\bbeing\b)\s+(\w*ed\b|\barisen\b|\bbabysat\b|\bbeen\b|\bbeaten\b|\bbecome\b|\bbent\b|\bbegun\b|\bbet\b|\bbound\b|\bbitten\b|\bbled\b|\bblown\b|\bbroken\b|\bbred\b|\bbrought\b|\bbroadcast\b|\bbuilt\b|\bbought\b|\bcaught\b|\bchosen\b|\bcome\b|\bcost\b|\bcut\b|\bdealt\b|\bdug\b|\bdone\b|\bdrawn\b|\bdrunk\b|\bdriven\b|\beaten\b|\bfallen\b|\bfed\b|\bfelt\b|\bfought\b|\bfound\b|\bflown\b|\bforbidden\b|\bforgotten\b|\bforgiven\b|\bfrozen\b|\bgotten\b|\bgiven\b|\bgone\b|\bgrown\b|\bhung\b|\bhad\b|\bheard\b|\bhidden\b|\bhit\b|\bheld\b|\bhurt\b|\bkept\b|\bknown\b|\blaid\b|\bled\b|\bleft\b|\blent\b|\blet\b|\blain\b|\blit\b|\blost\b|\bmade\b|\bmeant\b|\bmet\b|\bpaid\b|\bput\b|\bquit\b|\bread\b|\bridden\b|\brung\b|\brisen\b|\brun\b|\bsaid\b|\bseen\b|\bsold\b|\bsent\b|\bset\b|\bshaken\b|\bshone\b|\bshot\b|\bshown\b|\bshut\b|\bsung\b|\bsunk\b|\bsat\b|\bslept\b|\bslid\b|\bspoken\b|\bspent\b|\bspun\b|\bspread\b|\bstood\b|\bstolen\b|\bstuck\b|\bstung\b|\bstruck\b|\bsworn\b|\bswept\b|\bswum\b|\bswung\b|\btaken\b|\btaught\b|\btorn\b|\btold\b|\bthought\b|\bthrown\b|\bunderstood\b|\bwoken\b|\bworn\b|\bwon\b|\bwithdrawn\b|\bwritten\b|\bburnt\b|\bdreamt\b|\blearnt\b|\bsmelt\b)/g, title: 'This may be an instance of passive voice. Consider an active sentence structure.'},
		pronoun: {name: 'pronoun', regex: /\bhe\b|\bshe\b|\bit\b/g, title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'},
		lexicalIllusions: {name: 'lexical-illusions', regex: /\b(\w+)\s+\1\b/g, title: 'This may be a lexical illusion. Double check that the repeated word was intentional.'},
		misusedWords: {name: 'misused-words', regex: /\btheir\b|\bthey're\b|\bthere\b|\byour\b|\byou're\b|\bits\b|\bit's\b|\bwhose\b|\bwho's\b/g, title: 'This word is commonly mistaken for another. Double check that the correct word is used.'}
	};

})();