

'use strict';

var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var os = require('os');
// var takeScreenshot = require('electron-screencapture');
var screenshot = require('electron-screenshot')
var release_windows = require('./buil.windows');


var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

function cb(data){
    console.log('loolollo');
    console.log(data);
}

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});

gulp.task('copy', ['clean'], function () {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: [
            './node_modules/**/*',
            '*.html',
            '*.css',
            'main.js',
            'package.json'
        ]
    });
});

gulp.task('build', ['copy'], function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest('build/'));
});


gulp.task('run', function () {
	childProcess.spawn(electron, ['./app'], {stdio: 'inherit'});
	setTimeout(function(){
	    screenshot({filename: 'olol.png', delay: 1000}, [cb])
	}, 1000);

});

gulp.task('build-electron', function () {
    switch (os.platform()) {
        case 'darwin':
            // execute build.osx.js
            break;
        case 'linux':
            //execute build.linux.js
            break;
        case 'win32':
        console.log('sdf')
            return release_windows.build();
    }
});
