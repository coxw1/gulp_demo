var gulp = require('gulp');
// var autoprefixer = require('gulp-autoprefixer');
// var cssmin = require('gulp-cssmin');
// var uglify = require('gulp-uglify');
// var jshint = require('gulp-jshint');
// var stylish = require('jshint-stylish');
// var concat = require('gulp-concat');
// var concatCss = require('gulp-concat-css');
// var browserSync = require('browser-sync').create();
// var minifyHTML = require('gulp-minify-html');
// var replace = require('gulp-replace');
// var del = require('del');

var timestamp = Date.now();

gulp.task('build', ['removeOldJsAndCssFiles','compileCss', 'compileServiceWorker', 'compileJs', 'compileSpecific', 'images', 'compileTemplates']);

gulp.task('default', ['build']);

gulp.task('compileServiceWorker', function() {
    return gulp.src(['src/js/serviceWorker.js'])
    .pipe(uglify())
    .pipe(concat('serviceWorker-'+timestamp+'.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('compileJs', function() {
    return gulp.src([   'core/APIs/jquery.js', 
                        'core/APIs/foundation.min.js',
                        'core/APIs/jqueryMobile/jquery.mobile.custom.min.js',
                        'src/js/core.js',
                        'src/js/header_generic.js', 
                        'src/js/sha256.js', 
                        'src/js/hero.js', 
                        'src/js/location.js', 
                        'src/js/notifications.js', 
                        'src/js/settings.js', 
                        'src/js/shop.js', 
                        'src/js/landing_page.js', 
                        'src/js/analytics.js',
                        'core/APIs/jquery-lazyload/jquery.lazyload.js',
                    ])
    .pipe(uglify())
    .pipe(addTimeStampToJsFile('build'))    
    .pipe(addTimeStampToJsFile('serviceWorker'))
    .pipe(concat('build-'+timestamp+'.js'))
    .pipe(gulp.dest('public/js/'));
});



