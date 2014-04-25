expect = chai.expect;

describe( 'HomeCtrl', function() {
        var HomeCtrl, $scope, $injector, $settings;

        beforeEach( module( 'ngGiaffer' ) );

        beforeEach( inject( function( $controller, $rootScope, _$injector_) {
                    $injector = _$injector_;
                    //mock settings
                    $settings = {
                        get: function(name){return this[name]},
                        searchEngine: 'google.fr',
                        nbTerms: 2
                    }
                    $scope = $rootScope.$new();
                    HomeCtrl = $controller( 'HomeCtrl', { $scope: $scope, $settings: $settings});
                }));

        describe('settings:nbinterests', function(){
                it('should pick the number of interests defined in the settings', function(){
                        expect($scope.search.themes.length).to.equal($settings.get('nbTerms'));
                    });
            })


    });
