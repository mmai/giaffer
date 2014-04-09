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

.controller('SettingsCtrl', ['$scope','$rootScope', '$florm', '$modalInstance', function SettingsCtrl($scope, $rootScope, $florm, $modalInstance){
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

            $scope.csstheme = $rootScope.settings.csstheme;
            $scope.switchTheme = function(csstheme){
                updateSetting('csstheme', csstheme);
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


