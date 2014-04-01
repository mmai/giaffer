'use strict';

angular.module('ngGiaffer.home', [
    'ui.router',
    'ngFlorm'
])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data: {
            pageTitle: 'Home'
        }
    });
}])

.controller('HomeCtrl', [
        '$scope',
        '$rootScope',
        '$florm',
        function($scope, $rootScope, $florm){
            var Interests = $florm('interests');
            var Giaffer = new window.Giaffer($rootScope.settings, Interests.all());

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };

            $rootScope.$watchCollection('settings', function(newSettings, oldSettings){
                    Giaffer.setEngine(newSettings.searchEngine);
                    $scope.newterms();
                });

        }
    ]);
