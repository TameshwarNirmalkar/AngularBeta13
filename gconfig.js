'use strict';
var GulpConfig = (function () {
		function gulpConfig() {

				// Prequisites
				this.source				 =		'./src/';
				this.build				 =		'./build/';
				this.sourceApp		 =		this.source + 'app/';

				// Dev Build
				this.listFilesTS		=	 this.source + '**/*.ts';
				this.listFilesSCSS	=	 this.source + '**/*+(scss|sass|css)';
				this.listFilesHTML	=	 this.source + '**/*.html';
				this.listFilesJS		=	 this.source + '**/*.js';
				this.listFilesFonts =	 this.source + 'fonts/*+(eot)';
				this.injectConfig	  =	 {relative: false, addRootSlash: true, ignorePath: 'build/'};
				// Typings
				this.typings				= './tools/typings/';
				this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';

				// Production Build
				this.tsOutputPath		  =	 this.build	+ 'js';
				this.BuildPath				=	 this.build + 'app/';
				this.cssOutputPath		=	 this.build + 'css/';
				this.fontsOutputPath	=	 this.build + 'fonts/';
		}
		return gulpConfig;
})();
module.exports = GulpConfig;
