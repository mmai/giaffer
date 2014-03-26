'use strict';

/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure?/yes/no" ng-really-click="takeAction()" function
 */
angular.module('ngGiaffer.ngReallyClickModule', ['ui.bootstrap'])

.directive('ngReallyClick', ['$modal', function($modal) {

            var ModalInstanceCtrl = function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            return {
                restrict: 'A',
                scope: {
                    ngReallyClick: "&",
                    ngReallyMessage: "&"
                },
                link: function(scope, element) {
                    element.bind('click', function() {
                            var message = scope.ngReallyMessage();
                            message = message || "Are you sure ?";

                            var modalHtml = '<h3 class="modal-body">' + message + '</h3>';
                            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Yes</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

                            var modalInstance = $modal.open({
                                    template: modalHtml,
                                    controller: ModalInstanceCtrl
                                });

                            modalInstance.result.then(function () {
                                    scope.ngReallyClick();
                                });
                        });

        }
    }
}]);
