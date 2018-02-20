var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    expect = require('gulp-expect-file'),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    imageminPngQuant = require('imagemin-pngquant'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    reporter = require('postcss-reporter'),
    sass = require('gulp-sass'),
    doiuse = require('doiuse'),
    syntax_scss = require('postcss-scss'),
    stylelint = require('stylelint'),
    uglify = require('gulp-uglify');

// -------------------
// Configuration
// -------------------

var config;

if (fs.existsSync("./config/gulp.user.conf.js")) {
    config = require("./config/gulp.user.conf.js")();
}
else {
    config = require("./config/gulp.conf.js")();
}

// -------------------
// Stylelint configuration
// -------------------

var stylelintConfig = require('./stylelint.json');

var processors = [
    stylelint(stylelintConfig),
    reporter({
        clearReportedMessages: false,
        throwError: false
    })
];

// -------------------
// Javascript Pipeline
// Compresses and moves all assets (images/fonts) to dist folder
// -------------------

gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(expect(config.js.src))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));
});


// -------------------
// Stylesheet Pipeline
// Compresses and moves all assets (images/fonts) to dist folder
// -------------------

// Check if all scss files adhere to css coding standards
// Give warnings (not errors!) if files do not comply
gulp.task('scss_lint', function () {
    return gulp.src(config.scss.watch)
        .pipe(postcss(processors, {syntax: syntax_scss}));
});

// Check if all css functionalities adhere to the defined supported browsers.
// Set browser compatibility per project
// Give warnings (not errors!) if files do not comply
gulp.task("doiuse", function () {
    return gulp.src(config.scss.src)
        .pipe(postcss([
            doiuse({
                browsers: [
                    'ie >= 10',
                    '> 1%'
                ],
                ignoreFiles: [
                    "**/_shame.scss",
                    "**/vendors/**/*.scss"
                ],
                onFeatureUsage: function (usageInfo) {
                    console.log(usageInfo.message)
                }
            })
        ], {syntax: syntax_scss}));
});


// Compile all sass files (including vendor) into a single css file after linting is done
// Autoprefixes are added on compile and cleancss minifies and cleans the file
gulp.task('scss', ['doiuse'], function () {
    return gulp.src(config.scss.src)
        .pipe(expect(config.scss.src))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                config.paths.node + 'foundation-sites/scss'
            ]
        }))

        // autoprefix where needed
        .pipe(autoprefixer({
            cascade: false
        }))

        // clean and minify css
        // Note that cleancss optimization level < 2
        // level 2 will break BEM class ordering by merging classes
        .pipe(cleanCss({
            compatibility: 'ie9',
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))

        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(config.scss.dest));
});

// -------------------
// Asset Pipeline
// Compresses and moves all assets (images/fonts) to dist folder
// -------------------

gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(expect(config.images.src))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(expect(config.fonts.src))
        .pipe(gulp.dest(config.fonts.dest));
});

// -------------------
// Main tasks
// Bind these tasks to IDE actions/events or run them manually
// -------------------

gulp.task('assets', ['images', 'fonts']);

gulp.task('default', ['scss', 'js', 'assets']);

gulp.task('watch', function () {
    gulp.watch(config.scss.src, ['scss']);
    gulp.watch(config.js.src, ['js']);
});