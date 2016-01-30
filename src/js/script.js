'use strict';

/* global angular */
/* global console */

angular.module('writeCheck', [
  'ngSanitize'
]);

angular.module('writeCheck')
  .directive('checkText', ['$timeout', '$filter', '$sce', function ($timeout, $filter, $sce) {
    function link($scope, $element, $attrs) {
      var timer;

      $scope.selectedChecks = [];
      $scope.input = '';
      $scope.output = 'Checked text copy will go here.';

      $scope.toggleCheck = function (check) {
        var index = $scope.selectedChecks.indexOf(check);

        if (index !== -1) {
          $scope.selectedChecks.splice(index, 1);
          $scope.updateOutput();
        } else {
          $scope.selectedChecks.push(check);
          $scope.updateOutput();
        }
      };

      $scope.updateOutput = function () {
        $scope.output = $filter('highlightText')($scope.input, $scope.selectedChecks);
      };

      $scope.processText = function () {
        $timeout.cancel(timer);
        timer = $timeout(function () {
          $scope.updateOutput();
        }, 200);
      };
    }

    return {
      restrict: 'A',
      link: link
    };
  }])

  .directive('definitionList', [function () {
    function link($scope, $element, $attrs) {
      $scope.currentDefinition = 'adverb';
    }

    return {
      restrict: 'A',
      link: link
    };
  }])

  .filter('highlightText', [function () {
    return function (input, choices) {
      var checkOptions = {
        adverb: {
          name: 'adverb',
          regex: /\w*ly\b/gi,
          title: 'This adverb could be ommitted or replaced with a stronger verb.'
        },
        fillerWords: {
          name: 'filler-words',
          regex: /\b(very|several|some|many|most|few|vast|just|quite|often|various|a number of|really|so|that|and then|but)\b/gi,
          title: 'This word may be unnecessary and not add anything of value.'
        },
        passiveVoice: {
          name: 'passive-voice',
          regex: /\b(is|isn't|are|aren't|am|am not|was|wasn't|were|weren't|had|hadn't|has been|have been|had been|will be|being)\b\s+\b(\w*ed|arisen|babysat|been|beaten|become|bent|begun|bet|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|bought|caught|chosen|come|cost|cut|dealt|dug|done|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forbidden|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lit|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sold|sent|set|shaken|shone|shot|shown|shut|sung|sunk|sat|slept|slid|spoken|spent|spun|spread|stood|stolen|stuck|stung|struck|sworn|swept|swum|swung|taken|taught|torn|told|thought|thrown|understood|woken|worn|won|withdrawn|written|burnt|dreamt|learnt|smelt)\b/gi,
          title: 'This may be an instance of passive voice. Consider an active sentence structure.'
        },
        lexicalIllusions: {
          name: 'lexical-illusions',
          regex: /\b(\w+)\b\s+\1\b/gi,
          title: 'This may be a lexical illusion. Double check that the repeated word was intentional.'
        },
        misusedWords: {
          name: 'misused-words',
          regex: /\b(their|they're|there|your|you're|its|it's|whose|who's|accept|except|affect|effect|allusion|illusion|capital|capitol|climactic|climatic|elicit|illicit|emigrate|immigrate|principle|principal|than|then|to|too|two|lie|lay|set|sit|suppose to|use to|towards|anyways|could care less|intensive purposes)\b/gi,
          title: 'This word is commonly mistaken for another. Double check that the correct word is used.'
        },
        pronoun: {
          name: 'pronoun',
          regex: /\b(he|she|it|they|we|you|I|that|this)\b/gi,
          title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'
        }
      };

      // Creates html paragraphs where line breaks occur in the submitted text
      input = '<p>' + input.replace(/\r\n|\n\r|\n\n|\r\r/g, '</p><p>') + '</p>';
      var i = 0,
        max = choices.length,
        re;
      // Loops through the selected check options to apply each one to the submitted text
      for (i = 0; i < max; i++) {
        // Replaces the existing text each loop with the same text with the latest check option applied, check options mark where tags will be placed in the next step
        input = input.replace(checkOptions[choices[i]].regex, '***' + checkOptions[choices[i]].name + '***$&***endspan***');
      }

      // Loops through text again for each check option to replace marker text with span tags to highlight the text in the output. It is handled this way to avoid conflicts when the regex was matching text in the span tags' title attribute.
      for (i = 0; i < max; i++) {
        // Regular expression to look for markers placed for each check option in the last loop
        re = new RegExp('\\*\\*\\*' + checkOptions[choices[i]].name + '\\*\\*\\*', 'g');
        // Replaces each opening marker with a span tag with a class and title appropriate for each check option
        input = input.replace(re, '<span class="' + checkOptions[choices[i]].name + '" title="' + checkOptions[choices[i]].title + '">');
        // Replaces each closing marker with a closing tag for the span
        input = input.replace(/\*\*\*endspan\*\*\*/g, '</span>');
      }
      // Returns edited text for output
      return input;
    };
  }])
;

