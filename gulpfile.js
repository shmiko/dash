
var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var strip = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('buildMenuTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/cmMenu/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/cmMenu/',
            module: 'cmMenu'
        }))
        .pipe(gulp.dest('./ext-modules/cmMenu/'))
    ;
});

gulp.task('buildDashboardTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/cmDashboard/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/cmDashboard/',
            module: 'cmDashboard'
        }))
        .pipe(gulp.dest('./ext-modules/cmDashboard/'))
    ;
});

gulp.task('buildFrameworkTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/cmFramework/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/cmFramework/',
            module: 'cmFramework'
        }))
        .pipe(gulp.dest('./ext-modules/cmFramework/'))
    ;
});

gulp.task('buildJavaScript', function () {
    return gulp
        .src([
            './ext-modules/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(strip(["use strict"]))
        .pipe(concat('cmFramework.js'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('buildCSS', function () {
    return gulp
        .src([
            './ext-modules/**/*.css'
        ])
        .pipe(concat('cmFramework.css'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('default', function(){
   nodemon({
      script: 'app.js',
      ext: 'js',
      env: {
          PORT: 8888
      },
       ignore: ['./node_modules/**']
   })
   .on('restart', function(){
       console.log('Restarting');
   });
});

gulp.task('test', function(){
    env({vars: {ENV:'Test'}});
    gulp.src('Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))

});