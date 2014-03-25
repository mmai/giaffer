'use strict';

angular.module('ngDevstack.home', [
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
            var options = {
                nbTerms:2
            };

            var Interests = $florm('interests');
            var Giaffer = new window.Giaffer(options, Interests.all());

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };
            $scope.newterms();
        }
    ]);
