'use strict';

angular.module('ngGiaffer.settings', [
    'ui.router',
    'ui.bootstrap',
    'ngFlorm'
])

//*
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('settings', {
        url: '/settings/'
       ,views: {
            "main": {
                templateUrl: 'settings/settingsMin.tpl.html',
                controller: 'SettingsMinCtrl'
            }
        }
        ,data: {
            pageTitle: 'Settings'
        }
    })
}])
//*/

.controller('SettingsCtrl', ['$scope','$rootScope', '$florm', '$modalInstance', '$settings', function SettingsCtrl($scope, $rootScope, $florm, $modalInstance, $settings){
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

        }])

.controller('SettingsMinCtrl', ['$scope','$rootScope', '$florm', function SettingsCtrl($scope, $rootScope, $florm){
            function updateSetting(name, value){
                $rootScope.settings[name] = value;
                $rootScope.settings.save();
            }

            $scope.searchEngines = Object.getOwnPropertyNames(window.searchEngines);
            $scope.searchEngine = $rootScope.settings.searchEngine;
            $scope.updateSearchEngine = function(searchEngine){
                updateSetting('searchEngine', searchEngine);
            };

            $scope.nbTerms = $rootScope.settings.nbTerms;
            $scope.updateNbTerms = function(nbTerms){
                updateSetting('nbTerms', nbTerms);
            };

        }]);


