import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";

const sass = gulpSass(dartSass);

const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  imagePath: "src/images/**/*"
};

const sassTask = () => {
  return gulp
    .src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
};

const jsTask = () => {
  return gulp
    .src(files.jsPath)
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
};

const imageTask = () => {
  return gulp
    .src(files.imagePath)
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
};

const watchTask = () => {
  gulp.watch([files.scssPath, files.jsPath, files.imagePath], gulp.parallel(sassTask, jsTask, imageTask));
};

export const watch = watchTask; // Export the watch task

export default gulp.series(gulp.parallel(sassTask, jsTask, imageTask), watchTask);
