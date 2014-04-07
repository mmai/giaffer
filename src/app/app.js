'use strict';

angular.module('ngGiaffer', [
    'templates',
    'ngGiaffer.conf',
    'ngGiaffer.home',
    'ngGiaffer.interests',
    'ngGiaffer.settings',
    'ngGiaffer.about',
    'ngGiaffer.ngKeyPressModule',
    'ui.router'
//    , 'ngAnimate'
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

.controller('AppCtrl', ['$rootScope', '$scope', '$florm', '$modal', 'defaults',
        function ($rootScope, $scope, $florm, $modal, defaults) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    if (angular.isDefined(toState.data.pageTitle)) {
                        $scope.pageTitle = toState.data.pageTitle + ' | Giaffer';
                    }
                });

            $rootScope.checkFirstVisit = function($florm){
                var State = $florm('state');
                var state = State.all()[0];
                if (state.firstVisit){
                    var Interests = $florm('interests');

                    if (Interests.all().length === 0){
                        for (var i=0, len=defaults.interests.length;i<len;i++){
                            Interests.new(defaults.interests[i]).save();
                        }
                    } else {
                        if (!interestsEquals(Interests.all(), defaults.interests)){
                            state.firstVisit = false;
                            state.save();
                        }
                    }
                }
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

            setDefaults($florm, defaults);
            $rootScope.checkFirstVisit($florm);

            var Settings = $florm('settings');
            $rootScope.settings = Settings.all()[0];

        }]);

function setDefaults($florm, defaults){
    var Settings = $florm('settings');
    if (Settings.all().length === 0){
        var defaultsOpt = Settings.new(defaults.search);
        defaultsOpt.save();
    }

    var State = $florm('state');
    if (State.all().length === 0){
        var defaultState = State.new({firstVisit:true});
        defaultState.save();
    }
}

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
