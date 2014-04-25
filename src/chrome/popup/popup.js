'use strict';

angular.module('ngGiaffer.popup', [
        'ngGiaffer.conf',
        'ngGiaffer.settingsServiceModule',
        'ngGiaffer.interestServiceModule'
    ])

.config(['$settingsProvider', '$interestsProvider', 'defaults', function ($settingsProvider, $interestsProvider, defaults) {
            $settingsProvider.setDefaults(defaults.settings);
            $interestsProvider.setDefaults(defaults.interests);
}])

.controller('PopupCtrl', [
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

            $scope.newterms = function (){
                $scope.search = Giaffer.search();
            };

            $scope.newterms();
        }
    ]);
