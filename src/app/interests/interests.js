'use strict';

angular.module('ngGiaffer.interests', [
    'ngGiaffer.ngReallyClickModule',
    'ui.router',
    'ngFlorm'
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
            pageTitle: 'Interests'
        }
    })
}])

.controller('InterestsCtrl', [
        '$scope',
        '$florm',
        function($scope, $florm){

            var Interests = $florm('interests');
            $scope.interests = Interests.all();

            $scope.deletedInterest = null;
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
                $scope.deletedInterest = interest;
                Interests.delete(interest.id);
                $scope.interests = Interests.all();
            };

            $scope.undoDeleteInterest = function(){
                $scope.deletedInterest.save();
                $scope.interests = Interests.all();
                $scope.closeUndoDelete();
            };

            $scope.closeUndoDelete = function(){
                $scope.deletedInterest = null;
            }

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

