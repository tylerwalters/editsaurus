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

      $scope.selectedChecks = ['adverb', 'fillerWords', 'redundantWords', 'passiveVoice', 'lexicalIllusions', 'toBeVerbs'];
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
        redundantWords: {
          name: 'redundant-words',
          regex: /\b((?<=am)\W*in the morning|(?<=pm)\W*at night|12\W*(?=midnight)|12\W*(?=noon)|a total of\W*(?=5,280)|absolutely\W*(?=essential)|absolutely\W*(?=necessary)|actual\W*(?=facts)|(?<=add)\W*an additional|(?<=add)\W*up|added\W*(?=bonus)|(?<=advance)\W*forward|advance\W*(?=planning)|advance\W*(?=reservations)|advance\W*(?=warning)|aid and\W*(?=abet)|(?<=AIDS)\W*syndrome|(?<=all)\W*of|all things considered|all\W*(?=throughout)|all-time\W*(?=record)|(?<=alternative)\W*choice|annual\W*(?=anniversary)|anonymous\W*(?=stranger)|absolutely\W*(?=necessary)|armed\W*(?=gunman)|artificial\W*(?=prosthesis)|as a matter of fact|as far as I’m concerned|as\W*(?=yet)|(?<=ascend)\W*up|(?<=ask)\W*a question|(?<=assemble)\W*together|(?<=ATM)\W*machine|(?<=attach)\W*together|(?<=bald-)headed|(?<=balsa)\W*wood|basic\W*(?=essentials)|basic\W*(?=fundamentals)|basic\W*(?=necessities)|(?<=because)\W*of the fact that|(?<=best)\W*ever|(?<=biography)\W*of a person’s life|(?<=blend)\W*together|\W*in color|(?<=both)\W*of them|brand\W*(?=new)|(?<=brief)\W*in duration|brief\W*(?=moment)|brief\W*(?=summary)|burning\W*(?=embers)|but\W*(?=nevertheless)|(?<=but)\W*nevertheless|(?<=cacophony)\W*of sound|(?<=cancel)\W*out|careful\W*(?=scrutiny)|(?<=cash)\W*money|(?<=cease)\W*and desist|(?<=cacophony)\W*of sound|(?<=CEO)\W*officer|(?<=circle)\W*around|(?<=circulate)\W*around|(?<=classify)\W*into groups|(?<=climb)\W*up|close\W*(?=proximity)|closed\W*(?=fist)|(?<=CMS)\W*system|(?<=collaborate)\W*together|(?<=combine)\W*together|(?<=commute)\W*back and forth|(?<=compete)\W*with each other|complete\W*(?=opposite)|completely\W*(?=annihilate)|completely\W*(?=destroy)|completely\W*(?=eliminate)|completely\W*(?=engulf)|completely\W*(?=finish)|completely\W*(?=full)|completely\W*(?=surround)|completely\W*(?=unanimous)|component\W*(?=parts)|(?<=confer)\W*together|(?<=connect)\W*together|(?<=connect)\W*up|(?<=consensus)\W*of opinion|constantly\W*(?=maintained)|(?<=cooperate)\W*together|(?<=could)\W*possibly|(?<=CPU)\W*unit|crack of\W*(?=dawn)|(?<=crisis)\W*situation|(?<=cross the arms)\W*over the chest|crystal[ \-]*(?=clear)|current[ \-]*(?=trend)|current\W*(?=trend)|definite\W*(?=decision)|(?<=depreciate)\W*in value|(?<=descend)\W*down|desirable\W*(?=benefit)|diametrically\W*(?=opposed)|(?<=different)\W*kinds|difficult\W*(?=dilemma)|direct\W*(?=confrontation)|(?<=disappear)\W*from sight|dog-eat-dog\W*(?=fierce fight)|(?<=drop)\W*down|(?<=during)\W*the course of|(?<=dwindle)\W*down|each and\W*(?=every)|(?<=each)\W*and every|(?<=earlier)\W*in time|(?<=echo)\W*back|(?<=eliminate)\W*altogether|(?<=eliminate)\W*entirely|(?<=emergency)\W*situation|empty\W*(?=hole)|(?<=empty)\W*out|empty\W*(?=space)|(?<=enclosed)\W*herewith|(?<=enclosed)\W*herein|end\W*(?=result)|(?<=enter)\W*into|entirely\W*(?=eliminate)|(?<=equal)\W*to one another|(?<=eradicate)\W*completely|(?<=estimated at)\W*about|single\W*(?=person)|single\W*(?=thing)|single\W*(?=individual)|one\W*(?=person)|one\W*(?=thing)|one\W*(?=individual)|(?<=evolve)\W*over time|exact\W*(?=same)|exactly\W*(?=the same)|exposed\W*(?=opening)|(?<=extradite)\W*back|face\W*(?=mask)|up to\W*(?=the facts)|(?<=fall)\W*down|false\W*(?=pretense)|favorable\W*(?=approval)|fellow\W*(?=classmate)|fellow\W*(?=colleague)|(?<=few)\W*in number|(?<=filled)\W*to capacity|final\W*(?=completion)|final\W*(?=end)|final\W*(?=outcome)|final\W*(?=ultimatum)|first and\W*(?=foremost)|first\W*(?=conceived)|(?<=first)\W*of all|(?<=five)\W*in number|(?<=fly)\W*through the air|in\W*(?=on)|(?<=follow)\W*after|(?<=foreign)\W*imports|for all intents and purposes|for the most part|(?<=forever)\W*and ever|former\W*(?=graduate)|former\W*(?=veteran)|free\W*(?=gift)|from\W*(?=whence)|frozen\W*(?=ice)|frozen\W*(?=tundra)|full\W*(?=satisfaction)|(?<=full)\W*to capacity|(?<=fuse)\W*together|(?<=future)\W*plans|future\W*(?=recurrence)|(?<=gather)\W*together|general\W*(?=public)|give a\W*(?=gasp)|give a\W*(?=nod)|give a\W*(?=shrug)|give a\W*(?=sigh)|give a\W*(?=smile)|go and\W*(?=get)|(?<=GOP)\W*party|(?<=GRE)\W*exam|(?<=grow)\W*in size|harmful\W*(?=injuries)|(?<=has)\W*got|(?<=have)\W*got|(?<=head)\W*honcho|(?<=heat)\W*up|hidden\W*(?=ambush)|(?<=HIV)\W*virus|(?<=hoist)\W*up|hollow\W*(?=tube)|honestly|hopeful\W*(?=optimism)|hot\W*(?=water heater)|hot-dog\W*(?=show-off)|(?<=HPV)\W*virus|(?<=hurry)\W*up|illustrated\W*(?=drawing)|in a manner of speaking|in a very real sense|in\W*(?=close)|(?<=close)\W*proximity|in my opinion|in the final analysis|in the process of|(?<=incredible)\W*to believe|(?<=I saw it)\W*with my own eyes|(?<=integrate)\W*together|(?<=integrate)\W*with each other|(?<=interdependent)\W*on each other|(?<=introduced)\W*for the first time|(?<=ISBN)\W*number|literally\W*(?=impossible)|(?<=join)\W*together|joint\W*(?=collaboration)|(?<=kneel)\W*down|(?<=know)\W*that|knowledgeable\W*(?=experts)|(?<=lag)\W*behind|(?<=large)\W*in size|(?<=largest)\W*ever|(?<=later)\W*time|(?<=LCD)\W*display|(?<=lift)\W*up|live\W*(?=witness)|(?<=longer)\W*in length|ahead\W*(?=to the future)|(?<=look back)\W*in retrospect|(?<=made)\W*out|major\W*(?=breakthrough)|major\W*(?=feat)|(?<=manually)\W*by hand|(?<=might)\W*possibly|(?<=may)\W*possibly|(?<=meet)\W*together|(?<=meet)\W*with each other|mental\W*(?=telepathy)|(?<=merge)\W*together|(?<=miles apart)\W*from one another|(?<=mix)\W*together|(?<=MLB)\W*baseball|more\W*(?=perfect)|(?<=most)\W*of the|most\W*(?=unique)|(?<=moving)\W*experience|mutual\W*(?=cooperation)|mutual respect\W*(?=for each other)|(?<=nape)\W*of the neck|native\W*(?=habitat)|natural\W*(?=instinct)|(?<=never)\W*before|new\W*(?=innovation)|new\W*(?=invention)|new\W*(?=recruit)|(?<=NFL)\W*league|(?<=nod)\W*the head|(?<=none)\W*at all|(?<=nostalgia)\W*for the past|now\W*(?=pending)|number one\W*(?=leader)|(?<=off)\W*of|open\W*(?=trench)|(?<=open)\W*up|oral\W*(?=conversation)|originally\W*(?=created)|outside\W*(?=in the yard)|(?<=outside)\W*of|(?<=oval)\W*in shape|over\W*(?=exaggerate)|(?<=over)\W*with|overused\W*(?=cliché)|pair of\W*(?=twins)|(?<=palm)\W*of the hand|passing\W*(?=fad)|past\W*(?=experience)|past\W*(?=history)|past\W*(?=memories)|past\W*(?=records)|(?<=penetrate)\W*into|period of|personal\W*(?=friend)|personal\W*(?=opinion)|(?<=pick)\W*and choose|(?<=PIN)\W*number|(?<=pizza)\W*pie|(?<=plan)\W*ahead|(?<=plan)\W*in advance|please\W*(?=RSVP)|(?<=plunge)\W*down|polar\W*(?=opposites)|positive\W*(?=identification)|(?<=postpone)\W*until later|(?<=pouring)\W*down|present\W*(?=incumbent)|(?<=present)\W*time|(?<=previously listed)\W*above|(?<=proceed)\W*ahead|(?<=protest)\W*against|(?<=protruded)\W*out|(?<=puppy)\W*dog|(?<=pursue)\W*after|(?<=puzzling)\W*in nature|(?<=raise)\W*up|(?<=RAM)\W*memory|(?<=reason)\W*why|(?<=rectangular)\W*in shape|(?<=recur)\W*again|(?<=re-elect)\W*for another term|(?<=refer)\W*back|(?<=reflect)\W*back|regular\W*(?=routine)|(?<=repeat)\W*again|(?<=reply)\W*back|(?<=retreat)\W*back|(?<=return)\W*again|(?<=revert)\W*back|ripe\W*(?=old age)|(?<=rise)\W*up|(?<=round)\W*in shape|safe\W*(?=haven)|safe\W*(?=sanctuary)|(?<=same)\W*exact|(?<=same)\W*identical|(?<=scream)\W*loudly|(?<=scrutinize)\W*in detail|(?<=separated)\W*apart|serious\W*(?=danger)|(?<=share)\W*together|sharp\W*(?=point)|down\W*(?=on)|(?<=shiny)\W*in appearance|(?<=shorter)\W*in length|(?<=shrug)\W*the shoulders|(?<=shut)\W*down|(?<=sigh)\W*of relief|(?<=since)\W*the time that|single\W*(?=unit)|(?<=sit)\W*down|(?<=skipped)\W*over|(?<=slow)\W*speed|(?<=small)\W*in size|small\W*(?=speck)|sneaking\W*(?=suspicion)|(?<=soft)\W*to the touch|(?<=sole)\W*of the foot|(?<=spell out)\W*in detail|(?<=spliced)\W*together|(?<=square)\W*in shape|(?<=stand)\W*up|(?<=start)\W*off|(?<=start)\W*out|still\W*(?=persists)|still\W*(?=remains)|sudden\W*(?=impulse)|suddenly\W*(?=exploded)|sum\W*(?=total)|(?<=summarize)\W*briefly|(?<=surrounded)\W*on all sides|surrounding\W*(?=circumstances)|take a\W*(?=look at)|take a\W*(?=taste)|(?<=tall)\W*in stature|(?<=tall)\W*in height|tell a\W*(?=lie)|temper\W*(?=tantrum)|(?<=the future)\W*to come|the point is that|(?<=the reason)\W*why|therapeutic\W*(?=treatment)|there are\W*(?=many)|(?<=I)\W*who|(?<=we)\W*who|(?<=many)\W*who|(?<=man)\W*who|(?<=he)\W*who|(?<=she)\W*who|(?<=someone)\W*who|(?<=they)\W*who|(?<=those)\W*who|(?<=everybody)\W*who|(?<=anybody)\W*who|(?<=each)\W*who|(?<=everyone)\W*who|(?<=nobody)\W*who|(?<=one)\W*who|(?<=somebody)\W*who|three\W*(?=triplets)|three-way\W*(?=love triangle)|(?<=tilt the head)\W*sideways|tiny\W*(?=bit)|tiny\W*(?=speck)|to coin a phrase|to make a long story short|to tell the truth|total\W*(?=destruction)|totally\W*(?=free)|true\W*(?=facts)|truly\W*(?=sincere)|(?<=tuna)\W*fish|two equal\W*(?=halves)|two\W*(?=twins)|(?<=undergraduate)\W*student|underground\W*(?=subway)|unexpected\W*(?=emergency)|unexpected\W*(?=surprise)|unintentional\W*(?=mistake)|universal\W*(?=panacea)|(?<=until)\W*such time as|(?<=UPC)\W*code|usual\W*(?=custom)|(?<=vacillate)\W*back and forth|(?<=visible)\W*to the eye|(?<=wake)\W*up|wall\W*(?=mural)|(?<=warn)\W*in advance|(?<=weather)\W*conditions|(?<=weather)\W*situation|what I mean to say is|when I think about it|(?<=whether)\W*or not|(?<=whirl)\W*around|whisper\W*(?=softly)|white\W*(?=snow)|(?<=write)\W*down|(?<=yell)\W*loudly|super\W*(?=awesome))\b/gi,
          title: 'This word may be redundant and if so, could be omitted.'
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
          regex: /(?!to\Wbe)\b(their|they're|there|your|you're|its|it's|whose|who's|accept|except|affect|effect|allusion|illusion|capital|capitol|climactic|climatic|elicit|illicit|emigrate|immigrate|principle|principal|than|then|to|too|two|lie|lay|set|sit|suppose to|use to|towards|anyways|could care less|intensive purposes)\b/gi,
          title: 'This word is commonly mistaken for another. Double check that the correct word is used.'
        },
        pronoun: {
          name: 'pronoun',
          regex: /\b(he|she|it|they|we|you|I|that|this)\b/gi,
          title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'
        },
        toBeVerbs: {
          name: 'to-be-verbs',
          regex: /\b(am|is|are|was|were|be|been|being|[a-z]+'s)\b/gi,
          title: 'Avoid &quot;to be verbs&quot; that only convey existence and not action.  See if you can you identify a stronger verb.'
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

