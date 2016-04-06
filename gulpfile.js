var gulp              = require('gulp');
var gulptypescript    = require('gulp-typescript');
var tscCnfg           = require('./tsconfig.json');
var sass              = require('gulp-sass'); //Sass Compiler
var cache             = require('gulp-cache'); // Maintain Cache
var browserSync       = require('browser-sync'); //Reload browser wheneve changes made in file.
var superstatic       = require('superstatic');
var wiredep           = require('wiredep').stream; // bower component injector.
var inject            = require('gulp-inject');

/* Server configuration start*/
var http = require('http');
var connect = require('connect');
var open = require('open');
var port = 9000, app;
/* Server configuration end*/

var PATHS = {
    src: 'src/**/*.ts'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = gulptypescript;
    var tscConfig = tscCnfg;
    var tsResult = gulp.src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
                    .pipe(typescript(tscConfig.compilerOptions));
    return tsResult.js.pipe(gulp.dest('dist'));
});

/* SCSS compiler */
gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe( browserSync.reload({ stream: true}) )
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'))
});


/* Bower Synch */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass', 'ts2js', 'fonts','wiredep'], function(){
  gulp.watch('src/scss/**/*.+(scss|sass)', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('src/**/*.html', browserSync.reload); 
  gulp.watch('src/*.js', browserSync.reload);
  gulp.watch('src/fonts/**/*', ['fonts']); 
});


gulp.task('wiredep', function () {
  var sources = gulp.src(['src/**/*.js', 'src/**/*.css'], {read: false});
  gulp.src('./src/index.html')
    .pipe(wiredep({ devDependencies: true }))
    .pipe(inject(sources), {relative: false, addRootSlash: true, ignorePath: 'dist/'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('play', ['ts2js', 'sass', 'wiredep', 'fonts'], function () {
    process.stdout.write('\n\nStarting browserSync and superstatic...\n\n');
    browserSync({
      port      : 5555,
      files       : ['./app/**/*.html', './app/**/*+(scss|sass)', './app/**/*.js'],
      injectChanges   : true,
      logFileChanges  : false,
      logLevel    : 'silent',
      logPrefix     : 'Dynamo package',
      notify      : true,
      reloadDelay   : 0,
      server      : {
        online: false,
        baseDir: './dist',
        middleware: superstatic({ 
          debug: true
        })
      }
    });

});

gulp.task('default', ['play']);
