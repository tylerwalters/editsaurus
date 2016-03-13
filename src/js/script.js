/* global angular */
/* global console */

angular.module('editSaurus', [
  'ngSanitize'
]);

angular.module('editSaurus')
  .directive('checkText', ['$timeout', '$filter', '$sce', function ($timeout, $filter, $sce) {
    function link($scope, $element, $attrs) {
      'use strict';

      var timer;

      $scope.selectedChecks = ['adverb', 'fillerWords', 'passiveVoice', 'lexicalIllusions'];
      $scope.output = '<p>Checked text copy will go here.</p>';
      $scope.input = angular.element($element[0].querySelector('#writing-check-input'));

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
        $scope.output = $sce.trustAsHtml($filter('highlightText')($scope.input.html(), $scope.selectedChecks));
      };

      $scope.processText = function () {
        $timeout.cancel(timer);
        timer = $timeout(function () {
          $scope.updateOutput();
        }, 200);
      };

      $scope.input.on('paste', function() {
        $timeout(function () {
          $scope.input.html(replaceStyleAttr(removeAllTags($scope.input.html())));
        }, 0);
      });

      function replaceStyleAttr (str) {
        return str.replace(/(<[\w\W]*?)(style)([\w\W]*?>)/g, function (a, b, c, d) {
          return b + 'style_replace' + d;
        });
      }

      function removeAllTags (str) {
        return str.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi,'');
      }
    }

    return {
      restrict: 'A',
      link: link
    };
  }])

  .directive('definitionList', [function () {
    function link($scope, $element, $attrs) {
      'use strict';

      $scope.currentDefinition = 'adverb';
    }

    return {
      restrict: 'A',
      link: link
    };
  }])

  .filter('highlightText', [function () {
    return function (input, choices) {
      'use strict';

      var checkOptions = {
        adverb: {
          name: 'adverb',
          regex: /(?!ally|anomaly|assembly|belly|bully|dolly|doily|family|fly|gully|hillbilly|holly|homily|jelly|lily|monopoly|panoply|potbelly|rally|reply|supply|tally|underbelly|barfly|blowfly|botfly|butterfly|dragonfly|firefly|gadfly|horsefly|mayfly|medfly|apply|bely|comply|dally|imply|multiply|outfly|ply|rely|reply|supply|authorly|beastly|brotherly|cowardly|fatherly|gentlemanly|granddaughterly|housekeeperly|husbandly|kingly|landlordly|manly|marksmanly|matronly|miserly|motherly|neighborly|queenly|saintly|scholarly|southerly|wifely|womanly|daily|easterly|hourly|monthly|nightly|northeasterly|northerly|northwesterly|quarterly|rarely|timely|weekly|westerly|wobbly|yearly|bristly|bubbly|crinkly|crumbly|crumply|cuddly|curly|frizzly|giggly|rumply|smelly|sparkly|wriggly|wrinkly|bodily|burly|chilly|comely|costly|courtly|dastardly|deadly|deathly|disorderly|early|frilly|friendly|ghastly|goodly|gravelly|grisly|heavanly|hilly|holy|homely|jolly|kindly|knurly|leisurely|likely|lively|lonely|lovely|lowly|mannerly|mealy|measly|melancholy|oily|only|orderly|otherworldly|pearly|pebbly|pimply|scaly|shapely|sickly|silly|slatternly|slovenly|sly|spindly|sprightly|squiggly|stately|steely|surly|treacly|ugly|ungainly|unlikely|wily|wooly|worldly)\b\w*ly\b/gi,
          title: 'This adverb could be omitted or replaced with a stronger verb.'
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

      if (!input) {
        return '<p>Checked text copy will go here.</p>';
      }

      // Creates paragraphs where line breaks occur in the submitted text
      input = '<p>' + input.replace(/\r\n|\n\r|\n\n|\r\r/g, '</p><p>') + '</p>';
      // Creates paragraphs where line breaks occur in the submitted text
      input = input.replace(/\r|\n/g, '<br>');
      var i = 0,
        max = choices.length,
        re;
      // Loops through the selected check options to apply each one to the submitted text
      for (i = 0; i < max; i++) {
        // Wraps each match with a span tag and a class
        input = input.replace(checkOptions[choices[i]].regex, '<span class="' + checkOptions[choices[i]].name + '">$&</span>');
      }

      // Loops through text to add titles to each match. It is handled this way to avoid incorrectly finding matches in the title text.
      for (i = 0; i < max; i++) {
        // Regular expression to look for spans and classes for each check
        re = new RegExp('<span class="' + checkOptions[choices[i]].name + '">', 'g');
        // Adds titles in addition to classes to each span tag
        input = input.replace(re, '<span class="' + checkOptions[choices[i]].name + '" data-tooltip="' + checkOptions[choices[i]].title + '">');
      }
      // Returns edited text for output
      return input;
    };
  }])
;

