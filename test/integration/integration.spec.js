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
describe( 'Admin', function() {
        app = $('');

        
        beforeEach(module('ngGiaffer'));

        beforeEach(inject(function($rootScope, $compile, $templateCache){
                    html = '<div ng-app="ngGiaffer"><div ng-view></div>';
                    html += $templateCache.get('settings/settings.tpl.html');
                    html += "</div>";
                    app = $compile(html)($rootScope.$new());
                    $rootScope.$digest();
                }));


        it( 'should display the search engines select box', function() {
                //expect(window.document.getElementById('searchEngine').options).to.have.deep.property("[0].value", 'google');
                var optionsElements = app.find('select options');
                expect(optionsElements).to.have.deep.property("[0].val", 'google');
            });
    });
