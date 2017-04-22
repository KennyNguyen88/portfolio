var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps')

var env,
    outputDir,
    htmlSrc,
    sassSrc,
    jsSrc,
    jsonSrc,
    fontSrc,
    sassStyle,
    bootstrap;


env = process.env.NODE_ENV || 'development';
outputDir = 'builds/development/';
htmlSrc = [outputDir + '*.html'];
sassSrc = 'components/sass/styles.scss';
jsSrc = 'components/scripts/';
jsonSrc = [outputDir + 'js/*.json'];
fontSrc = [
    'node_modules/font-awesome/fonts/*'
];
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
//html
gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
});
//scss to css
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
//Lib
//Jquery
gulp.task('LibJquery', function() {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
        ])
        .pipe(gulp.dest(outputDir + 'js/lib/'))
});
//Bootstrap
gulp.task('LibBootstrapJS', function() {
    return gulp
        .src([
            'node_modules/tether/dist/js/tether.min.js', //require for bootstrap
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest(outputDir + 'js/lib/'))
});
//Font Awesome
gulp.task('LibFontAwesomeCSS', function() {
    return gulp
        .src([
            'node_modules/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(gulp.dest(outputDir + 'css/'))
});
//combine javascript
gulp.task('js', function() {
    gulp.src(jsSrc + '**/*.js')
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
});
//json
gulp.task('json', function() {
    gulp.src('builds/development/js/*.json')
        .pipe(gulpif(env === 'production', jsonminify()))
        .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
        .on('error', gutil.log)
});
//font
gulp.task('font', function() {
    gulp.src(fontSrc)
        .pipe(gulp.dest(outputDir + 'fonts'))
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
    gulp.watch(jsSrc + '**/*.js', ['js']);
    gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('libcopy', ['LibJquery','LibBootstrapJS','LibFontAwesomeCSS']);
gulp.task('necessary',['libcopy','html','compass','js','json','font']);
gulp.task('default', ['set-env-dev','necessary','webserver', 'watch']);
gulp.task('build_for_prod', ['set-env-prod','necessary']);
