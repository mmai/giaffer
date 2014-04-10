expect = chai.expect;

describe( 'AppCtrl', function() {
        describe('setDefaults', function(){
                beforeEach(module( 'ngGiaffer' ) );

            });

        describe( 'isCurrentUrl', function() {
                var AppCtrl, $location, $scope;

                beforeEach( angular.mock.module( 'ngGiaffer' ) );

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
