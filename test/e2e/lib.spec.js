// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('no protractor at all', function() {
  it('should still do normal tests', function() {
    expect(true).to.equal(true);
  });
});

describe('protractor library', function() {
  it('should expose the correct global variables', function() {
    expect(protractor).to.exist;
    expect(browser).to.exist;
    expect(by).to.exist;
    expect(element).to.exist;
    expect($).to.exist;
  });

  it('should display the correct title', function() {
    browser.get('index.html');
    expect($('h1').getText()).to.eventually.equal('This is ng-devstack!');
  });
});

describe('visual interface', function() {
        describe('entry means', function(){
                it('should display a link to start a search', function(){
                        browser.get('index.html');
                        expect($('#search').isPresent()).to.eventually.be.true;
                    })
            });
    });
