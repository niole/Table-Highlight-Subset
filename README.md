# RenderMarkdownWithReact-express-browserify-gulp-jade-tutorial
Render markdown with ReactJS using the express framework, browserify for dependency resolution, the gulp build system, and jade templating.

## Gulpfile
Setting up your views, routes directories, making your package.json: installing dependencies( node modules, express, gulp, browserify )...

1. set up directory tree
2. Set up `package.json` by running `npm init` at the top level of the app. Accept all the default options. This will result in an empty `package.json` file.
3. Next, we will tell `npm` to download all of the dependencies for this application and save them in a `node_modules` directory. We will install the necessary modules for using **Gulp**, a build system which will:
  - transform our JSX files in to JS and save output in (directory name)
  - copy our index.jade file from d(direct) to (direcotyr name)...
  - then it will watch for changes in all jade and JSX files (without gulp, we could have to do a lot more work every time we make changes to the app)
  We will also install the necessary modules for using **Browserify**, a CommonJS loader which oversees dependency resolution and allows you to require modules on the client side of your app.

    ```sh
npm install --save-dev gulp;
npm install --save-dev gulp-concat;
npm install --save-dev gulp-uglify;
npm install --save-dev gulp-react;
npm install --save-dev gulp-html-replace;
npm install --save-dev gulp-inject;
npm install --save-dev gulp-streamify;
npm install --save-dev vinyl-source-stream;
npm install --save-dev vinyl-buffer;
npm install --save-dev browserify;
npm install --save-dev watchify;
npm install --save-dev reactify;
    ```
4. Now your package.json should be full of stuff. While you're here, you might as well also tell npm to download and install all the other things that we're going to need to make our app express/react/jade app run. Next run: 

    ```sh
npm install --save body-parser;
npm install --save cookie-parser;
npm install --save debug;
npm install --save dotenv;
npm install --save express;
npm install --save jade;
npm install --save morgan;
npm install --save react;
npm install --save serve-favicon;
    ```
5. At top level of the app, create **gulpfile.js** and save at top of file:

    ```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
    ```
    As a tool, **Gulp** packages up code so that it can be transferred to a separate place from which **Browserify** can interact with it. To acheive this, our `gulpfile.js` must specify the *paths* this code takes, the code, and its destination.
    
6. Next, in the gulpfile we create the *path* object:

    ```javascript
var path = {
  HTML: 'frontend/index.jade',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'views/',
  DEST_BUILD: 'public/js/',
  DEST_SRC: 'public/src/',
  ENTRY_POINT: './frontend/App.jsx'
};
    ```

  
7. Next, we create the tasks that **Gulp** will complete and tell it what paths to use.

    ```javascript
gulp.task('copy', function(){
  gulp.src(path.HTML)
  .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTMLsrc', function(){
  var sources = gulp.src([path.DEST_SRC + '*.js'], {read: false});

   gulp.src(path.HTML)
  .pipe(inject(sources, { ignorePath: 'public' }))
  .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', ['replaceHTMLsrc'], function() {
  gulp.watch(path.HTML, ['copy']);
  //gulp.watch(path.HTML, ['replaceHTMLsrc']);
 var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.DEST_SRC));
});
gulp.task('build', function(){
 browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
  .bundle()
  .pipe(source(path.MINIFIED_OUT))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  var sources = gulp.src([path.DEST_BUILD + '*.js'], {read: false});

  gulp.src(path.HTML)
  .pipe(inject(sources, { ignorePath: 'public' }))
  .pipe(gulp.dest(path.DEST));
});
 
gulp.task('production', ['replaceHTML', 'build']);
 
gulp.task('default', ['watch']);
    ```
    Gulp's default task is to watch, which waits around for 
