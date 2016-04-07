var gulp              = require('gulp');
var gulptypescript    = require('gulp-typescript');
var tscCnfg           = require('./tsconfig.json');
var sass              = require('gulp-sass'); //Sass Compiler
var cache             = require('gulp-cache'); // Maintain Cache
var browserSync       = require('browser-sync').create(); //Reload browser wheneve changes made in file.
var superstatic       = require('superstatic');
var wiredep           = require('wiredep').stream; // bower component injector.
var inject            = require('gulp-inject');
var GulpConfig        = require('./gconfig');

// Create config
var config      = new GulpConfig();

var PATHS = {
		src: 'src/**/*.ts'
};

gulp.task('clean', function (done) {
		var del = require('del');
		del(['dist'], done);
});

/* TypeScript Compiler and js Injector */
gulp.task('ts2js', function () {
		var typescript = gulptypescript;
		var tscConfig = tscCnfg;
		var tsResult = gulp.src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
										.pipe(typescript(tscConfig.compilerOptions));
		return tsResult.js.pipe(gulp.dest('./dist'));
});

/* SCSS/CSS compiler/Injector */
gulp.task('sass', function(){
	return gulp.src(config.listFilesSCSS)
		.pipe(sass())
		.pipe(gulp.dest('./dist/css/'))
		.pipe( browserSync.reload({ stream: true}) );
});

/* Font injector */
gulp.task('fonts', function() {
	return gulp.src(config.listFilesFonts)
		.pipe(gulp.dest('./dist/fonts'));
});

/* HTML file Injector */
gulp.task('views', function() {
		gulp.src([config.listFilesHTML])
				.pipe(gulp.dest('./dist'))
				.pipe( browserSync.reload({ stream: true}) );
});

gulp.task('wiredep', function () {
	var sources = gulp.src(['./dist/css/**/*.css'], {read: false});
	gulp.src('./src/index.html')
		.pipe(wiredep({ devDependencies: true }))
		.pipe(inject(sources), {relative: false, addRootSlash: true, ignorePath: 'dist/'})
		.pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['views', 'sass', 'fonts', 'ts2js', 'wiredep'], function(){
	gulp.watch('src/scss/**/*.+(scss|sass)', ['sass']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('src/**/*.html', browserSync.reload); 
	gulp.watch('src/**/*.ts', browserSync.reload);
	gulp.watch('src/fonts/**/*', ['fonts']);
});

gulp.task('BS', ['watch'], function () {
	process.stdout.write('\nStarting browserSync and superstatic...\n\n');
	browserSync.init({
		server: {
			baseDir       : "./dist",
			online        : false,
			middleware    : superstatic({ 
				debug       : true
			})
		},
		post            : 5555,
		injectChanges   : true,
		notify          : true,
		reloadDelay     : 0,
		logFileChanges  : false,
		logLevel        : 'silent',
		logPrefix       : 'Dynamo package'
	})
})

gulp.task('play', ['BS'], function () {});

gulp.task('default', ['play']);
