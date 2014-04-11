'use strict';

angular.module('ngGiaffer.settings', [
    'ui.router',
    'ui.bootstrap'
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

.controller('SettingsCtrl', ['$scope','$rootScope', '$modalInstance', '$settings', function SettingsCtrl($scope, $rootScope, $modalInstance, $settings){
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

