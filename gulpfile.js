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
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle,
    bootstrap,
    tsSrc;

env = process.env.NODE_ENV || 'development';

tsSrc = 'components/ts/';

if (env==='development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
    bootstrap = 'bootstrap.js';  
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
    bootstrap = 'bootstrap.min.js';
}
jsSources = [
    // 'components/scripts/app.component.js',
    // 'components/scripts/artist.js',
    // 'components/scripts/aartist-details.component.js',
    // 'components/scripts/artist-item.component.js',
    // // 'components/scripts/boot.js',
    // 'components/scripts/search-pipe.js'
];

sassSources = [
  'components/sass/vendor/bootstrap4/bootstrap.scss',
  'components/sass/styles.scss'
];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];

gulp.task('copyAngular2Libs', function() {
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

gulp.task('copyLib', function() {
    return gulp
        .src([
            'components/scripts/vendor/bootstrap4/'+bootstrap,
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js'
        ])
        .pipe(gulp.dest(outputDir + 'js/lib/'))
});

gulp.task('typescript', function () {
  return gulp
      .src(tsSrc + '**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('components/scripts/'))
      .pipe(gulp.dest(outputDir + 'js/'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
      .pipe(gulpif(env === 'production', minifyHTML()))
      .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
});

gulp.task('json', function() {
  gulp.src('builds/development/js/*.json')
      .pipe(gulpif(env === 'production', jsonminify()))
      .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('watch', function() {
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('builds/development/js/*.json', ['json']);
});
gulp.task('default', ['copyAngular2Libs', 'copyLib', 'typescript',  'js', 'compass' ,'html', 'json', 'webserver', 'watch']);
