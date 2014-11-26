"use strict";

angular.module('writeController').controller('writeController', ['$scope', function($scope) {

	$scope.selectedChecks = [];



}]);



//(function(){
//
//	'use strict';
//
//	/* global $ */
//	/* global console */
//
//	// text submit
//	// Creates an array containing the check options, saves the submitted text to a variable, applies the changes to the text using checkText(), adds the edited text to the output section.
//	$('#writing-check-button').click(function(e) {
//		// Prevent form from trying to submit to default action
//		e.preventDefault();
//
//		// Adds each of the selected check options to an array
//		var selectedChecks = $("input:checkbox:checked").map(function(){return $(this).val();}).toArray();
//		// Saves text input to a variable
//		var textInput = $('#writing-check-input').val();
//		// Runs checkText() with the options array and submitted text as arguments
//		var checkedText = checkText(textInput, selectedChecks);
//
//		// Adds revised text to output section
//		$('#writing-check-output').html(checkedText);
//	});
//
//	// checkText()
//	// Accepts the submitted text and the selected check options as parameters. Applies selected choices to the text and returns the edited text for output.
//	function checkText(text, choices) {
//		// Creates html paragraphs where line breaks occur in the submitted text
//		text = '<p>' + text.replace(/\r\n|\n\r|\n\n|\r\r/g, '</p><p>') + '</p>';
//		var i = 0,
//			max = choices.length,
//			re;
//		// Loops through the selected check options to apply each one to the submitted text
//		for (i = 0; i < max; i++) {
//			// Replaces the existing text each loop with the same text with the latest check option applied, check options mark where tags will be placed in the next step
//			text = text.replace(checkOptions[choices[i]].regex, '***' + checkOptions[choices[i]].name + '***$&***endspan***');
//		}
//
//		// Loops through text again for each check option to replace marker text with span tags to highlight the text in the output. It is handled this way to avoid conflicts when the regex was matching text in the span tags' title attribute.
//		for (i = 0; i < max; i++) {
//			// Regular expression to look for markers placed for each check option in the last loop
//			re = new RegExp('\\*\\*\\*' + checkOptions[choices[i]].name + '\\*\\*\\*', 'g');
//			// Replaces each opening marker with a span tag with a class and title appropriate for each check option
//			text = text.replace(re, '<span class="' + checkOptions[choices[i]].name + '" title="' + checkOptions[choices[i]].title + '">');
//			// Replaces each closing marker with a closing tag for the span
//			text = text.replace(/\*\*\*endspan\*\*\*/g, '</span>');
//		}
//		// Returns edited text for output
//		return text;
//	}
//
//	// check options
//	// Object holding the name, regular expression to matched, and title for each option that is checked against the submitted text.
//	var checkOptions = {
//		adverb: {name: 'adverb', regex: /\w*ly\b/gi, title: 'This adverb could be ommitted or replaced with a stronger verb.'},
//		fillerWords: {name: 'filler-words', regex: /\b(very|several|some|many|most|few|vast|just|quite|often|various|a number of|really|so|that|and then|but)\b/gi, title: 'This word may be unnecessary and not add anything of value.'},
//		passiveVoice: {name: 'passive-voice', regex: /\b(is|isn't|are|aren't|am|am not|was|wasn't|were|weren't|had|hadn't|has been|have been|had been|will be|being)\b\s+\b(\w*ed|arisen|babysat|been|beaten|become|bent|begun|bet|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|bought|caught|chosen|come|cost|cut|dealt|dug|done|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forbidden|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lit|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sold|sent|set|shaken|shone|shot|shown|shut|sung|sunk|sat|slept|slid|spoken|spent|spun|spread|stood|stolen|stuck|stung|struck|sworn|swept|swum|swung|taken|taught|torn|told|thought|thrown|understood|woken|worn|won|withdrawn|written|burnt|dreamt|learnt|smelt)\b/gi, title: 'This may be an instance of passive voice. Consider an active sentence structure.'},
//		lexicalIllusions: {name: 'lexical-illusions', regex: /\b(\w+)\b\s+\1\b/gi, title: 'This may be a lexical illusion. Double check that the repeated word was intentional.'},
//		misusedWords: {name: 'misused-words', regex: /\b(their|they're|there|your|you're|its|it's|whose|who's|accept|except|affect|effect|allusion|illusion|capital|capitol|climactic|climatic|elicit|illicit|emigrate|immigrate|principle|principal|than|then|to|too|two|lie|lay|set|sit|suppose to|use to|towards|anyways|could care less|intensive purposes)\b/gi, title: 'This word is commonly mistaken for another. Double check that the correct word is used.'},
//		pronoun: {name: 'pronoun', regex: /\b(he|she|it|they|we|you|I|that|this)\b/gi, title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'}
//	};
//
//	// Definitions functionality
//	// Handles the definition switching and styling when new options are selected in the definitions section.
//	$('.definitions-list ul li').click(function() {
//		// Removes the active class from each li
//		$('.definitions-list ul li').each(function() {
//			$(this).removeClass('active');
//		});
//
//		// Assigns the class name of the clicked li to the 'active' variable
//		var active = $(this).attr('class');
//		// Adds the active class to the clicked li
//		$(this).addClass('active');
//
//		// Removes the active class from each definition description div
//		$('.description').each(function() {
//			$(this).removeClass('active');
//		});
//		// Adds the active class to the definition description that matches the clicked li
//		$('.' + active + '-description').addClass('active');
//		// Adds the appropriate class to the .definitions-description section to change the background color
//		$('.definitions-description').attr('class', 'pure-u-1 pure-u-md-2-3 definitions-description ' + active);
//	});
//
//	// Active section
//	// Marks the active section in the navigation menu when it is the most appropriate one scrolled to
//	$(window).scroll(function () {
//		// Adds active class to active nav item's li.
//		var y = $(this).scrollTop();
//
//		$('.link').each(function () {
//			if (y >= $($(this).attr('href')).offset().top - 250) {
//				$('.link').not(this).parent( 'li' ).removeClass('pure-menu-selected');
//				$(this).parent( 'li' ).addClass('pure-menu-selected');
//			}
//		});
//	});
//
//	// Navigation scroll animation
//	// Animates scroll to appropriate section from navigation menu
//	$(".link").click(function() {
//		event.preventDefault();
//		var target = $(this).attr("href");
//		$('html, body').animate({
//			scrollTop: $(target).offset().top - 70
//		}, 2000);
//	});
//
//	/*
//	 * Plugins
//	 */
//
//	// tooltip()
//	// Adds stylized JavaScript tooltips to elements with titles.
//	$(document).tooltip();
//
//})();