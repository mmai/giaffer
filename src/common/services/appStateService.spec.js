expect = chai.expect;

describe( '$appState', function() {
        var appState;
        beforeEach( module( 'ngFlorm' ) );
        beforeEach( module( 'ngGiaffer.appStateServiceModule' ) );
        beforeEach( module( function($appStateProvider){
                    $appStateProvider.setDefaults({firstVisit:false});
                } ) );

        beforeEach(inject(function($florm){
                    $florm('state').truncate();
                }));
        beforeEach( inject( function($appState) {
                    appState = $appState;
                }));

        describe('$appState:set', function(){
                it('should set a value', function(){
                        expect(appState.get('test')).to.be.undefined;
                        appState.set('test', 'testval');
                        expect(appState.get('test')).to.equal('testval');
                    });
            })

    });
