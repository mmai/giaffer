expect = chai.expect;

describe( '$settings', function() {
        var settingsProvider, florm;

        beforeEach( module( 'ngFlorm' ) );
        beforeEach( module( 'ngGiaffer.settingsServiceModule' ) );

        beforeEach( module( function($settingsProvider){
                    settingsProvider = $settingsProvider;
                }));

        beforeEach( inject( function( $florm) {
                    florm = $florm;
                }));

        describe('$settings:defaults', function(){

                it('should set only one defaults record', function(){
//                        florm('settings').truncate();

                        var settings1 = settingsProvider.$get;
                        var settings2 = settingsProvider.$get;

                        var Settings = florm('settings');
                        var allSettings = Settings.all();
                        expect(allSettings.length).to.equal(1);
                    });
            })


    });
