var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    concat = require('gulp-concat'),
    typescript = require('gulp-typescript'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json')
    ;
var env,
    jsSrc,
    sassSrc,
    htmlSrc,
    jsonSrc,
    outputDir,
    sassStyle,
    bootstrap,
    tsSrc;
env = process.env.NODE_ENV || 'development';
//env = 'production';

if (env==='development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
    bootstrap = 'bootstrap.js';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
    bootstrap = 'bootstrap.min.js';
}
tsSrc = 'components/ts/';
jsSrc = [
    // 'components/scripts/app.component.js',
    // 'components/scripts/artist.js',
    // 'components/scripts/aartist-details.component.js',
    // 'components/scripts/artist-item.component.js',
    // // 'components/scripts/boot.js',
    // 'components/scripts/search-pipe.js'
];
sassSrc = [
  'components/sass/vendor/bootstrap/bootstrap.scss',
  'components/sass/styles.scss'
];
htmlSrc = [outputDir + '*.html'];
jsonSrc = [outputDir + 'js/*.json'];

//Angular 2 JS Copy
gulp.task('LibAngular', function() {
  return gulp
      .src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js'
      ])
      .pipe(gulp.dest(outputDir + 'js/lib/angular2'))
});
//Bootstrap 4 JS Copy
gulp.task('LibBootstrapJS', function() {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js', //require for bootstrap
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest(outputDir + 'js/lib/'))
});
//Bootstrap 4 SASS Copy
gulp.task('LibBootstrapCSS', function() {
    return gulp
        .src([
            'node_modules/bootstrap/scss/**/*'
        ])
        .pipe(gulp.dest('components/sass/vendor/bootstrap/'))
});
//typescript to javascript
gulp.task('typescript', function () {
  return gulp
      .src(tsSrc + '**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('components/scripts/'))
      .pipe(gulp.dest(outputDir + 'js/'));
});
//combine javascript
gulp.task('js', function() {
  gulp.src(jsSrc)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
});
//sass to css
gulp.task('compass', function() {
  gulp.src(sassSrc)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
});
//html
gulp.task('html', function() {
  gulp.src('builds/development/*.html')
      .pipe(gulpif(env === 'production', minifyHTML()))
      .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
});
//json
gulp.task('json', function() {
  gulp.src('builds/development/js/*.json')
      .pipe(gulpif(env === 'production', jsonminify()))
      .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
});
//webserver for instant reload changes
gulp.task('webserver', function() {
  gulp.src('builds/development/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});
//watch and reload
gulp.task('watch', function() {
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('libcopy', ['LibAngular', 'LibBootstrapJS','LibBootstrapCSS']);
gulp.task('default', ['typescript', 'js','compass' ,'html', 'json', 'webserver', 'watch']);
