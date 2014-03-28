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
        '$florm',
        function($scope, $florm){
            var settings = $florm('settings').all()[0];

            var Interests = $florm('interests');
            var Giaffer = new window.Giaffer(settings, Interests.all());

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };
            $scope.newterms();
        }
    ]);
