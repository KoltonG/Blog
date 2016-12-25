'use strict';
// TODO run everything in Grunt
module.exports = function(grunt) {
  /******************************/
  /********** NPM TASK **********/
  /******************************/
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');


  /************************************/
  /********** CONFIGURATIONS **********/
  /************************************/
  grunt.initConfig({
    execute: { // Grunt task that executes js files
      'minify-js': {
        src: ['build/js.js']
      },
      'minify-scss': {
        src: ['build/scss.js']
      },
      'compile-index': {
        src: ['build/index-pug.js']
      },
      'compile-partials': {
        src: ['build/partial-pug.js']
      }
    },
    watch: { // Grunt Watcher that executes tasks when certail file types change
      js: {
        files: ['app/client/javascripts/**/*.js'],
        tasks: ['execute:minify-js'],
        options: {
          spawns: false
        }
      },
      scss: {
        files: ['app/client/stylesheets/**/*.scss'],
        tasks: ['execute:minify-scss'],
        options: {
          spawns: false
        }
      },
      'index-pug': {
        files: ['app/client/views/index.pug'],
        tasks: ['execute:compile-index'],
        options: {
          spawns: false
        }
      },
      'partials-pug': {
        files: ['app/client/views/partials/*.pug'],
        tasks: ['execute:compile-partials'],
        options: {
          spawns: false
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            PORT: 9000
          },
          cwd: __dirname,
          watch: ['app/server/**/*.js', 'app.js'],
          callback: function (nodemon) {
            // Not sure what this does
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // Fixes the Bunyan outputs
            var bunyan;
            nodemon.on('readable', function () {
              bunyan = grunt.util.spawn({
                cmd: './node_modules/bunyan/bin/bunyan',
                args: ['--output', 'short', '--color']
              }, function() {});

              bunyan.stdout.pipe(process.stdout);
              bunyan.stderr.pipe(process.stderr);

              this.stdout.pipe(bunyan.stdin);
              this.stderr.pipe(bunyan.stdin);
            });

            // Opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:9000');
              }, 1000);
            });
          }
        }
      }
    },
    concurrent: { // Run task concurrently
      compilation: ['execute:minify-js', 'execute:minify-scss', 'execute:compile-index', 'execute:compile-partials'],
      run: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });


  /*****************************/
  /********** DEFAULT **********/
  /*****************************/
  grunt.registerTask('default', ['concurrent:compilation', 'concurrent:run']);
};
