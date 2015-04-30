# RenderMarkdownWithReact-express-browserify-gulp-jade-tutorial
Render markdown with ReactJS using the express framework, browserify for dependency resolution, the gulp build system, and jade templating.

## Gulpfile
Setting up your views, routes directories, making your package.json: installing dependencies( node modules, express, gulp, browserify )...

1. Set up directory tree. It should look like this:

    ```
    -bin
    -frontend
    -public
      -js
      -src
      -stylesheets
    -routes
    -views
    ```
2. Set up `package.json` by running `npm init` at the top level of the app. Accept all the default options. This will result in an empty `package.json` file.
3. Next, we will tell `npm` to download all of the dependencies for this application and save them in a `node_modules` directory. We will install the necessary modules for using **Gulp**, a build system which will:
  - transform our JSX files in to JS and save output in `path.DEST_SRC` or `public/src/`.
  - copy our index.jade file from `path.JADE` or `frontend/index.jade` to `path.DEST` or `views/`.
  - it will watch for changes in all jade and JSX files (without gulp, we could have to do a lot more work every time we make changes to the app)
  We will also install the necessary modules for using **Browserify**, a CommonJS loader which oversees dependency resolution and allows you to require modules on the client side of your app. It bundles all .js files into a single file and updates the body of the index.jade file in `path.DEST` to contain just one rather than many of our self-made modules.

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
4. Now your package.json should be full of stuff. While you're here, you might as well also tell npm to download and install all the other things that we're going to need to make our app express/react/jade app run. We will also throw in mongodb and the mongoskin driver. Next run: 

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
npm install --save mongodb;
npm install --save mongoskin;
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
    As a tool, **Gulp** packages up code so that it can be transferred to a separate place from which **Browserify** can interact with it. To acheive this, our `gulpfile.js` must specify the paths/destination this code takes, the code being modified and how the code will be processed.
    
6. Next, in the gulpfile we create the **path** object:

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
gulp.task('default', ['watch']);

gulp.task('copy', function(){
  gulp.src(path.JADE)
  .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', ['replaceHTMLsrc'], function() {
  gulp.watch(path.JADE, ['copy']);

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
    ```
    Gulp's default task is to watch and wait for changes in the JSX files which `path.ENTRY_POINT` specifies the top level of (This is just a sample of the code you need, copy the actual gulpfile.js code from the github repo). All of the other tasks `'replaceHTMLsrc'` and `'copy'` initiate the copying and modification of files by gulp. Browserify takes care of lumping these files together, following the dependency tree and modifying the JADE file at `path.DEST`. 

##App.js
   
    To complete the top level of the app, let's create the `app.js` file. Then we will create the `bin/www` file and update the `package.json` so that we can serve the app using `npm start`. This file hooks up many of the routes that express needs to run. We will tell express where the app's views will be, where the routes required for serving the app online and for talking to the mongodb database will be, what port mongodb will be on et c ..

   ```javascript
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
  
// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017", {native_parser:true});

var routes = require('./routes/index');
var "..." = require('./routes/"..."');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
   ```
  The above is not the entire app.js file. Copy it from the git repo.

9. Next: `bin/www` and the corresponding `package.json` changes. Create a file called `www` in the `bin` directory and put this code in there:

    ```javascript
    #!/usr/bin/env node
    var debug = require('debug')('my-application');
    var app = require('../app');
 
    app.set('port', process.env.PORT || 3000);
 
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
    ```
    
    On `npm start` this app will be served from `localhost:3000`. This means that express will be actively listening on port 3000 for network communication. Then modify the scripts part of the `package.json`:
    
    ```javascript
    scripts: {
        start: node ./bin/www
    },
    ```
    
10. Let us next hook up the most basic of routes for rendering the app's home page. In `routes/index.js`, add:

    ```javascript
 "use strict";
 var express = require('express');
 var router = express.Router();
 
 /* GET home page. */
 router.get('/', function(req, res) {
   res.render('index', { title: 'Markdown' });
 });
 
 module.exports = router;
     ```

##Views

11. Next we do a really simple view. First have to set up our jade files. Because of how Gulp copies the index.jade file from `path.JADE`, aka `frontend/index.jade` to `path.DEST` aka `views/`, the placement of the .jade files will be a little different from if we weren't using gulp and browserify.
    Jade templating requires `error.jade`, `index.jade`, and `layout.jade` files. Express expects to find these files all in one place and we have told it to look for them in the `views` directory. As gulp processes and moves the `index.jade` file from `frontend/` to `views/`, the `index.jade` file that we make will be in `frontend/` and we will make all of the other jade files in `views/`.
    In `views/` create a `layout.jade` file that looks like this:

    ```javascript

doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        script(src='http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js')
        script(src="http://fb.me/react-0.12.2.js")
        script(src="http://fb.me/JSXTransformer-0.12.2.js")
        script(src="http://code.jquery.com/jquery-1.10.0.min.js")
        script(src="http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js")

        //Compiled and minified CSS
        link(rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/css/materialize.min.css")

        //Compiled and minified JavaScript
        script(src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/js/materialize.min.js")
    body
      block content
    ```
    These cdns reference online client libraries that we will be using in this app. Materialize-css will make everything beautiful and showdown converts markdown to html so that it can be rendered in the DOM. Be careful when using jade and make sure everything is properly indented otherwise you'll get errors.
    
    Next, we will make an `index.jade` file in `frontend/`. Throw in a `<h1>Rendered</h1>` to make sure things are hooking up properly.
    
    ```javascript
    extends layout
  
    block content
        h1(Rendered Jade)
        div(id="container")
        //- inject:js
        |<script type="text/jsx" src="js/App.jsx"/>
        |<script> type="text/jsx" src="js/Test.jsx"/>
        //- endinject
    ```
    
    This is the body part of the jade template, which is where everything gets rendered. The code modules that we create will go between the commented out code. These commented out pieces aid **browserify** in finding the modules we made, bundling them into one giant js file, and then finally putting them back into the right place so they can be rendered.
    Last, make the `error.jade` file:
    
    ```javascript
extends layout
      
block content
    h1= message
    h2= error.status
    pre #{error.stack}
    ```
    
12. Make `rendermarkdown.js` file:

    ```javascript
  "use strict";
  var express = require('express');
  var router = express.Router();
    ```
    If we have a database at some point, we can add routes to this file, but for now it remains empty.

13. Lastly, we will create a few JSX files with React code to make sure that everything's hooked up properly. We're using Gulp in conjunction with Browserify because Gulp translates JSX into JS and Browserify only deals with JS. React uses JSX syntax to create reusable component classes, which we will learn more about. For the moment we're going to create the `App.jsx` file that we referred to in the gulpfile with `path.ENTRY_POINT` and a `Test.jsx` file to quickly show how the module creation that Browserify and Gulp enable occurs and is used.
    In `frontend/` create `App.jsx` and add the following:

    ```javascript
"use strict";
/*global React*/
  
var React = require('react');
var Test = require('./Test.jsx');
  
var App = React.render( <Test/>, $('#container')[0]);
  
module.exports = App;
    ```
    First, we're requiring the react module so we can code with react and then we're loading a separate module, 'Test', so that we can use the code written in test. In `var App = React.render( <Test/>, $('#container')[0]);`, the jquery selector, `$('#container')` attaches the Test module to a `div(id='container')` in the `frontend/index.jade` file from which it will be rendered. Exporting the contents of the module as `App` with `module.exports = App;` allows you to use the module elsewhere, be it in other modules or in the `index.jade` file e.g: `|<script type="text/jsx" src="js/App.jsx"/>`.
    `Test.jsx`:
    
    ```javascript
"use strict";
/*global React*/
 
var React = require('react');
 
var Test = React.createClass({
    render: function(){
        return (
            <h1>hola</h1>
        );
    }
 });
 
 module.exports = Test;
    ```
    
