var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'tests/**/*.spec.js'
    ],

    preprocessors: {
      'tests/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },


    // web server port
    port: 9876,


    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],


    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.TRAVIS,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
