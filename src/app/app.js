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
    'ngGiaffer.ngKeyPressModule',
    'ui.router',
    'ui.bootstrap'
//    , 'ngAnimate'
])

.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$settingsProvider', '$appStateProvider', 'defaults', function ($urlRouterProvider, $locationProvider, $stateProvider, $settingsProvider, $appStateProvider, defaults) {
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

            $settingsProvider.setDefaults(defaults);
            $appStateProvider.setDefaults({firstVisit:false});
}])

.controller('AppCtrl', ['$rootScope', '$scope', '$florm', '$modal', 'defaults', '$settings', '$appState',
        function ($rootScope, $scope, $florm, $modal, defaults, $settings, $appState) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    if (angular.isDefined(toState.data.pageTitle)) {
                        $scope.pageTitle = toState.data.pageTitle + ' | Giaffer';
                    }
                });

            $scope.$on('settings:set', function(event, data){
                    if (data.name === 'csstheme'){
                        $scope.csstheme = $settings.get('csstheme');
                    }
                });

            $rootScope.checkFirstVisit = function($florm){
                if ($appState.get('firstVisit')){
                    var Interests = $florm('interests');

                    if (Interests.all().length === 0){
                        for (var i=0, len=defaults.interests.length;i<len;i++){
                            Interests.new(defaults.interests[i]).save();
                        }
                    } else {
                        if (!interestsEquals(Interests.all(), defaults.interests)){
                            $appState.set('firstVisit', false);
                        }
                    }
                }
                this.firstVisit = $appState.get('firstVisit');
            };

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

            var State = $florm('state');
            if (State.all().length === 0){
                var defaultState = State.new({firstVisit:true});
                defaultState.save();
            }

            $scope.csstheme = $settings.get('csstheme');

            $rootScope.checkFirstVisit($florm);
            angular.element(document).ready(function () {
                    $rootScope.loaded = true;
                });
        }]);



function interestsEquals(a, b){
    if (a.length !== b.length) return false;

    a = arr2Obj(a, 'name', 'searchString');
    b = arr2Obj(b, 'name', 'searchString');

    var names = a.keys;
    var name;
    for (var i = 0, len = names; i < len; i++){
        name = names[i];
        if (b[name] !== a[name]) return false;
    }

    return true;
}

function arr2Obj(arr, key, val){
    var obj = {};
    for (var i=0, len=arr.length;i<len;i++){
        obj[arr[i][key]] = arr[i][val];
    }
    return obj;
}
