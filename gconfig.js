'use strict';
var GulpConfig = (function () {
<<<<<<< HEAD
    function gulpConfig() {

        // Prequisites
        this.source        =    './src/';
        this.build         =    './dist/';
        this.sourceApp     =    this.source + 'app/';

        // Compile Paths
        this.tsOutputPath   =   this.build  + '/js';
        this.listFilesTS    =   this.source + '/**/*.ts';
        this.listFilesSCSS  =   this.source + '/**/*+(scss|sass|css)';
        this.listFilesHTML  =   this.source + '/**/*.html';
        this.listFilesJS    =   this.source + '/**/*.js';
        this.listFilesFonts =   this.source + 'fonts/**/*';

        // Typings
        this.typings       = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
=======
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
				this.listFilesCompileHTML = this.sourceApp+'**/*.html';
				// Typings
				this.typings				= './typings/';
				this.libraryTypeScriptDefinitions = './typings/**/*.ts';

				// Production Build
				this.tsOutputPath		  =	 this.build	+ 'js';
				this.BuildPath				=	 this.build + 'app/';
				this.cssOutputPath		=	 this.build + 'css/';
				this.fontsOutputPath	=	 this.build + 'fonts/';
		}
		return gulpConfig;
})();
module.exports = GulpConfig;
>>>>>>> DynamoPackages
