'use strict';

angular.module('ngGiaffer.appStateServiceModule', ['ngFlorm'])

.provider('$appState', function() {
        var AppState = null;
        var defaults;

        this.setDefaults = function(def){
            if (def) {
                defaults = def;
            }
        };

        this.$get = ['$florm', '$rootScope', function($florm, $rootScope) { // injectables go here
            //florm initialisation with defaults (not possible in setDefaults
            //due to angular inability to inject services in configuration blocs)
            if (AppState === null){
                AppState = $florm('state');
                var defaultState = AppState.new(defaults);
                defaultState.save();
            }

            var self = this;
            var allState = AppState.all();
            if (allState.length === 0) {
                throw "Default state not set";
            }
            var appState = allState[0];
            var service = {
                get: function(name){
                    return appState[name];
                },
                set: function(name, value) {
                    appState[name] = value;
                    appState.save();
                    $rootScope.$broadcast('appState:set', {name: name, value: value});
                }
            };
            return service;
        }];
    });
