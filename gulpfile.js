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
		src: 'src/**/*.ts',
		javascript: ['./dist/js/**/*.js'],
		css: ['./dist/css/**/*.css'],
		injectConfig: {relative: false, addRootSlash: true, ignorePath: 'dist/'}
};

gulp.task('clean', function (done) {
		var del = require('del');
		del(['./dist'], done);
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
		.pipe(gulp.dest('./dist/fonts/'));
});

/* HTML file Injector */
gulp.task('views', function() {
		gulp.src([config.listFilesHTML])
				.pipe(gulp.dest('./dist'))
				.pipe( browserSync.reload({ stream: true}) );
});

gulp.task('compilehtml', function() {
		gulp.src([config.listFilesCompileHTML])
				.pipe(gulp.dest('./dist/app'))
				.pipe( browserSync.reload({ stream: true}) );
});

gulp.task('cssinject', function(){
	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(PATHS.css,{read: false}), PATHS.injectConfig))
		.pipe(gulp.dest('./dist'))
		.pipe(wiredep({ devDependencies: true }))
		.pipe(gulp.dest('./dist'))
		;
});

/*gulp.task('wiredep', function () {
	gulp.src('./src/index.html')
		.pipe(wiredep({ devDependencies: true }))
		.pipe(gulp.dest('./dist'))
});
*/
gulp.task('watch', function(){
		console.log('\n\n Start Watching \n\n');
		gulp.watch('src/scss/*.+(scss|sass)', ['sass']);
		gulp.watch('src/**/*.html', ['compilehtml']);
		gulp.watch('src/**/*.ts', ['ts2js']);
		gulp.watch('src/fonts/**/*', ['fonts']);
		browserSync.reload({stream: true});
});

// gulp.watch(['src/scss/*.+(scss|sass)'], function(){
// 	gulp.start('sass');
// });
// gulp.watch(['src/**/*.html'], function(){
// 	gulp.start(['views','cssinject']);
// });
// gulp.watch(['src/**/*.ts'], function(){
// 	gulp.start('ts2js');
// });

gulp.task('BS', ['sass', 'fonts', 'views', 'ts2js', 'cssinject', 'watch'], function () {
	process.stdout.write('\n\n Starting browserSync and superstatic...\n\n');
	browserSync.init({
		server: {
			baseDir       : "./dist",
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

//gulp.task('serve', ['BS'], function () {});

gulp.task('default', ['BS']);
