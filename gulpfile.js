'use strict';

var gulp = require('gulp');
var config = require('./gulp-config');
var build = require('node-sap-build');

var helper = {
    plugins: {},
    getPlugin: function (name) {
        var plugin = this.plugins[name];
        if (!plugin) {
            plugin = require(name);
            this.plugins[name] = plugin;
        }
        return plugin;
    }
};

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['clean', 'eslint'], function () {
});

gulp.task('clean', function (done) {
    var del = helper.getPlugin('del');
    del(['.sonar', 'coverage', 'tmp'], function (err) {
        done(err);
    });
});


gulp.task('eslint', function () {
    var eslint = helper.getPlugin('gulp-eslint');
    return gulp.src(['index.js', 'gulpfile.js', 'make', 'common-filters/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dist', [ 'build' ], function () {
});

gulp.task('publish', [ 'dist' ], function (done) {
    var packages = config.publish || ['.'];
    build.npm.publishProjects(packages, done);
});

gulp.task('npm-publish', [ 'dist', 'publish' ], function () {
});
