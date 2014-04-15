expect = chai.expect;

describe( 'AppCtrl', function() {
        var AppCtrl, $location, $scope, $injector;
        var appState = {firstVisit:true};

        beforeEach( module( 'ngGiaffer' ) );
        beforeEach( module( 'ngFlorm' ) );

        beforeEach(inject(function($florm){
                    $florm('interests').truncate();
                }));

        beforeEach( inject( function( $controller, _$location_, $rootScope, _$injector_) {

                    var AppStateServiceMock = { 
                        appState:{firstVisit:true},
                        get: function (name){
                            return appState[name];
                        },
                        set: function(name, value){
                            appState['name'] = value;
                        }
                    };

                    $location = _$location_;
                    $injector = _$injector_;
                    $scope = $rootScope.$new();
                    AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope, $appState: AppStateServiceMock });
                }));
        describe('setDefaults', function(){
                var appDefaults;
                beforeEach( inject(function(defaults){
                                appDefaults = defaults;
                            }));
                it('should set default csstheme value', function(){
                        expect($scope.csstheme).to.equal(appDefaults.settings.csstheme);
                    });

                it('should set default interests on first visit', function(){
//                        console.log(appDefaults.interests);

                    });

            });

        describe('firstVisit', function(){
                it('should set firstVisit initial status according to appState.firstVisit', function(){
                        expect($scope.firstVisit).to.be.true;
                    });

                it('should update firstVisit state when interests are added', function(){
                        var $interests = $injector.get('$interests');
                        var $appState = $injector.get('$appState');
                        expect($interests.isDefaults(), 'initial isDefaults').to.be.true;
                        sinon.spy($interests, 'isDefaults');
                        $interests.add('Angular', '"Angular.js"|"Angularjs"');
                        $interests.isDefaults.should.have.been.called
                        expect($interests.isDefaults(), 'isDefaults').to.be.false;
                        expect($appState.get('firstVisit'), 'appState.firstVisit').to.be.false;
                        expect($scope.firstVisit, 'scope.firstVisit').to.be.false;
                    })
            })


    });
