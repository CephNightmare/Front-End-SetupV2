module.exports = function ()
{
    var paths = {
        node: 'node_modules/',
        dist: 'dist/',
        src: 'src/'
    };

    var config = {
        paths: paths,
        js: {
            src: [
                paths.node + 'jquery/dist/jquery.js',
                paths.node + 'foundation-sites/dist/js/plugins/foundation.core.js',
                paths.src + 'js/app.js'
            ],
            dest: paths.dist + 'js/'
        },
        scss: {
            src: [
                paths.src + 'scss/main.scss'
            ],
            dest: paths.dist + 'css/'
        },
        images: {
            src: paths.src + 'img/**/*',
            dest: paths.dist + 'img/'
        },
        fonts: {
            src: [
                paths.src + 'fonts/**/*'
            ],
            dest: paths.dist + 'fonts/'
        }
    }

    return config;
}