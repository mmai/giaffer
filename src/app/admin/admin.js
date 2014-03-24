'use strict';

angular.module('ngDevstack.admin', [
    'ngDevStack.ngReallyClickModule',
    'ui.router',
    'ngFlorm'
])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin/',
        views: {
            "main": {
                controller: 'AdminCtrl',
                templateUrl: 'admin/admin.tpl.html'
            }
        },
        data: {
            pageTitle: 'Admin'
        }


        /*,onEnter: function($stateParams, $state, $modal) {
        $modal.open({
            controller: 'AdminCtrl',
            templateUrl: "admin/admin.tpl.html",
        }).result.then(function(result) {
            if (result) {
                return $state.transitionTo("home");
            }
        });
   }     */
    

    });
}])


.controller('AdminCtrl', [
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
//                    $scope.toggleEditMode(newinterest);
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
//                localStorageService.set('interests', $scope.interests);
            };


            $scope.deleteInterestTerm = function(interest, term){
                interest.terms  = interest.terms.filter(function(t){
                        return t !== term;
                    });
                interest.save();
                //localStorageService.set('interests', $scope.interests);
            };


        }]);

