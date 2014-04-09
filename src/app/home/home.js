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
            var State = $florm('state');
            var state = State.all()[0];

            var giafferOptions = {
                searchEngine: $rootScope.settings.searchEngine,
                nbTerms: $rootScope.settings.nbTerms
            };

            var Giaffer = new window.Giaffer(giafferOptions, Interests.all());

            $scope.nbInterests = Interests.all().length;
            $rootScope.page = 'search';

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };

            $rootScope.$watchCollection('settings', function(newSettings, oldSettings){
                    Giaffer.setEngine(newSettings.searchEngine);
                    $scope.newterms();
                });

            if (state.firstVisit){
                $rootScope.$watchCollection('Interests', function(newi, oldi){
                        $rootScope.checkFirstVisit($florm);
                    });
            }
        }
    ]);
