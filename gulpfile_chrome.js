/* jshint strict: false */

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    server  = require('tiny-lr')(),
    config  = require('./gulp_config_chrome.json');



// Prepare CSS
// ===========

// Compile SASS and add prefixes
var fnSass = function (path) {
    return gulp.src(path)
        .pipe(plugins.plumber())
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(plugins.concat('main.scss'))
        .pipe(plugins.rubySass({ style: 'expanded' }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest(config.build + '/assets'));
};
gulp.task('styles:sass', function () {
    var files = [config.app + '/sass/main.scss', config.app + '/common/**/*.scss', config.app + '/' + config.platform +'/**/*.scss'];
    return fnSass(files);
});

// Prepare vendor files
// ====================

gulp.task('vendor_overrides', function(){
    return gulp.src('vendor_overrides/**/*', { base: 'vendor_overrides' })
        .pipe(gulp.dest('vendor'));
});

// Copy vendor JS files to /build/
gulp.task('vendor:js', ['vendor_overrides'], function () {
    if (!config.vendor_files.js.length) {
        return;
    }
    return gulp.src(config.vendor_files.js, { base: '.' })
        .pipe(gulp.dest(config.build));
});

// Copy bootstrap vendor files to build
gulp.task('bootstrap:base', function () {
    return gulp.src(config.bootstrap.path + '/fonts/*', { base: '.' })
    .pipe(gulp.dest(config.build));
});

// Copy bootstrap themes file to build
gulp.task('bootstrap:theme', function () {
    return gulp.src('vendor/bootswatch/*/bootstrap.css')
    .pipe(plugins.rename( function(path){
                path.basename += '-' + path.dirname; 
                path.dirname = '';
            }))
        .pipe(gulp.dest(config.build + '/' + config.bootstrap.path + '/css' ));
});

// Copy vendor assets to /build/
gulp.task('vendor:assets', ['bootstrap:base', 'bootstrap:theme'], function () {
    if (!config.vendor_files.assets.length) {
        return;
    }
    return gulp.src(config.vendor_files.assets)
        .pipe(gulp.dest(config.build + '/assets'));
});


// Prepare JavaScript
// ==================

// Cache AngularJS templates
var fnHtml2Js = function (path) {
    return gulp.src(path)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.ngHtml2js({
            moduleName: 'templates'
        }))
        .pipe(plugins.concat('app-templates.js'))
        .pipe(gulp.dest(config.build + '/' + config.platform));
};
gulp.task('scripts:html2js', function () {
    return fnHtml2Js(config.paths.templates);
});

// Check JavaScript code quality with JSHint
var fnLint = function (path) {
    return gulp.src(path, { base: config.app })
        .pipe(plugins.plumber())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(gulp.dest(config.build));
};
gulp.task('scripts:lint', function () {
    return fnLint(config.paths.scripts);
});

// Prepare assets
// ==============

// Copy assets
var fnImg = function (path) {
    return gulp.src(path, { base: config.app })
        .pipe(gulp.dest(config.build));
};
gulp.task('assets:img', function () {
    return fnImg(config.paths.assets);
});

// Prepare HTML
// ============

// Inject CSS & JS to index.html source
var fnInject = function (path) {
    var inject = {
        css : (config.vendor_files.css).concat(config.build + '/assets/*.css'),
        js  : (config.vendor_files.js).concat(config.build + '/+('+config.platform+'|lib|common)/**/*.js')
    };

    return gulp.src(inject.css.concat(inject.js), { read: false })
        .pipe(plugins.inject(path, {
            addRootSlash: false,
            ignorePath: ['/', config.build + '/']
        }))
        .pipe(gulp.dest(config.build));
};
gulp.task('html:inject', ['styles:sass', 'scripts:lint', 'scripts:html2js'], function () {
    return fnInject(config.paths.html);
});

// Replace non-optimized HTML blocks
gulp.task('html:replace', ['html:inject'], function () {
    return gulp.src(config.build + '/index.html')
        .pipe(plugins.htmlReplace({
            css: 'assets/main.min.css',
            js: 'assets/main.min.js'
        }))
        .pipe(gulp.dest(config.dist));
});

// Testing
// ============

//  *** Unit tests *****
var testFiles = [
    //test libs and utils
    'node_modules/chai/chai.js',
    'vendor/jquery/dist/jquery.js',
    //vendor libs
    config.build + '/vendor/angular/angular.js',//must be called first
    config.build + '/vendor/**/*.js',
    'vendor/angular-mocks/angular-mocks.js',
    //app components
    config.build + '/+(chrome|lib|common)/**/*.js',
    //Specs
    config.paths.tests,
//    config.test + '/integration/**/*.spec.js',//Integration tests => à faire dans protractor ?
];

gulp.task('test:run', ['vendor:assets'], function() {
        // Be sure to return the stream
        return gulp.src(testFiles)
        .pipe(plugins.karma({
                    configFile: config.test + '/karma.conf.js',
                    action: 'run'
                }))
        .on('error', function(err) {
                process.exit(1);
            });
    });

gulp.task('test:watch', ['vendor:assets'], function() {
    gulp.src(testFiles)
        .pipe(plugins.karma({
                    configFile: config.test + '/karma.conf.js',
                    action: 'watch'
                }));
});

//  *** End to end tests *****
//  Note : the 'watch' task must have been started so that the server is available
//  Choose method A or method B in test/e2e.conf
//
//  method A : launch this task before the 'e2etests' task
//  'seleniumAddress' must be set in test/e2e.conf.js
gulp.task('webdriver', plugins.protractor.webdriver);

//  method B : no need to lauch 'webdriver' task, but slower because the selenium server is started everytime.
//  'seleniumServerJar' must be set in test/e2e.conf.js
gulp.task('e2etests', function(){
        gulp.src([config.test + '/e2e/*.js'])
        .pipe(plugins.protractor.protractor({
                    configFile: config.test + '/e2e.conf.js'
                })) 
        .on('error', function(e) { throw e })
    });

gulp.task('tests', ['e2etests', 'karma']);

// Set up Watch
// ============

// Add files to Watch
gulp.task('watch', ['styles:sass', 'scripts:lint', 'scripts:html2js', 'assets:img', 'vendor:js', 'vendor:assets', 'html:inject'], function () {
    require('./server.js')(server);

    // watch for JS changes
    gulp.watch(config.paths.scripts, function (event) {
        if (event.path.lastIndexOf('.js') === event.path.length - 3) {
            if (event.type === 'deleted') {
                var buildPath = event.path.replace(config.app, config.build);
                return gulp.src(buildPath, { read: false })
                    .pipe(plugins.rimraf());
            } else {
                return fnLint(event.path).pipe(plugins.livereload(server));
            }
        }
    });

    // remove deleted JS files from index.html
    gulp.watch(config.build + '/+('+ config.platform +'|lib|common)/**/*.js', function (event) {
        if (event.type !== 'changed') {
            return fnInject(config.paths.html).pipe(plugins.livereload(server));
        }
    });

    // watch AngularJS templates to cache
    gulp.watch(config.app + '/+('+ config.platform +'|common)/**', function (event) {
        if (event.path.lastIndexOf('.tpl.html') === event.path.length - 9) {
            return fnHtml2Js(config.paths.templates).pipe(plugins.livereload(server));
        }
    });

    // watch for SASS changes
    gulp.watch(config.paths.sass, function (event) {
        if (event.path.lastIndexOf('.scss') === event.path.length - 5) {
            var files = [
                config.app + '/sass/main.scss',
                config.app + '/+('+ config.platform +'|common)/**/*.scss'
            ];
            return fnSass(files).pipe(plugins.livereload(server));
        }
    });

    gulp.watch(config.paths.assets, function (event) {
        if (event.type === 'deleted') {
            var buildPath = event.path.replace(config.app, config.build);
            return gulp.src(buildPath, { read: false })
                .pipe(plugins.rimraf());
        } else {
            return fnImg(event.path).pipe(plugins.livereload(server));
        }
    });

    gulp.watch(config.paths.html, function (event) {
        return fnInject(event.path).pipe(plugins.livereload(server));
    });

});

gulp.task('copy', function(){
    return gulp.src(config.copy_files, { base: 'src' })
        .pipe(gulp.dest(config.build));
});


// Clean up development & production directories
// =============================================

gulp.task('clean', function () {
    return gulp.src([config.build, config.dist], { read: false })
        .pipe(plugins.rimraf());
});



// Main gulp tasks
// ===============

gulp.task('build', ['clean'], function () {
    gulp.start('styles:sass', 'scripts:lint', 'scripts:html2js', 'vendor:js', 'vendor:assets', 'assets:img', 'html:inject', 'copy');
});

gulp.task('makedist', function(){

});

gulp.task('default', ['build'], function () {
        gulp.start('makedist');
});
