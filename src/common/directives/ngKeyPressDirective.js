'use strict';

var keyPressModule = angular.module('ngGiaffer.ngKeyPressModule', []);

keyPressModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", getKeyManager(scope, attrs, 13, 'ngEnter'));
    };
});

keyPressModule.directive('ngEsc', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", getKeyManager(scope, attrs, 27, 'ngEsc'));
    };
});

var getKeyManager = function (scope, attrs, keycode, attrName) {
    return function(event){
            if(event.which === keycode) {
                scope.$apply(function (){
                    scope.$eval(attrs[attrName]);
                });
                event.preventDefault();
            }
        };
    };
