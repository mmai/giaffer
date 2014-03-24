(function(exports) {
        "use strict";

        function Giaffer(options, themes){
            this.options = options;
            this.themes = themes;
        }
        exports.Giaffer = Giaffer;

        Giaffer.prototype = {
            getTheme: function(term) {
                var that = this;
                var theme;
                if (!term) {
                    throw new Error("missing term");
                }
                for (var i=0; i < this.themes.length; i++){
                    theme = that.themes[i];
                    if (theme.terms.indexOf(term) !== -1 ){
                        return theme.name;
                    }
                }
                return false;
            },
            search: function(){
                var that = this;
                var randomThemes = arrayRandomElements(that.themes, that.options.nbTerms);

                var searchTerms = randomThemes.map(function(theme){
                        return theme.searchString;
                    });

                var searchQuery = {
                    themes: randomThemes,
                    terms: searchTerms,
                    url: that.makeSearchUrl(searchTerms),
                    display: searchTerms.join(' ')
                }
                return searchQuery;
            },
            makeSearchUrl: getGoogleFRSearchUrl 
        };

        /****************** Search engines */
        //Google FR
        function getGoogleFRSearchUrl(terms){
            return getGoogleSearchUrl(terms, 'fr');
        }

        //Google
        function getGoogleSearchUrl(terms, lang){
            var langext = lang || 'com';
            var url = 'http://www.google.'+ langext + '/search?q=';
            url += terms.map(function (term){
                    return encodeURIComponent('"' + term + '"');
                }).join('+');
            return url;
        }
        /* end Search engines */

        /******************* utilities */
        function arrayRandomElements(myArray, nbelements){
            var randomArray = myArray.slice(0);
            randomArray.sort( function() { return 0.5 - Math.random() } );
            return randomArray.slice(0, nbelements);
        }

        function arrayPickElement(myArray){
            return arrayRandomElements(myArray, 1)[0];
        }
        /* end utilities */

    })(this);
