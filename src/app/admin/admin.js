'use strict';

angular.module('ngGiaffer.admin', [
    'ngGiaffer.ngReallyClickModule',
    'ui.router',
    'ngFlorm'
])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin/',
        views: {
            "main": {
                templateUrl: 'admin/admin.tpl.html'
            }
        },
        data: {
            pageTitle: 'Admin'
        }
    })
}])

.controller('SettingsCtrl', [
        '$scope',
        '$florm',
        function($scope, $florm){

            var settings = $florm('settings').all()[0];
            $scope.settings = settings ;

            function updateSetting(name, value){
                settings[name] = value;
                settings.save();
            }

            /***** SearchEngine ****/
            $scope.searchEngines = Object.getOwnPropertyNames(window.searchEngines);
            $scope.searchEngine = settings.searchEngine;
            $scope.updateSearchEngine = function(searchEngine){
                updateSetting('searchEngine', searchEngine);
            };

            /***** Number of searched topics ****/
            $scope.nbTerms = settings.nbTerms;
            $scope.updateNbTerms = function(nbTerms){
                updateSetting('nbTerms', nbTerms);
            };

        }])

.controller('InterestsCtrl', [
        '$scope',
        '$florm',
        function($scope, $florm){

            var Interests = $florm('interests');
            $scope.interests = Interests.all();

            $scope.newinterest = {name: '', searchString: ''};

            $scope.toggleEditMode = function (interest) {
                interest.editMode = !interest.editMode;
            };

            $scope.addInterest = function(){
                if ($scope.newinterest.name){
                    var newinterest = Interests.new({
                            name:$scope.newinterest.name,
                            searchString:'"' + $scope.newinterest.name + '"',
                        });
                    newinterest.save();
                    $scope.newinterest = {};
                    $scope.interests.push(newinterest);
                }
            };

            $scope.updateInterest = function(interest){
                interest.editMode = false;
                interest.save();
            };

            $scope.cancelEditInterest = function(interest){
                var dbinterest = Interests.find(interest.id);
                interest.name = dbinterest.name;
                interest.searchString = dbinterest.searchString;
                interest.editMode = false;
            };

            $scope.deleteInterest = function(interest){
                Interests.delete(interest.id);
                $scope.interests = Interests.all();
            };

            $scope.addInterestTerm = function(interest){
                interest.terms.push(interest.newterm);
                delete(interest.newterm);
                interest.save();
            };


            $scope.deleteInterestTerm = function(interest, term){
                interest.terms  = interest.terms.filter(function(t){
                        return t !== term;
                    });
                interest.save();
            };


        }]);

