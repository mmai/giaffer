expect = chai.expect;

describe( 'AppCtrl', function() {
        describe( 'isCurrentUrl', function() {
                var AppCtrl, $location, $scope;

                beforeEach( angular.mock.module( 'ngDevstack' ) );

                beforeEach( inject( function( $controller, _$location_, $rootScope ) {
                            $location = _$location_;
                            $scope = $rootScope.$new();
                            AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
                        }));

                it( 'should pass a dummy test', inject( function() {
                            expect( AppCtrl ).to.not.equal(null);
                        }));
            });
    });
