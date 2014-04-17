'use strict';

angular.module('ngGiaffer', [
    'templates',
    'ngGiaffer.conf',
    'ngGiaffer.home',
    'ngGiaffer.interests',
    'ngGiaffer.settings',
    'ngGiaffer.about',
    'ngGiaffer.settingsServiceModule',
    'ngGiaffer.appStateServiceModule',
    'ngGiaffer.interestServiceModule',
    'ngGiaffer.ngKeyPressModule',
    'ui.router',
    'ui.bootstrap'
])

.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$settingsProvider', '$appStateProvider', '$interestsProvider', 'defaults', function ($urlRouterProvider, $locationProvider, $stateProvider, $settingsProvider, $appStateProvider, $interestsProvider, defaults) {
            $urlRouterProvider.otherwise('/');
            // Please enable mod rewrite in server.js when html5Mode is enabled.
            // $locationProvider.html5Mode(true);


            /*
             Make a trailing slash optional for all routes
             */
            $urlRouterProvider.rule(function ($injector, $location) {
                    var path = $location.path(),
                    search = $location.search(),
                    params;

                    if (path[path.length - 1] === '/') {
                        return;
                    }

                    if (!Object.keys(search).length) {
                        return path + '/';
                    }

                    params = [];
                    angular.forEach(search, function (v, k) {
                            params.push(k + '=' + v);
                        });

                    return path + '/?' + params.join('&');
                });

            $settingsProvider.setDefaults(defaults.settings);
            $interestsProvider.setDefaults(defaults.interests);
            $appStateProvider.setDefaults({firstVisit:true});
}])

.controller('AppCtrl', ['$rootScope', '$scope', '$modal', 'defaults', '$settings', '$appState', '$interests',
        function ($rootScope, $scope, $modal, defaults, $settings, $appState, $interests) {
            $rootScope.checkFirstVisit = function(){
                $scope.firstVisit = $appState.get('firstVisit');
                if ($scope.firstVisit && !$interests.isDefaults()){
                    $scope.firstVisit = false;
                    $appState.set('firstVisit', $scope.firstVisit);
                }
            };

            $scope.$on('interests:add', function(event, data){
                   $rootScope.checkFirstVisit();
               });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    if (angular.isDefined(toState.data.pageTitle)) {
                        $scope.pageTitle = toState.data.pageTitle + ' | Giaffer';
                        $scope.subTitle = toState.data.pageTitle.toLowerCase();
                    }
                });

            $scope.$on('settings:set', function(event, data){
                    if (data.name === 'csstheme'){
                        $scope.csstheme = $settings.get('csstheme');
                    }
                });

            $scope.openSettings = function(){
                $modal.open({
                        controller: 'SettingsCtrl',
                        templateUrl: "settings/settings.tpl.html",
                    });
            }  

            $scope.openAbout = function(){
                $modal.open({
                        controller: 'AboutCtrl',
                        templateUrl: "about/about.tpl.html",
                    });
            }  

            $scope.csstheme = $settings.get('csstheme');

            $rootScope.checkFirstVisit();
            angular.element(document).ready(function () {
                    $scope.loaded = true;
                });
        }]);



