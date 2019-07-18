var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json'),
    sass = require('gulp-sass');

// Converts ts files to js files
gulp.task('ts-compile', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('src/scripts/js'));
});

// Converts scss files to css files
sass.compiler = require('node-sass');
gulp.task('sass-compile', function () {
    return gulp.src('src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style/css'));
});

// Runs watcher
gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/style/*.scss', ['sass-compile']);
    gulp.watch('src/script/*.ts', ['ts-compile']);
    gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('default', ['ts-compile', 'sass-compile', 'watch']);