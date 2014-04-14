'use strict';

angular.module('ngGiaffer.settingsServiceModule', ['ngFlorm'])

.provider('$settings', function() {
        var Settings = null;
        var defaults;

        this.setDefaults = function(def){
            if (def) {
                defaults = def;
            } 
        };

        this.$get = function(florm, rootScope) { // injectables go here
            //florm initialisation with defaults (not possible in setDefaults
            //due to angular inability to inject services in configuration blocs)
            if (Settings === null){
                Settings = florm('settings');
                var defaultSettings = Settings.new(defaults);
                defaultSettings.save();
            }

            var self = this;
            var allSettings = Settings.all();
            if (allSettings.length === 0) throw "Default settings not set";
            var settings = allSettings[0];
            var service = {
                get: function(name){
                    return settings[name];
                },
                set: function(name, value) {
                    settings[name] = value;
                    settings.save();
                    rootScope.$broadcast('settings:set', {name: name, value: value});
                }
            };
            return service;
        };
        this.$get['$inject'] = ['$florm', '$rootScope'];
    });
