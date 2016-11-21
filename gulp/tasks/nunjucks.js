var gulp           = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber        = require('gulp-plumber');
var gulpif         = require('gulp-if');
var changed        = require('gulp-changed');
var prettify       = require('gulp-prettify');
var frontMatter    = require('gulp-front-matter');
var config         = require('../config');

function renderHtml(onlyChanged) {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false
    });

    return gulp
        .src([config.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(nunjucksRender({
            PRODUCTION: config.production,
            path: [config.src.templates]
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('nunjucks', function() {
    return renderHtml();
});

gulp.task('nunjucks:changed', function() {
    return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.html'
    ], ['nunjucks:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.html'
    ], ['nunjucks']);
});






//
// var gulp           = require('gulp');
// var nunjucksRender = require('gulp-nunjucks-render');
// var plumber        = require('gulp-plumber');
// var gulpif         = require('gulp-if');
// var changed        = require('gulp-changed');
// var prettify       = require('gulp-prettify');
// var frontMatter    = require('gulp-front-matter');
// var data           = require('gulp-data');
// var path           = require('path');
// var fs             = require('fs');
// var config         = require('../config');
// function renderHtml(onlyChanged) {
//     return gulp
//         .src([config.src.templates + '/**/[^_]*.html'])
//         .pipe(plumber({
//             errorHandler: config.errorHandler
//         }))
//         .pipe(gulpif(onlyChanged, changed(config.dest.html)))
//         .pipe(frontMatter({ property: 'data' }))
//         .pipe(data(function(file) {
//             var dataFile = file.data['read_data_from_json'];
//             if (!dataFile) return {};
//             return JSON.parse(fs.readFileSync(path.join(path.dirname(file.path), dataFile), 'utf-8'));
//         }))
//         .pipe(nunjucksRender({
//             path: config.src.templates,
//             data: {
//                 PRODUCTION: config.production
//             },
//             envOptions: {
//                 watch: false,
//                 trimBlocks: true,
//                 lstripBlocks: true
//             }
//         }))
//         .pipe(prettify({
//             indent_size: 2,
//             wrap_attributes: 'auto', // 'force'
//             preserve_newlines: true,
//             // unformatted: [],
//             end_with_newline: true
//         }))
//         .pipe(gulp.dest(config.dest.html));
// }
// gulp.task('nunjucks', function() {
//     return renderHtml();
// });
// gulp.task('nunjucks:changed', function() {
//     return renderHtml(true);
// });
// gulp.task('nunjucks:watch', function() {
//     gulp.watch([
//         config.src.templates + '/**/[^_]*.html'
//     ], ['nunjucks:changed']);
//     gulp.watch([
//         config.src.templates + '/**/_*.html'
//     ], ['nunjucks']);
// });
