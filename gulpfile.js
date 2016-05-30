/* =========================================================================
 * Dependencies
 * ========================================================================= */
var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var uglify        = require('gulp-uglify');
var replace       = require('gulp-replace');
var watch         = require('gulp-watch');
var concat        = require('gulp-concat');
var clean         = require('gulp-clean');
var karma         = require('karma').server;
var sh            = require('shelljs');
const git         = require('gulp-git');
const bump        = require('gulp-bump');
const filter      = require('gulp-filter');
const tag_version = require('gulp-tag-version');

/* =========================================================================
 * Constants
 * ========================================================================= */
var SRCDIR           = 'src';
var BUILDDIR         = 'release';
//js
var UGLIFYOPTIONS    = {
    //http://davidwalsh.name/compress-uglify
    mangle: true,
    compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
    }
};
var UNMINIFIEDSCRIPT = 'govivant.js';
var MINIFIEDSCRIPT   = 'govivant.min.js';

/* =========================================================================
 * Tasks
 * ========================================================================= */
gulp.task('default', ['release']);
// gulp.task('default', ['release', 'jshint', 'test']);

/**
 * Clean the build directory
 */
gulp.task('clean', function (next) {
    sh.rm('-rf', BUILDDIR);
    next();
});

gulp.task('copy-bower', function (next) {
    sh.cp('bower.json', BUILDDIR + '/');
    next();
});

gulp.task('prepare-release-dir', ['clean'], function (next) {
    sh.mkdir(BUILDDIR);
    next();
});

/**
 * Minify javascript files
 */
gulp.task('js', [
    'js-dev',
    'js-prod'
]);
gulp.task('js-dev', function () {
    return gulp.src([SRCDIR + '/**/**/*.js'])
               .pipe(concat(UNMINIFIEDSCRIPT))
               .pipe(gulp.dest(BUILDDIR));
});
gulp.task('js-prod', function () {
    return gulp.src([SRCDIR + '/**/**/*.js'])
               .pipe(concat(MINIFIEDSCRIPT))
               .pipe(uglify(UGLIFYOPTIONS))
               .pipe(gulp.dest(BUILDDIR));
});

/**
 * Release - creates the release directory with all the necessary files for our Bower package
 **/
gulp.task('release', [
    'prepare-release-dir',
    'js',
    'copy-bower'
]);
// gulp.task('release', ['jshint', 'prepare-release-dir', 'js', 'copy-bower']);

/**
 * Js Hint
 */
gulp.task('jshint', function () {
    return gulp.src(['src/**/*.js'])
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(jshint.reporter('fail'));
});

/**
 * Watch
 */
gulp.task('watch', function () {
    watch(SRCDIR + '/**/**/*.*', {
        emit: 'one',
        emitOnGlob: false
    }, function () {
        sh.exec('gulp release');
    });
});

/**
 * Run unit tests - this task is run by Wercker when building our app
 */
gulp.task('test', ['jshint']);

/* =========================================================================
 * Helper Functions
 * ========================================================================= */

// Defined method of updating:
// Set a specific version
gulp.task('bump', function () {
    gulp.src('./*.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});


function inc(importance) {
    // get all the files to bump version in
    return gulp
        .src([
            './package.json',
            './bower.json'
        ])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        // commit the changed version number
        // commit the changed version number
        .pipe(gulp.dest('./'))
        .pipe(git.add())
        .pipe(git.commit('bumps package version'))
        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tag_version())
        // .pipe(git.push('origin', 'master', {args: '-f'}))
        ;
}

gulp.task('add', function () {
    git.add();
});

gulp.task('tag', function () {
    return inc('patch');
})
gulp.task('feature', function () {
    return inc('minor');
})
gulp.task('major', function () {
    return inc('major');
})