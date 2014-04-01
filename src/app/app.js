'use strict';

angular.module('ngGiaffer', [
    'templates',
    'ngGiaffer.conf',
    'ngGiaffer.home',
    'ngGiaffer.interests',
    'ngGiaffer.settings',
    'ngGiaffer.about',
    'ui.router'
])

.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

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
})

.controller('AppCtrl', ['$rootScope', '$scope', '$florm', '$modal',
        function ($rootScope, $scope, $florm, $modal) {

        var defaultSettings = {
            searchEngine: 'google',
            nbTerms: 2
        };

        var Settings = $florm('settings');
        if (Settings.all().length === 0){
            var defaultsOpt = Settings.new(defaultSettings);
            defaultsOpt.save();
        }
        $rootScope.settings = Settings.all()[0];

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Giaffer';
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
}]);
