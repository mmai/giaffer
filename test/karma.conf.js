module.exports = function(config) {
    config.set({
            frameworks: ['mocha'],

            /** This section is not needed when karma is started by gulp **/
            // list of files / patterns to load in the browser
            basePath: '..',
            files: [
                //3rd party code
                'vendor/angular/angular.js',
                "vendor/angular-ui-router/release/angular-ui-router.js",
                "vendor/angular-bootstrap/ui-bootstrap-tpls.js",
                'vendor/jquery/dist/jquery.js',

                //Test-specific code
                'node_modules/chai/chai.js',
                'vendor/angular-mocks/angular-mocks.js',

                //App-specific code
                'build/common/**/*.js',
                'build/app/**/*.js',
                'src/app/**/*.spec.js'
            ],
            // list of files to exclude
            exclude: [
            ],
            /** End of section not needed by gulp **/

            // use dots reporter, as travis terminal does not support escaping sequences
            // possible values: 'dots', 'progress', 'junit', 'teamcity'
            // CLI --reporters progress
            reporters: ['progress'],

            // web server port
            // CLI --port 9876
            //port : 9876;

            // cli runner port
            // CLI --runner-port 9100
            //runnerPort : 9100;

            // enable / disable colors in the output (reporters and logs)
            // CLI --colors --no-colors
            colors: true,

            // enable / disable watching file and executing tests whenever any file changes
            // CLI --auto-watch --no-auto-watch
            autoWatch: true,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            // CLI --browsers Chrome,Firefox,Safari
//            browsers : ['Chrome', 'Firefox'],
            browsers : ['PhantomJS'],

            // If browser does not capture in given timeout [ms], kill it
            // CLI --capture-timeout 5000
            captureTimeout : 5000,

            // Auto run tests on start (when browsers are captured) and exit
            // CLI --single-run --no-single-run
            singleRun : false,

            // report which specs are slower than 500ms
            // CLI --report-slower-than 500
            reportSlowerThan : 500
        });
};
