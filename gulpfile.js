const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglifyjs"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  pngQuant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", () => {
  return gulp
    .src(["app/sass/**/*.scss"])
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 15 versions", "> 1%", "ie 8", "ie 7"],
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});

gulp.task("css-libs", ["sass"], () => {
  return gulp
    .src([
      "app/libs/**/docs/**/*.+(slim||min).css"
      // 'app/libs/magnific-popup/docs/jquery.magnific-popup.min.js',
    ])
    .pipe(cssnano())
    .pipe(
      rename({
        dirname: "",
        basename: "libs",
        suffix: ".min",
        extname: ".css"
      })
    )
    .pipe(concat("libs.min.css"))
    .pipe(gulp.dest("app/css"));
});

gulp.task("scripts", () => {
  return gulp
    .src([
      "app/libs/**/docs/**/*.+(slim||min).js"
      // 'app/libs/magnific-popup/docs/jquery.magnific-popup.min.js',
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

gulp.task("clean", () => {
  return del.sync("docs");
});
gulp.task("clear", () => {
  return cache.clearAll();
});

gulp.task("img", () => {
  return gulp
    .src(["app/img/**/*"])
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [
            {
              removeViewBox: false
            }
          ],
          use: [pngQuant()]
        })
      )
    )
    .pipe(gulp.dest("docs/img"));
});

gulp.task("watch", ["browser-sync", "scripts", "css-libs"], () => {
  gulp.watch("app/sass/**/*.scss", ["sass"]);
  gulp.watch("app/libs/**/*", ["scripts"]);
  gulp.watch(["app/**/*.html"], browserSync.reload);
  gulp.watch(["app/**/*.js", "!app/libs/**/*"], browserSync.reload);
});

gulp.task("build", ["clean", "scripts", "img", "css-libs"], () => {
  gulp
    .src("app/css/**/*.css")
    .pipe(cssnano())
    .pipe(gulp.dest("docs/css"));

  gulp.src("app/fonts/**/*").pipe(gulp.dest("docs/fonts"));

  gulp.src("app/js/**/*.js").pipe(gulp.dest("docs/js"));

  gulp.src("app/*.html").pipe(gulp.dest("docs/"));
});

// gulp.task('mytask', () => {
//     return gulp.src('source-files')
//         .pipe(plugin())
//         .pipe(gulp.dest('folder'))
// }
