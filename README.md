# RenderMarkdownWithReact-express-browserify-gulp-jade-tutorial
Render markdown with ReactJS using the express framework, browserify for dependency resolution, the gulp build system, and jade templateing.

Setting up your views, routes directories, making your package.json: installing dependencies( node modules, express, gulp, browserify )...

1. set up directory tree
2. Set up **package.json** by running **npm init** at the top level of the app. Keep hitting **enter** until you run out of options. This will result in an empty **package.json** file.
3. Next, we will tell **npm** to download all of the dependencies for this application and save them in a **node_modules** directory. We will install the necessary modules for using **Gulp**, a build system which will:
  - transform our JSX files in to JS and save output in (directory name)
  - copy our index.jade file from d(direct) to (direcotyr name)...
  - then it will watch for changes in all jade and JSX files (without gulp, we could have to do a lot more work every time we make changes to the app)
  We will also install the necessary modules for using **Browserify**, a CommonJS loader which oversees dependency resolution and allows you to require modules on the client side of your app.

    ```
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
    ```
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
    ```
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
    ```
