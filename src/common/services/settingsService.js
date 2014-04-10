'use strict';

angular.module('ngGiaffer.settingsServiceModule', [])

/*
.factory('settings', function () {
    var service =  {
        settings: {}
    };
    return service;
});
//*/

.provider('Settings', ['$florm', function($florm) {
            var Settings = $florm('settings');

            function setDefaults(defaults){
                if (defaults) {
                    if (Settings.all().length === 0){
                        var defaultSettings = Settings.new(defaults.settings);
                        defaultSettings.save();
                    }
                } 
            }

            this.$get = function(rootScope) { // injectables go here
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
            this.$get['$inject'] = ['$rootScope'];
        }]);
