'use strict';

angular.module('ngGiaffer', [
    'templates',
    'ngGiaffer.conf',
    'ngGiaffer.interests',
    'ngGiaffer.settings',
    'ngGiaffer.about',
    'ngGiaffer.settingsServiceModule',
    'ngGiaffer.interestServiceModule',
    'ngGiaffer.ngKeyPressModule',
    'ui.router',
    'ui.bootstrap'
])

.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$settingsProvider', '$interestsProvider', 'defaults', function ($urlRouterProvider, $locationProvider, $stateProvider, $settingsProvider, $interestsProvider, defaults) {
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

            $urlRouterProvider.when('/', '/settings');

            $settingsProvider.setDefaults(defaults.settings);
            $interestsProvider.setDefaults(defaults.interests);
}])

.controller('AppCtrl', ['$rootScope', '$scope', '$modal', 'defaults', '$settings', '$interests',
        function ($rootScope, $scope, $modal, defaults, $settings, $interests) {
       
            $scope.$on('settings:set', function(event, data){
                    if (data.name === 'csstheme'){
                        $scope.csstheme = $settings.get('csstheme');
                    }
                });

            $scope.csstheme = $settings.get('csstheme');

            angular.element(document).ready(function () {
                    $scope.loaded = true;
                });
        }]);



