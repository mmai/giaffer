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
                nbTerms:2,
                searchEngine:"google.fr"
            };

            var Interests = $florm('interests');
            var interests = Interests.all();

            var Giaffer = new window.Giaffer(options, interests);
            var search = Giaffer.search();

            //      chrome.tabs.create({'url': search.url});
            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };
            $scope.search = search;
        }
    ]);
