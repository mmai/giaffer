expect = chai.expect;

describe( '$interests', function() {
        var interests;
        beforeEach( module( 'ngFlorm' ) );
        beforeEach( module( 'ngGiaffer.interestServiceModule' ) );
        beforeEach( module( function($interestsProvider){
                   var defaults = [
                        {name:"interest1", searchString:'"interest1"' },
                        {name:"interest2", searchString:'"interest2"' }
                    ];
                    $interestsProvider.setDefaults(defaults);
                } ) );

        beforeEach(inject(function($florm){
                    $florm('interests').truncate();
                }));
        beforeEach( inject( function($interests) {
                    interests = $interests;
                }));

        describe('$interests:isDefaults', function(){
                it('should initially return true', function(){
                        expect(interests.isDefaults()).to.be.true;
                    });
                it('should return false when a interest has been added', function(){
                        interests.add('interest3', '"interest3"');
                        expect(interests.isDefaults()).to.be.false;
                    })
            })

    });
