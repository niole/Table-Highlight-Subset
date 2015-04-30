# RenderMarkdownWithReact-express-browserify-gulp-jade-tutorial
Render markdown with ReactJS using the express framework, browserify for dependency resolution, the gulp build system, and jade templateing.

Setting up your views, routes directories, making your package.json: installing dependencies( node modules, express, gulp, browserify )...

1. set up directory tree
2. Set up **package.json** by running **npm init** at the top level of the app. Keep hitting **enter** until you run out of options. This will result in an empty **package.json** file.
3. Next, we will tell **npm** to download all of the dependencies for this application and save them in a **node_modules** directory. First we will install the necessary modules for using Gulp, the build system which will:
* transform our JSX files in to JS and save output in (...)
* copy our index.jade file from ... to ...
* then it will watch for changes in all jade and JSX files (without gulp, we could have to do a lot more work every time we make changes to the app)


npm install --save-dev gulp;
npm install --save-dev gulp-concat;
npm install --save-dev gulp-uglify;
npm install --save-dev gulp-react;
npm install --save-dev gulp-html-replace;
