(function(exports) {
        "use strict";

        /****************** Search engines */
        var searchEngines = {
            google: { name: "google.com" ,
                makeSearchUrl: function (terms){
                    return getGoogleSearchUrl(terms);
                }
            },
            'google.fr': { name: "google.fr" ,
                makeSearchUrl: function (terms){
                    return getGoogleSearchUrl(terms, 'fr');
                }
            },
            bing: { name: "bing.com" ,
                makeSearchUrl: function (terms){
                    return getBingSearchUrl(terms);
                }
            },
            'bing.fr': { name: "bing.fr" ,
                makeSearchUrl: function (terms){
                    return getBingSearchUrl(terms, 'fr');
                }
            },
            duckduckgo: { name: "duckduckgo.com" ,
                makeSearchUrl: function (terms){
                    var url = 'https://www.duckduckgo.com/?q=';
                    url += terms.map(function (term){
                            return encodeURIComponent(term);
                        }).join('+');
                    return url;
                }
            }
        };

        function getBingSearchUrl(terms, lang){
            var url = getEngineSearchUrl(terms, 'bing');
            if (lang){
                url += '&cc='+lang;
            }
            return url;
        }

        function getGoogleSearchUrl(terms, lang){
            return getEngineSearchUrl(terms, 'google', lang);
        }

        function getEngineSearchUrl(terms, engine, lang){
            var sengine = engine || 'google';
            var langext = lang || 'com';
            var url = 'http://www.' + sengine + '.'+ langext + '/search?q=';
            url += terms.map(function (term){
                    return encodeURIComponent(term);
                }).join(' ');
            return url;
        }
        /* end Search engines */

        function Giaffer(options, themes){
            this.options = options;
            this.themes = themes;
            if (options.searchEngine){
                this.setEngine(options.searchEngine);
//                this.makeSearchUrl = searchEngines[options.searchEngine].makeSearchUrl;
            }
        }
        exports.Giaffer = Giaffer;
        exports.searchEngines = searchEngines;

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
                };
                return searchQuery;
            },
            setEngine: function(engine){
                var that = this;
                that.makeSearchUrl = searchEngines[engine].makeSearchUrl;
            },
            setNbTerms: function(nbTerms){
                var that = this;
                that.options.nbTerms = nbTerms;
            },
            makeSearchUrl: searchEngines.google.makeSearchUrl
        };

        /******************* utilities */
        function arrayRandomElements(myArray, nbelements){
            var randomArray = myArray.slice(0);
            randomArray.sort( function() { return 0.5 - Math.random(); } );
            return randomArray.slice(0, nbelements);
        }

        function arrayPickElement(myArray){
            return arrayRandomElements(myArray, 1)[0];
        }
        /* end utilities */

    })(this);
