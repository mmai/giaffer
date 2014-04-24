'use strict';

angular.module('ngGiaffer.options', [
        'ngGiaffer.conf',
        'ngGiaffer.settingsServiceModule'
    ])

.config(['$settingsProvider', 'defaults', function ($settingsProvider, defaults) {
            $settingsProvider.setDefaults(defaults.settings);
}])

.controller('OptionsCtrl', ['$scope','$rootScope', '$settings', function SettingsCtrl($scope, $rootScope, $settings){
            $scope.searchEngines = Object.getOwnPropertyNames(window.searchEngines);
            $scope.searchEngine = $settings.get('searchEngine');
            $scope.updateSearchEngine = function(searchEngine){
                $settings.set('searchEngine', searchEngine);
            };

            $scope.nbTerms = $settings.get('nbTerms');
            $scope.updateNbTerms = function(nbTerms){
                $settings.set('nbTerms', nbTerms);
            };

            $scope.csstheme = $settings.get('csstheme');
            $scope.switchTheme = function(csstheme){
                $settings.set('csstheme', csstheme);
            };

        }]);

