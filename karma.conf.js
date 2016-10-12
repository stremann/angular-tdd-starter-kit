module.exports = function (config) {
    config.set({
        // base path used to resolve all patterns
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files/patterns to load in the browser
        files: [{pattern: 'bundle.spec.js', watched: false}],

        // files to exclude
        exclude: [],

        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
            require('karma-coverage'),
            require('karma-spec-reporter')
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'bundle.spec.js': ['webpack', 'sourcemap']
        },

        webpack: {
            babel: {
                presets: ['es2015']
            },
            isparta: {
                embedSource: true,
                noAutoWrap: true,
                babel: {
                    presets: ['es2015']
                }
            },
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {test: /(\.spec\.js)/, exclude: /(node_modules)/, loader: 'babel', query: { cacheDirectory: true }},
                    {test: /\.js/, include: [/client/], exclude: /(node_modules|\.spec\.js\.js)/, loader: 'isparta'}
                ],
                loaders: [
                    {test: /\.html$/, loader: 'raw'},
                    {test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass']},
                    {test: /\.css$/, loader: 'style!css'},
                    {test: /\.woff2$/, loader: 'url'}
                ]
            }
        },

        webpackServer: {
            noInfo: true // prevent console spamming when running in Karma!
        },

        reporters: ['progress', 'coverage'],

        // path for coverage
        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'coverage', subdir: '.'},
                {type: 'text-summary', dir: 'coverage', subdir: '.'},
                {type: 'lcovonly', dir: 'coverage', subdir: '.'}
            ]
        },

        // web server port
        port: 9876,

        // enable colors in the output
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // toggle whether to watch files and return tests upon incurring changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // if true, Karma runs tests once and exits
        singleRun: true
    });
};
