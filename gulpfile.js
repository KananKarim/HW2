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
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);
const server = browserSync.create();

const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  imagePath: "src/images/**/*"
};

const sassDevTask = () => {
  return gulp
    .src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    .pipe(server.stream());
};

const sassBuildTask = () => {
  return gulp
    .src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("dist"));
};

const jsTask = () => {
  return gulp
    .src(files.jsPath)
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(server.stream());
};

const imageTask = () => {
  return gulp
    .src(files.imagePath)
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
    .pipe(server.stream());
};

const devTask = gulp.parallel(sassDevTask, jsTask, imageTask);
const buildTask = gulp.parallel(sassBuildTask, jsTask, imageTask);

const watchTask = () => {
  gulp.watch([files.scssPath, files.jsPath, files.imagePath], devTask);
  gulp.watch("dist/*.html").on("change", server.reload);
};

const serveTask = () => {
  server.init({
    server: {
      baseDir: "./"
    }
  });
};

export const dev = gulp.series(devTask, gulp.parallel(watchTask, serveTask));
export const build = buildTask;

export default dev;
