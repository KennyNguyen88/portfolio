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
htmlSrc = [outputDir + '*.html'];
jsonSrc = [outputDir + 'js/*.json'];
gulp.task('set-env-dev', function() {
    env = 'development';
    outputDir = 'builds/development/';
    sassStyle = 'expanded';

});

gulp.task('set-env-prod', function() {
    env = 'production';
    outputDir = 'builds/production/';
    sassStyle = 'compressed';

});
tsSrc = 'components/ts/';
jsSrc = [
    'components/scripts/site.js',
];
sassSrc = [
  'components/sass/styles.scss'
];

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
      .on('error', gutil.log)
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

gulp.task('libcopy', ['LibBootstrapJS']);
gulp.task('common',['libcopy','typescript', 'js','compass' ,'html', 'json']);
gulp.task('default', ['set-env-dev','common','webserver', 'watch']);
gulp.task('build_for_prod', ['set-env-prod','common']);
