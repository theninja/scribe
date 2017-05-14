var resolve = require('rollup-plugin-node-resolve');
var commonjs  = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var minify = require('uglify-js-harmony').minify;


module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-rollup');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'babel-core/register'
        },
        src: ['test/**/*.spec.js']
      }
    },
  });

  function rollupConfiguration(optimize, outputFilename, format) {
    return {
      options: {
        format: format,
        sourceMap: true,
        moduleName: 'scribe',
        plugins: [
          resolve({
            jsnext: true,
            next: true
          }),
          commonjs(),
          (optimize && uglify({}, minify))
        ]
      },
      main: {
        dest: 'build/' + outputFilename,
        src: 'src/scribe.js'
      }
    }
  }

  grunt.registerTask('build:iife', function() {
    grunt.config('rollup', rollupConfiguration(true, 'scribe.umd.min.js', 'iife'));
    grunt.task.run('rollup');

    grunt.config('rollup', rollupConfiguration(false, 'scribe.umd.js', 'iife'));
    grunt.task.run('rollup');
  });

  grunt.registerTask('build:umd', function() {
    grunt.config('rollup', rollupConfiguration(true, 'scribe.min.js', 'umd'));
    grunt.task.run('rollup');

    grunt.config('rollup', rollupConfiguration(false, 'scribe.js', 'umd'));
    grunt.task.run('rollup');
  });

  grunt.registerTask('build', ['build:iife', 'build:umd']);


  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('default', 'test');

};
