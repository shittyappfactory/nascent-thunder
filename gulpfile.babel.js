import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import babelify from 'babelify';
import reactify from 'reactify';
import sassify from 'sassify';
import sass from 'gulp-sass';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';

const bs = browserSync.create();

const bundle = () => {
    const task = browserify({
            entries: ['./src/index.js'],
            debug: true,
        })
        .transform(babelify)
        .transform(reactify)
        .transform(sassify, {
          'auto-inject': true,
          base64Encode: false,
          sourceMap: true,
        })
        .bundle()
        .on('error', function (err) {
            gutil.log('Browserify error\n' + err.toString() + '\n' + err.codeFrame);
            return;
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));

    return task;
};

gulp.task('bundle', bundle);

gulp.task('assets', () => {
    gulp.src('assets/**').pipe(gulp.dest('dist/assets'));
});

gulp.task('sass', () => {
    gulp.src('src/sass/style.s*ss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['bundle'])
    gulp.watch('assets/**', ['assets']);
    gulp.watch('src/*.s*ss', ['sass']);
    gulp.watch('dist/**/*', bs.reload);
});

gulp.task('serve', () => {
    bs.init({
        port: 3000,
        server: {
            baseDir: './'
        },
    });
});

gulp.task('lint', () => {
    gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', (cb) => {
    runSequence('watch', 'sass', 'bundle', 'serve', cb)
});
