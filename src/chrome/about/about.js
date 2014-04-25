'use strict';

angular.module('ngGiaffer.about', [
    'ui.router'
])

.config(function ($stateProvider) {
    $stateProvider.state('about', {
        url: '/about/',
        views: {
            "main": {
                controller: 'AboutCtrl',
                templateUrl: 'about/aboutMin.tpl.html'
            }
        },
        data: {
            pageTitle: 'About'
        }
    });
})

.controller('AboutCtrl', function ($scope) {
});
