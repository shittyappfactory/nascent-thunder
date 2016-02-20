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
import url from 'url';
import path from 'path';
import fs from 'fs';

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
        });

    task.pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));

    return task;
};

gulp.task('bundle', bundle);

gulp.task('assets', () => {
    gulp.src('assets/**').pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['bundle'])
    gulp.watch('assets/**', ['assets']);
    gulp.watch('index.html', ['index']);
    // gulp.watch('dist/**/*', bs.reload);
});

gulp.task('index', () => {
  gulp.src('index.html').pipe(gulp.dest('dist/'));
});

const folder = path.resolve(__dirname, 'dist/');

gulp.task('serve', () => {
    bs.init({
        port: 3000,
        server: {
            baseDir: './dist',
            middleware: function(req, res, next) {
              var fileName = url.parse(req.url);
              fileName = fileName.href.split(fileName.search).join("");
              var fileExists = fs.existsSync(folder + fileName);
              if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                req.url = '/index.html';
              }
              return next();
            },
        },
    });
});

gulp.task('compile', ['assets', 'bundle', 'index']);

gulp.task('default', (cb) => {
    runSequence('watch', 'index', 'bundle', 'serve', cb)
});
