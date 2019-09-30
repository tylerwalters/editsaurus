String.prototype.allTrim = String.prototype.allTrim ||
     function(){
        return this.replace(/\s+/g,' ')
                   .replace(/^\s+|\s+$/,'');
     };
	 
	 
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

$(document).ready(function() { 
	
	
	
	//var backgroundOffset = $('#page').css("background-position-y").substring(0,$('#page').css("background-position-y").length-2);//remove "px from end"...
	$('#page').scroll(function() {
		$('#page').css('backgroundPosition', "0px " + (-($('#page').scrollTop())+14)+"px");
	});

	$('.more-freq-word-button').click(function(){
		freqWordLimit += 100; //Show 5 more
		countSpecial(false); //false = don't make another loop
	});
	
	$('.bar').mouseenter(function() {
		var num = $(this).data("number");
		var letter = $(this).data("letter").toUpperCase();
		$('.letter-frequencies .mouse-over-stat').html("<b>"+num+"</b>");
	});
	$('.bar').mouseleave(function() {
		$('.letter-frequencies .mouse-over-stat').html("<b>"+alphaCount+"</b> letters");
	});
	
	//var toBeVerbs = ["am","are","be","became","become","been","being","can","could","did","do","does","had","has","have","is","may","might","must","shall","should","was","were","will","would"];
	var pronouns = ["i","me","myself","mine","my","myself","we","us","ourself","ourselves","ourself","our","you","yourself","your","thou","thee","thyself","thine","thyself","ye","y'all's","y'alls","y'all","youse","themself","themselves","theirself","theirs","their","he","him","himself","hisself","his","she","her","herself","hers","her","it","itself","its","they","them","they","them","who","whom","whose","he'll","she'll","they'll","it'll","theirs'll","his'll","hers'll","i'll"];
	var toBeVerbs = ["be","being","been","am","i'm","are","they're","you're","we're","beest","is","he's","she's","it's","was","were","wast","wert","isn't","aren't","wasn't","weren't","how's","when's","where's","what's","who's","there's","that's","here's"]; //didn't include: "art". also this sort of contraction: "that dog's really big" is not included.
	var firstPersonPronouns = new Array("i","me","my","mine","myself","we","us","our","ours","ourselves");
	var secondPersonPronouns = new Array("you","your","yours","yourself","yourselves","youre");
	var thirdPersonPronouns = new Array("hes","he","him","his","himself","they","them","their","theirs","themselves","she","shes","her","hers","herself","it","its","itself");
		
	var wordCount = 0;
	var characterCount = 0;
	var sentenceCount = 0;
	var wordsPerSentence = 0;
	var clicheCount = 0;
	var paragraphCount = 0;
	var wordLength = 0;
	var alphanumericCount = 0;
	var alphaCount = 0;
	var prepositionCount = 0;
	var paragraphCount = 0;
	var paragraphWordCount = 0;
	/* new: */
	var lettersPerSenctence = 0;
	var syllablesPerSentence = 0;
	var totalSyllables = 0;
	var syllablesPerWord = 0;
	var wordsArray;
	var uniqueWordsArray;
	var wordFrequencyArray;
	var freqWordLimit = 5; //Show the top 5
	var specialCountTimeout = -1;
	var firstPersonCount = 0;
	var secondPersonCount = 0;
	var thirdPersonCount = 0;
	var letterFrequencyArray = new Array();
	var gunningHardWords = 0;
	var singleSyllablesCount = 0;
	var pageCountPaperback = 0;
	var adverbCount = 0;
	var toBeVerbsCount = 0;
	var pausePunctuationCount = 0; //(phrase seperators)
	var wordsBetweenPauses = 0; //avg num words between pause-punctuation (, . - ; etc.)
	var syllablesBetweenPauses = 0; //avg num syllables between pause-punctuation (, . - ; etc.)
	var simileCount = 0;
	var pronounCount = 0;
	var articleCount = 0;
	var contractionCount = 0;
  var uniqueWordCount = 0;
	
	$('#page').on("change keyup paste", function() {
		var fresh_text = $('#page').val();
		
		/*Word Count*/
		wordCount = fresh_text.allTrim().split(" ").length;
		if( fresh_text.allTrim() == " ") { wordCount = 0;} //Temp bug fix
		if( fresh_text == "") { wordCount = 0;} //Temp bug fix
		
		/*Character Count*/
		characterCount = fresh_text.replace(/\s/g,"").length;
		
		/*Sentence Count*/
		var text = fresh_text;
		text = text.replace(/[\.!\?]+/g,".");//convert all sentence ends to period
		text = text.replace(/[0-9]\.[0-9]/g,"DECIM");//remove uses when number either side e.g. 37.2 degrees
		text = text.replace(/[^A-Za-z\.]/g, " ");
		text = text.replace(/\se\.g\.|\si\.e\.|\smr\.|\smrs\.|\sdr\.|\sms\.|\setc\.|\shwy\.|\srd\.|\sst\.|\spde\.|\scol\.|\sphd\.|\sbsc\.|\sc\.|\sca\.|\sb\.c\.|\sa\.d\.|\sb\.c\.e\.|\sb\.a\.|\scapt\.|\scent\.|\scorp\.|\scomdr\.|\scal\.|\sgal\.|\sdist\.|\sest\.|\set al\.|\sed\.|\sdiv\.|\sdec\.|\sjan\.|\sfeb\.|\smar\.|\sapr\.|\sjun\.|\sjul\.|\saug\.|\ssept\.|\soct\.|\snov\.|\sgov\.|\slat\.|\sm\.d\.|\smg\.|\smt\spl\.|\spop\.|\srev\.|\sr\.n\.|\svol\.|\ssr\.|\ssgt\.|\suniv\.|\svs\.|\swt\./gi,"ABBRV");
		var sentenceArray = text.split(".");
		lastChar =  fresh_text.slice(-1);
		if( lastChar == "." || lastChar == "?" || lastChar == "!"){ sentenceArray.pop(); }
		sentenceCount = sentenceArray.length;
		
		/*Max/min sentence length*/
		var maxSentenceLengthWords = 0;
		var minSentenceLengthWords = 9999999999999;
		var tempWordArray = [];
		for(var i = 0, l = sentenceArray.length; i < l; i++) {
			wordArray = sentenceArray[i].trim().split(" ");
			if(wordArray.length > maxSentenceLengthWords) maxSentenceLengthWords = wordArray.length;
			if(wordArray.length < minSentenceLengthWords) minSentenceLengthWords = wordArray.length;
		}
		
		/*Words Per Sentence*/
		if(sentenceCount <= 0) {
			wordsPerSentence = 0;
		} else {
			wordsPerSentence = wordCount/sentenceCount;
		}
		
		/*Alphanumeric Count*/
		var text = fresh_text;
		//text = text.replace(/[^a-zA-Z0-9]/g,"");
		//Includes all accented letters:
		text = text.replace(/[^0-9A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02af\u1d00-\u1d25\u1d62-\u1d65\u1d6b-\u1d77\u1d79-\u1d9a\u1e00-\u1eff\u2090-\u2094\u2184-\u2184\u2488-\u2490\u271d-\u271d\u2c60-\u2c7c\u2c7e-\u2c7f\ua722-\ua76f\ua771-\ua787\ua78b-\ua78c\ua7fb-\ua7ff\ufb00-\ufb06]+/g,"");
		
		alphanumericCount = text.length;
		
		/* Alpha count */
		var text = fresh_text;
		//text = text.replace(/[^A-Za-z]/g, "");
		//Includes all accented letters:
		text = text.replace(/[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02af\u1d00-\u1d25\u1d62-\u1d65\u1d6b-\u1d77\u1d79-\u1d9a\u1e00-\u1eff\u2090-\u2094\u2184-\u2184\u2488-\u2490\u271d-\u271d\u2c60-\u2c7c\u2c7e-\u2c7f\ua722-\ua76f\ua771-\ua787\ua78b-\ua78c\ua7fb-\ua7ff\ufb00-\ufb06]+/g,"");
		//[a-zA-Z\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+
		alphaCount = text.length;
		
		/* Letters Per Sentence Count */
		lettersPerSenctence = alphaCount / sentenceCount;
		if(sentenceCount <= 0) lettersPerSenctence = 0;
		
		/*Word Length*/
		if(wordCount <= 0) {
			wordLength = 0;
		} else {
			wordLength = alphanumericCount/wordCount;
		}
		
		/*Paragraph Count*/
		var text = fresh_text.replace(/\r/g,'')
									.replace(/ /g,'')
									.replace(/^\n+|\n+$/,'')
									.replace(/\n+/g,'NEWLINE37178762');

		var paragraphArray = text.match(/NEWLINE37178762/g);
		if(paragraphArray) {
			paragraphCount = paragraphArray.length + 1; //+1 for last paragraph
		} else {
			paragraphCount = 1;
		}
		
		/*Words Per Paragraph*/
		if(paragraphCount > 0) {
			paragraphWordCount = wordCount/paragraphCount;
		} else {
			paragraphWordCount = 0;
		}
		
		/*Article Count*/
		var text = fresh_text.replace(/ a | an | the | some |\.some|\.the|\.a|\.an/gi,"ArTiClE7462873");
		articleCount = text.split("ArTiClE7462873").length - 1;

		/* Contractions count */
		var text = fresh_text.replace(/\s[a-zA-Z]+'[a-zA-Z]+/gi,"{{297429724CONTRACTION02380238}}");
		contractionCount = text.split("{{297429724CONTRACTION02380238}}").length - 1;
		
		/* Syllables Total */
		totalSyllables = 0;
		gunningHardWords = 0;
		singleSyllablesCount = 0;
		var text = fresh_text.trim();
		//text = text.replace(/[\.\?,-\/#!$%\^&\*;"'\[\]:{}=\-_`~()@\|\>\<]/g,"");
		//text = text.replace(/[0-9]/g,"");
		text = text.replace(/[^A-Za-z\s]/g, "");
		text = text.replace(/\s{2,}/g, ' '); //Replace multiple spaces with single

		var words = text.split(' ');
		for( var i = 0; i < words.length; i++ ) {
			//Words less than 3 chars
			if(words[i].length <= 3) {
				totalSyllables++;
				singleSyllablesCount++;
			} else {
				/* NEEDS MAJOR FIXING "does" = 0 syllables. Don't know what's going on with that first line of regex*/
				//words[i] = words[i].replace(/[auy]es$|ed$|[aeiouy]e$/gi,"0");
				words[i] = words[i].trim();
				words[i] = words[i].replace(/[bcdfghjklmnpqrstvwxyz]/gi,"0");//replace consenants with 0
				words[i] = words[i].replace(/[aeiou]/gi,"1");//replace vowels with 1
				words[i] = words[i].replace(/y$/gi,"1");//replace ending y's with 1
				words[i] = words[i].replace(/1+/gi,"1"); //replace double vowels with a single one
				
				var syllables = words[i].match(/1/g);
				
				if(syllables) {
					totalSyllables += syllables.length;
					if(syllables.length > 3) gunningHardWords++;
					if(syllables.length == 1) singleSyllablesCount++;
				}
			}
			
		}
		//console.log(totalSyllables)
		
		/* Syllables Per Sentence */
		syllablesPerSentence = totalSyllables/sentenceCount;
		if(sentenceCount <= 0) syllablesPerSentence = 0;
		
		/* Syllables per word */
		syllablesPerWord = totalSyllables/wordCount;
		
		
		/* Letter frequency graph */
		var regex;
		for(var i = 0; i < 26; i++) {
			regex = new RegExp(String.fromCharCode(i+97),"g");
			letterFrequencyArray[i] = (fresh_text.toLowerCase().match(regex)||[]).length;
		}
		
		//Page Count:
		pageCountPaperback = wordCount/400;
		pageCountA4 = wordCount/700;
		//if(page)
		
		/* Question count */
		var questionCount = 0;
		var text = fresh_text.trim();
		text = text.replace(/[?]+/g,"?");
		questionCount = text.split("?").length - 1;
		var questionToStatementRatio = questionCount/sentenceCount;
		
		/* Words and Syllables per phrase */
		//first find number of pause punctuation (multiple adjacent pause-punc counts as 1 only)
		var text = fresh_text.trim();
		text = text.replace(/^[\—"”“:;,\(\)\[\]]+|[—"”“:;,\(\)\[\]]+$/g, ''); //remove pause punct from beginning and end
		text = text.replace(/[\—"”“:;,\(\)\[\]]+/g,"{9475697638PAUSE-PUNCT-MARKER902580929}"); //also counting parenthesis as punctuation
		text = text.replace(/\s[-]+\s/g,"{9475697638PAUSE-PUNCT-MARKER902580929}");
		pausePunctuationCount = text.split("{9475697638PAUSE-PUNCT-MARKER902580929}").length - 1;
		wordsBetweenPauses = wordCount/(pausePunctuationCount + 1);
		pausesPerSentence = pausePunctuationCount/sentenceCount;
		syllablesBetweenPauses = totalSyllables/(pausePunctuationCount + 1);
		if(pausePunctuationCount <= 0) { wordsBetweenPauses = 0; syllablesBetweenPauses = 0; }
    
    function unique(list) {
      var result = [];
      $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
    }
    
    /* Unique Words */
    uniqueWordCount = unique( fresh_text.trim().replace(/\s/g," ").replace(/[^a-zA-Z'\- ]+/g, "").toLowerCase().split(" ") ).length;
   
		
		//To get rid of infinities and stuff
		if(alphaCount <= 0) {
			lettersPerSenctence = 0;
			totalSyllables = 0;
			syllablesPerSentence = 0;
			sentenceCount = 0;
			syllablesPerWord = 0;
			paragraphCount = 0;
			pausesPerSentence = 0;
			questionToStatementRatio = 0;
		}
		
		
		$('.word-count').text( wordCount );
		$('.character-count').text( characterCount );
		$('.alphanumeric-count').text( alphanumericCount );
		$('.avg-words-per-sentence-count').text( wordsPerSentence.toFixed(2) );
		$('.max-words-per-sentence-count').text( maxSentenceLengthWords );
		$('.min-words-per-sentence-count').text( minSentenceLengthWords );
		$('.sentence-count').text( sentenceCount );
		$('.wordletter-count').text( wordLength.toFixed(2) );
		$('.paragraph-count').text( paragraphCount );
		$('.article-count').text( articleCount );
		$('.paragraph-word-count').text( paragraphWordCount.toFixed(2) );
		
		$('.letters-per-sentence').text( lettersPerSenctence.toFixed(2) );
		$('.syllables-per-sentence').text( syllablesPerSentence.toFixed(2) );
		$('.syllables-count').text( totalSyllables );
		$('.syllables-per-word').text( syllablesPerWord.toFixed(2) );
		$('.alpha-count').text( alphaCount );
		$('.page-count-paperback').text( pageCountPaperback.toFixed(2) );
		$('.page-count-a4').text( pageCountA4.toFixed(2) );
		$('.to-be-verbs-count').text( toBeVerbsCount );
		$('.pause-count').text( pausePunctuationCount );
		$('.contraction-count').text( contractionCount );
		$('.words-between-pauses').text( wordsBetweenPauses.toFixed(2) );
		$('.syllables-between-pauses').text( syllablesBetweenPauses.toFixed(2) );
		$('.pauses-per-sentence').text( pausesPerSentence.toFixed(2) );
		$('.question-count').text( questionCount );
		$('.question-sentence-ratio').text( questionToStatementRatio.toFixed(4) );
		$('.unique-word-count').text( uniqueWordCount );
		
		var maxLetterFreqRatio = 0;
		$('.letter-frequencies .letter').each(function() {
			var letter = $(this).attr('class').split(" ")[1];
			var i = letter.charCodeAt(0) - 97;
			var num = letterFrequencyArray[i];
			var ratio = num/alphaCount;
			
			if(ratio > maxLetterFreqRatio) maxLetterFreqRatio = ratio;
			
			$(this).find(".bar").css('height',ratio*$('.letter-frequencies').height()+1+'px');
			$(this).find(".bar").data("number", num);
		});
		//Now normalise so the biggest ratio fills the whole 'letter-frequencies' box
		$('.letter-frequencies .letter .bar').each(function() {
			var h = $(this).height();
			if(h > 1) { //if it's not just a 1px line - i.e. there are none of this letter
				$(this).height(h/maxLetterFreqRatio);
			}
		});
		$('.letter-frequencies .mouse-over-stat').html("<b>"+alphaCount+"</b> letters");
		
		//var gunningArticle = "a";
		//if(Math.ceil(gunningFog) == 8 || Math.ceil(gunningFog) == 11) gunningArticle = "an";
		//$('#gunning-fog .main-text').html(gunningArticle+" <span class='big'>"+Math.ceil(gunningFog)+"</span> year old could read this.")
		
		
		
		
		
		/*if( $('.stats-word-count').text() == "1" ) {
			if( $('.stats-container .words').text() == "words" ) {
				$('.stats-container .words').text("word");
			}
		} else {
			if( $('.stats-container .words').text() == "word" ) {
				$('.stats-container .words').text("words");
			}
		}*/
		
		/*Adjust font size of stats*/
		var size = 200;
		var text = $('.main-stat').text();
		while( testTextWidth(text,size) > $('.main-stat').width() ) {
			size--;
		}
		$('.main-stat').css('font-size',size);
		
		if(specialCountTimeout != -1) {
			clearTimeout(specialCountTimeout);
		}
		specialCountTimeout = setTimeout(function() {
			countSpecial(false);
			specialCountTimeout = -1;
		}, 1300);
		
	});
	
	function countSpecial(loop) {
		var fresh_text = $('#page').val();
		
		/*=============== CLICHES  ===================*/
		clicheCount = 0;
		var currentCliche = "none";
		for(var i = 0; i < clicheArray.length; i++) {
			/*	//For trying to count duplicates
			var k = 0;//index of current found cliche
			while( (k = fresh_text.indexOf(clicheArray[i],0) + 1) !== -1) { //Count all of this specific cliche throughout document.
				clicheCount++;
			}
			*/
			currentCliche = clicheArray[i].toLowerCase().trim();
			if( fresh_text.indexOf(currentCliche) !== -1 ) {
				clicheCount++;
			}
		}
		
		
		/*=============== STANDARD DEVITIONS ===================*/
		/*Sentence letter + word length*/
		var text = fresh_text;
		text = text.replace(/[\.!\?]+/g,".");//convert all sentence ends to period
		text = text.replace(/[0-9]\.[0-9]/g,"9-9");//remove uses when number either side e.g. 37.2 degrees
		text = text.replace(/[^A-Za-z'\.]/g, " ");
		text = text.replace(/\se\.g\.|\si\.e\.|\smr\.|\smrs\.|\sdr\.|\sms\.|\setc\.|\shwy\.|\srd\.|\sst\.|\spde\.|\scol\.|\sphd\.|\sbsc\.|\sc\.|\sca\.|\sb\.c\.|\sa\.d\.|\sb\.c\.e\.|\sb\.a\.|\scapt\.|\scent\.|\scorp\.|\scomdr\.|\scal\.|\sgal\.|\sdist\.|\sest\.|\set al\.|\sed\.|\sdiv\.|\sdec\.|\sjan\.|\sfeb\.|\smar\.|\sapr\.|\sjun\.|\sjul\.|\saug\.|\ssept\.|\soct\.|\snov\.|\sgov\.|\slat\.|\sm\.d\.|\smg\.|\smt\spl\.|\spop\.|\srev\.|\sr\.n\.|\svol\.|\ssr\.|\ssgt\.|\suniv\.|\svs\.|\swt\./gi,"ABB");
		var sentenceArray = text.split(".");
		var lastChar =  fresh_text.slice(-1);
		if( lastChar == "." || lastChar == "?" || lastChar == "!"){ sentenceArray.pop(); }
		var sum_x1 = 0;
		var sum_x2 = 0;
		for(var i = 0; i < sentenceArray.length; i++) {
			//letters/sentence
			sum_x1 += sentenceArray[i].length;
			sum_x2 += sentenceArray[i].length*sentenceArray[i].length;
			
			//words/sentence
			sum_x1_w = sentenceArray[i].split(" ").length;
			sum_x2_w = sentenceArray[i].split(" ").length*sentenceArray[i].split(" ").length;
		}
		var num_sent = sentenceArray.length;
		var mean_len = sum_x1 / num_sent;
		var sentenceLengthSTDEV = Math.sqrt((sum_x2 / num_sent) - (mean_len * mean_len));
		var mean_len_w = sum_x1_w / num_sent;
		var sentenceLengthWordsSTDEV = Math.sqrt((sum_x2_w / num_sent) - (mean_len_w * mean_len_w));
		
		
		
		/*=============== 'AS - AS' SIMILES  ===================*/
		var text = (" "+fresh_text+" ").replace(/\sas\s[a-z']+\sas\s/gi,'{{8797SIMILIE-MARKER62320}}');
		simileCount = text.split("{{8797SIMILIE-MARKER62320}}").length - 1;
		
		
		/*================== Personal Pronouns and "to be" verbs ==================*/
		wordsArray = fresh_text.toLowerCase().replace(/[,\.\?!\(\)"“”]/g,"").replace(/[‘’]/g,"'").allTrim().split(" ");
		firstPersonCount = 0;
		secondPersonCount = 0;
		thirdPersonCount = 0;
		toBeVerbsCount = 0;
		pronounCount = 0;
		//toBeVerbs
		for(var i = 0; i < wordsArray.length; i++) {
			//wordsArray elements are all lower case, so no need to check case variations
			for(var j = 0; j < firstPersonPronouns.length; j++) {
				if(wordsArray[i] === firstPersonPronouns[j]) {
					firstPersonCount++;
				}
			}
			for(var j = 0; j < secondPersonPronouns.length; j++) {
				if(wordsArray[i] === secondPersonPronouns[j]) {
					secondPersonCount++;
				}
			}
			for(var j = 0; j < thirdPersonPronouns.length; j++) {
				if(wordsArray[i] === thirdPersonPronouns[j]) {
					thirdPersonCount++;
				}
			}
			for(var j = 0; j < toBeVerbs.length; j++) {
				if(wordsArray[i] === toBeVerbs[j]) {
					toBeVerbsCount++;
				}
			}
			for(var j = 0; j < pronouns.length; j++) {
				if(wordsArray[i] === pronouns[j]) {
					pronounCount++;
				}
			}
		}
		var personalTotal = firstPersonCount + secondPersonCount + thirdPersonCount;
		if(personalTotal == 0) personalTotal = 0.000001; //Stop division by zero
		
		$('.pronoun-count').text( pronounCount );
		$('.personal-pronouns .first').html("<span style='font-size:170%;font-weight:bold'>"+Math.floor(firstPersonCount*100/personalTotal)+"%</span> First person");
		$('.personal-pronouns .second').html("<span style='font-size:170%;font-weight:bold'>"+Math.floor(secondPersonCount*100/personalTotal)+"%</span> Second person");
		$('.personal-pronouns .third').html("<span style='font-size:170%;font-weight:bold'>"+Math.floor(thirdPersonCount*100/personalTotal)+"%</span> Third person");
		
		
		/*=============== ADVERBS  ===================*/
		/*adverbCount = 0;
		var currentAdverb = "none9213697236902982942";
		for(var i = 0; i < clicheArray.length; i++) {
			adverbCliche = adverbArray[i].toLowerCase().trim();
			if( fresh_text.indexOf(currentAdverb) !== -1 ) {
				adverbCount++;
			}
		}*/
		
		/*=============== PREPOSITIONS  ===================*/
		prepositionCount = 0;
		for(var i = 0; i < prepositionArray.length; i++) {
			var text = fresh_text;
			word = prepositionArray[i].replace(/\s/gi,"\\s");
			var regex = new RegExp("\\s" + word + "\\s","gi");
			var resultArray = text.match(regex);
			if(resultArray) {
				prepositionCount += resultArray.length;
			}
		}
		
		/*=============== MOST USED WORDS & PHRASES  ===================*/
		if(fresh_text != "") {
			wordsArray = fresh_text.toLowerCase().replace(/[^A-Za-z0-9À-ÿžŸšœŽŒŠ&%\s']/g, "").allTrim().split(" ");
			//added this in for phrases:
			for(var i = 0, l = wordsArray.length; i < l; i++) {
				if(i < l-1) wordsArray.push( wordsArray[i]+" "+wordsArray[i+1] ); //2 word phrases
				if(i < l-2) wordsArray.push( wordsArray[i]+" "+wordsArray[i+1]+" "+wordsArray[i+2] ); //3 word phrases
			}
			
			uniqueWordsArray = wordsArray.filter(function(elem, pos, self) {
				return self.indexOf(elem) == pos;
			});

			wordFrequencyArray = new Array();
			
			for(var i = 0; i < uniqueWordsArray.length; i++) {
				wordFrequencyArray[i] = 0;
				for(var j = 0; j < wordsArray.length; j++) {
					if(wordsArray[j] == uniqueWordsArray[i]) {
						wordFrequencyArray[i]++;
					}
				}
			}
			
			//Create 2D array from words and frequencies
			var wordAndFreq = new Array();
			for (var i = 0; i<uniqueWordsArray.length && i<wordFrequencyArray.length; i++) {
				wordAndFreq[i] = [uniqueWordsArray[i], wordFrequencyArray[i]];
			}
			//Sort by frequency descending
			wordAndFreq.sort(function(a,b){return b[1]-a[1]});
			
			var wordFreqHTML = "";
			for(var i = 0; i < wordAndFreq.length; i++) {
				wordFreqHTML += "<tr>" + "<td>" + wordAndFreq[i][0] + "</td>" + "<td class='count'>" + wordAndFreq[i][1] + "</td>" + "</tr>";
				if(i == freqWordLimit) break;
			}
		} else {
			wordFreqHTML = "<tr>" + "<td>" + "Nothing yet." + "</td>" + "</tr>";
		}
		
		
		/*=============== READABILITY TESTS ===================*/
		var fleschReadingEase = 0;
		var fleschKincaidGradeLevel = 0;
		var daleChall = 0;
		var gunningFogGradeLevel = 0;
		var FORECASTGradeLevel = 0;
		
		var singleSyllablesWordsPer150 = singleSyllablesCount/(wordCount/150);
		
		if(alphaCount > 0) {
			fleschReadingEase = 206.835 - 1.015*(wordCount/sentenceCount) - 84.6*(totalSyllables/wordCount);
			fleschKincaidGradeLevel = 0.39*(wordCount/sentenceCount) + 11.8*(totalSyllables/wordCount) - 15.59;
			
			daleChall = 0.1579*((numDaleChallDifficultWords()/wordCount)*100)+0.0496*(wordCount/sentenceCount);
			if((numDaleChallDifficultWords()/wordCount)*100 > 5) daleChall += 3.6365;
			
			gunningFogGradeLevel = 0.4*(wordsPerSentence + 100*(gunningHardWords/wordCount));
			FORECASTGradeLevel = 20 - (singleSyllablesWordsPer150/10);
			
			$('.flesch .score').text(fleschReadingEase.toFixed(2));
			$('.flesch-kincaid .score').text(fleschKincaidGradeLevel.toFixed(2));
			$('.dale-chall .score').text(daleChall.toFixed(2));
			$('.gunning-fog .score').text(gunningFogGradeLevel.toFixed(2));
			$('.forecast .score').text(FORECASTGradeLevel.toFixed(2));
		
		} else {
			$('.flesch .score').text("0");
			$('.flesch-kincaid .score').text("0");
			$('.dale-chall .score').text("0");
			$('.gunning-fog .score').text("0");
			$('.forecast .score').text("0");
		}
		
		
		$('.preposition-count').text(prepositionCount);
		$('.cliche-count').text(clicheCount);
		$('.simile-count').text(simileCount);
		$('.sentence-len-stdev').text(sentenceLengthSTDEV.toFixed(2));
		$('.words-per-sentence-stdev').text(sentenceLengthWordsSTDEV.toFixed(2));
		//$('.adverb-count').text( adverbCount.toFixed(2) );
		$('.word-frequency-container table').html(wordFreqHTML)
		
		if(loop) {
			setTimeout(function() {
				countSpecial(true);
			}, 3000);
		}
	}
	
	/*Initialise*/
	countSpecial(false);
	
	
	function numDaleChallDifficultWords() {
		var text = $('#page').val().allTrim().toLowerCase();
		text = text.replace(/[^A-Za-z\-\s']+/g, "");
		//for(var i = 0; i < daleChallList.length; i++) {
		//	text = text.split(" "+daleChallList[i]+" ").join(" ");
		//	text = text.split(" "+daleChallList[i]+"s ").join(" ");
		//}
		var wordArray = text.split(" ");
		//console.log(wordArray)
		for(var i = 0; i < wordArray.length; i++) {
			for(var j = 0; j < daleChallList.length; j++) {
				if(wordArray[i] === daleChallList[j] || (wordArray[i]) === (daleChallList[j]+"s")) {
					//console.log((wordArray[i]) + "===" + (daleChallList[j]+"s"))
					wordArray.splice(i, 1);
					i--;
				}
			}
		}
		//console.log(text.allTrim())
		//return text.allTrim().split(" ").length
		//console.log(wordArray)
		//console.log(wordArray.join(" "));
		//console.log(wordArray.length);
		return wordArray.length;
	}
	
	function numGunningHardWords() {
		
	}
	
});


function testTextWidth(text,size) {
	$('#text-width-tester').css('font-size', size + 'px')
	$('#text-width-tester').html(text);
	return $('#text-width-tester').width();
}


$(document).ready(function() {

});