expect = chai.expect;

describe( 'AppCtrl', function() {
        var AppCtrl, $location, $scope;
        var appState = {firstVisit:true};

        beforeEach( module( 'ngGiaffer' ) );
        beforeEach( inject( function( $controller, _$location_, $rootScope ) {

                    var AppStateServiceMock = { 
                        get: function (name){
                            return appState[name];
                        },
                        set: function(name, value){
                            appState['name'] = value;
                        }
                    };

                    $location = _$location_;
                    $scope = $rootScope.$new();
                    AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope, $appState: AppStateServiceMock });
                }));

        describe('AppCtrl:setDefaults', function(){
                var appDefaults;
                beforeEach( inject(function(defaults){
                                appDefaults = defaults;
                            }));
                it('should set default csstheme value', function(){
                        expect($scope.csstheme).to.equal(appDefaults.settings.csstheme);
                    });

                it('should set default interests on first visit', function(){

                    });

            });

        describe('AppCtrl:firstVisit', function(){
                it('should set firstVisit initial status according to appState.firstVisit', function(){
                        expect($scope.firstVisit).to.be.true;
                    });

                it('should update firstVisit state when interests are modified', function(){

                        expect($scope.firstVisit).to.be.false;
                    })
            })


    });
