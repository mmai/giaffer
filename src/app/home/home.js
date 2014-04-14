'use strict';



angular.module('ngGiaffer.home', ['ui.router'])

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
        '$interests',
        '$settings',
        function($scope, $rootScope, $interests, $settings){

            var giafferOptions = {
                searchEngine: $settings.get('searchEngine'),
                nbTerms: $settings.get('nbTerms')
            };

            var Giaffer = new window.Giaffer(giafferOptions, $interests.all());

            $scope.nbInterests = $interests.all().length;
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
