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

var del 							= require('del');
// Create config
var config      = new GulpConfig();

gulp.task('clean', function (done) { del([config.build, './dist'], done);});

/* TypeScript Compiler and js Injector */
gulp.task('ts2js', function () {
		var typescript = gulptypescript;
		var tscConfig = tscCnfg;
		var tsResult = gulp.src([config.listFilesTS, 'node_modules/angular2/typings/browser.d.ts'])
						.pipe(typescript(tscConfig.compilerOptions));
		return tsResult.js.pipe(gulp.dest(config.build));
});

/* SCSS/CSS compiler/Injector */
gulp.task('sass', function(){
	return gulp.src(config.listFilesSCSS)
		.pipe(sass())
		.pipe(gulp.dest(config.cssOutputPath))
		.pipe( browserSync.reload({ stream: true}) );
});

/* Font injector */
gulp.task('fonts', function() {
	return gulp.src(config.listFilesFonts)
		.pipe(gulp.dest(config.fontsOutputPath));
});

/* HTML file Injector */
gulp.task('views', ['sass', 'fonts'], function() {
		gulp.src([config.listFilesHTML])
				.pipe(gulp.dest(config.build))
				.pipe( browserSync.reload({ stream: true}) );
});

gulp.task('compilehtml', function() {
		gulp.src([config.listFilesCompileHTML])
				.pipe(gulp.dest(config.BuildPath))
				.pipe( browserSync.reload({ stream: true}) );
});

gulp.task('cssinject', ['views'], function(){
	var sources = gulp.src(['build/css/**/*.css'], {read: false});
	return gulp.src('./src/index.html')
		.pipe(inject(sources, {relative: false, addRootSlash: true, ignorePath: 'build/'}))
		.pipe(gulp.dest(config.build))
		.pipe(wiredep({ devDependencies: true }))
		.pipe(gulp.dest(config.build))
		;
});

gulp.task('watch', function(){
		console.log('\n\n Start Watching \n\n');
		gulp.watch('src/**/*+(scss|sass)', ['sass']);
		gulp.watch('src/**/*.html', ['compilehtml']);
		gulp.watch('src/**/*.ts', ['ts2js']);
		gulp.watch('src/fonts/**/*', ['fonts']);
		browserSync.reload({stream: true});
});

gulp.task('BS', ['ts2js', 'cssinject'], function () {
	process.stdout.write('\n\n Starting browserSync and superstatic...\n\n');
	browserSync.init({
		server: {
			baseDir       : "./build",
			online        : false,
			middleware    : superstatic({
				debug       : true
			})
		},
		port            : 5555,
		injectChanges   : true,
		notify          : true,
		reloadDelay     : 0
	})
})

gulp.task('default', ['BS', 'watch']);
