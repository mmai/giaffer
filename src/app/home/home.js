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
        '$settings',
        function($scope, $rootScope, $florm, $settings){
            var Interests = $florm('interests');
            var State = $florm('state');
            var state = State.all()[0];

            var giafferOptions = {
                searchEngine: $settings.searchEngine,
                nbTerms: $settings.nbTerms
            };

            var Giaffer = new window.Giaffer(giafferOptions, Interests.all());

            $scope.nbInterests = Interests.all().length;
            $rootScope.page = 'search';

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };

            $scope.$on('settings:set', function(event, data){
                    if (data.name === 'searchEngine'){
                        Giaffer.setEngine($settings.get('searchEngine'));
                        $scope.newterms();
                    } else if (data.name === 'nbTerms') {
                        Giaffer.setNbTerms($settings.get('nbTerms'));
                        $scope.newterms();
                    }
                });

            $scope.newterms();
        }
    ]);
