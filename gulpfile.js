var pname = "project-name";
var lang = "en";

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var htmlmin = require('gulp-html-minifier');
var useref = require('gulp-useref');
var zip = require('gulp-zip');



// Load Gulp

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'

        }
    });


gulp.task('default', ['images','minify', 'squish-jquery','build-js','build-css', 'serve' ]);



/*
gulp.task('default', ['images','minify', 'squish-jquery','build-js','build-css' ], function () {
    return gulp.src('./assets/lang/master/project-name/!*.html')
        .pipe(useref())
        .pipe(gulp.dest('build'));
});
*/




// Run "gulp server"
gulp.task('server', ['serve', 'watch']);


// HTML minify

gulp.task('minify', function() {
    gulp.src('assets/lang/master/*.html')
        .pipe(htmlmin({collapseWhitespace: true }))
        .pipe(gulp.dest('build/'+ lang + '/' + pname + '/'))
});


// Minify jQuery Plugins: Run manually with: "gulp squish-jquery"
gulp.task('squish-jquery', function () {
    return gulp.src('assets/js/libs/**/*.js')
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('jquery.plugins.min.js'))
        .pipe(gulp.dest('build/_assets/' + pname + '/js' ));
});

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(gulp.dest('build/_assets/' + pname + '/js'));
});

// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function () {
    return gulp.src('assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/_assets/' + pname + '/css')).on('error', gutil.log);
});




// Images
gulp.task('images', function () {

    return gulp.src('assets/images/**/*.{png,jpeg,jpg,svg,gif}')
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest('build/_assets/' + pname + '/images'))
});

// Export
gulp.task('export', function () {
    return gulp.src('build/**/*')
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('./'))
});


// Watch task
gulp.task('watch',['default'], function () {
    gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/less/**/*.less', ['build-css']);
    gulp.watch('assets/lang/master/*.html', ['minify']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888); //'build/' + lang + '/' + pname + '/', 8888
    server.start();
    gulp.watch(['build/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});
