expect = chai.expect;

describe( 'Integration of Giaffer', function() {
        app = $('');

        
        beforeEach(module('ngGiaffer'));

        beforeEach(inject(function($rootScope, $compile, $templateCache){
                    html = '<div ng-app="ngGiaffer"><div ng-view></div>';
                    html += $templateCache.get('home/home.tpl.html');
                    html += "</div>";
                    app = $compile(html)($rootScope.$new());
                    $rootScope.$digest();
                }));

        it( 'should have the correct header', function() {
                expect(app.find('h1').text()).to.equal("Giaffer");
            });


       /* describe( 'isCurrentUrl', function() {
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
            */
    });
