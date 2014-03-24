// Protractor conf
// A small suite to make sure the mocha framework works.
exports.config = {
    //needed for method A, comment to use method B (jar)
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: null,//search in node_modules/protractor/... by default

  framework: 'mocha',
//  framework: 'cucumber',

  // Spec patterns are relative to this directory.
  specs: [
    'e2e/*_spec.js'
//    'e2e/*.feature'
  ],

  capabilities: {
//    'browserName': 'chrome'
    'browserName': 'phantomjs'
  },

  baseUrl: 'http://localhost:4000',

  /*
  cucumberOpts: {
    require: 'cucumber/definitions',
    tags: '@dev',
    format: 'pretty'
  }

  ,params: {
    login: {
      user: 'Jane',
      password: '1234'
    }
  }
  */
};
