'use strict';

angular.module('ngGiaffer.settings', [
    'ui.router',
    'ui.bootstrap'
])

//*
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('settings', {
        url: '/settings/',
        views: {
            "main": {
                templateUrl: 'settings/settings.tpl.html',
                controller: 'SettingsCtrl'
            }
        },
        data: {
            pageTitle: 'Settings',
            pagename: 'settings'
        }
    });
}])
//*/

.controller('SettingsCtrl', ['$scope','$rootScope', '$settings', function SettingsCtrl($scope, $rootScope, $settings){
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

