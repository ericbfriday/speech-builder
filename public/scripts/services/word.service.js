myApp.service('WordService', function($http){
    const sv = this;

    sv.wordToDefine = {};
    sv.wordResponse = {data: []};
    sv.mp3URL = {};
    sv.definitions = {data: []};

    sv.findDefinition = function(wordIn) {
        // console.log('logging wordIn (service) ', wordIn);
        sv.wordToDefine = {
            word: wordIn,
            data: wordIn
        };
        // empties definitions array for new entries by setting length to 0
        sv.definitions.length = 0;
        // console.log('logging wordToDefine (service) ', sv.wordToDefine);
        $http ({
            method: 'POST',
            url: '/wordLookup',
            data: sv.wordToDefine
        }).then(function (response) {
            console.log('response', response);
            sv.wordResponse.data = response.data.results[0];

            //URL extraction logic below
            if (response.data.results[0].lexicalEntries[0].pronunciations[0].audioFile != undefined){
                sv.mp3URL.data = response.data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            } else {
                sv.mp3URL.data = response.data.results[0].lexicalEntries[0].pronunciations[1].audioFile;
            }
            // console.log('Logging sv.mp3URL in word.service POST route', sv.mp3URL);
            // end URL extraction logic

            // Definition extraction logic below
            // provides shorter location for array looping
            sv.definitionLocation = response.data.results[0].lexicalEntries[0].entries;
            // loops through arrays to extract definitions
            for (var i = 0; i < sv.definitionLocation.length; i ++){
                // console.log('logging definitions ', sv.definitionLocation[i]);
                for (var j = 0; j < sv.definitionLocation[i].senses.length; i++){
                    // console.log('loggin senses ', sv.definitionLocation[i].senses[j].definitions[j]);
                    sv.definitions.data.push(sv.definitionLocation[i].senses[j].definitions[j]);
                    // console.log('loggin sv.definitions ->', sv.definitions); 
                }
            }

            // used below for troubleshooting
            // console.log('logging response.data.results.lexicalEntries in word.service POST route', sv.wordResponse);
            // console.log('logging sv.definitions ', sv.definitions);
            
        });
    };
});