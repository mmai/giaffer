'use strict';

angular.module('ngGiaffer.interests', [
    'ngGiaffer.interestServiceModule',
    'ui.router'
])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('interests', {
        url: '/interests/',
        views: {
            "main": {
                templateUrl: 'interests/interests.tpl.html'
            }
        },
        data: {
            pageTitle: 'Interests',
            pagename: 'interests'
        }
    })
}])

.controller('InterestsCtrl', [
        '$scope',
        '$rootScope',
        '$interests',
        function($scope, $rootScope, $interests){

            $scope.interests = $interests.all();

            $scope.deletedInterest = null;
            $scope.newinterest = {name: '', searchString: ''};

            $scope.toggleEditMode = function (interest) {
                interest.editMode = !interest.editMode;
            };

            $scope.addInterest = function(){
                if ($scope.newinterest.name){
                    var newinterest = $interests.add($scope.newinterest.name, '"' + $scope.newinterest.name + '"');
                    $scope.newinterest = {};
                    $scope.interests.push(newinterest);
                }
            };

            $scope.updateInterest = function(interest){
                interest.editMode = false;
                interest.save();
            };

            $scope.cancelEditInterest = function(interest){
                var dbinterest = $interests.find(interest.id);
                interest.name = dbinterest.name;
                interest.searchString = dbinterest.searchString;
                interest.editMode = false;
            };

            $scope.deleteInterest = function(interest){
                $scope.deletedInterest = interest;
                $interests.delete(interest.id);
                $scope.interests = $interests.all();
            };

            $scope.undoDeleteInterest = function(){
                $scope.deletedInterest.save();
                $scope.interests = $interests.all();
                $scope.closeUndoDelete();
            };

            $scope.closeUndoDelete = function(){
                $scope.deletedInterest = null;
            }

        }]);

