module.exports = function(grunt) {

  var story = grunt.option('xpr') || 'xpr'; // if no story is specified, run on the

  //Force fallback on async module
  global.setImmediate = undefined;

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        browserifyOptions: {
          paths: [ './', './modules/', './build/']
        }
      },
      xpr: {
        files: [{
          src: './build/index.js',
          expand: true,
          rename: function(dest, src) {
            return src.replace('build/', 'dist/');
          }
        }]
      },
    },

    sass: {
      options: {
        loadPath: ['./src/scss', './src/modules', './src/modules/elements', './src/modules/layouts', './stories/']
      },
      stories: {
        cwd: './',
        src: './stories/' + story + '/build/styles.scss',
        expand: true,
        rename: function(dest, src) {
          var newPath = src.replace('build', 'dist');
          var customDest = this.cwd + newPath.replace('scss', 'css');
          return customDest;
        }
      },
      builder: {
        cwd: './',
        src: './builder/style.scss',
        expand: true,
        rename: function(dest, src) {
          var customDest = this.cwd + src.replace('scss', 'css');
          return customDest;
        }
      }
    },

    autoprefixer: {
      stories: {
          './stories/**/dist/styles.css' : './stories/**/dist/styles.css'
      }
    },

    copy: {
      stories: {
        files: [
          {
            expand: true,
            src: ['./stories/**/build/*.html'],
            rename: function(dest, src) {
              var newPath = src.replace('build', 'dist');
              var customDest = this.cwd + newPath.replace('scss', 'css');
              return customDest;
            },
            filter: 'isFile'
          }
        ]
      },
    },

    eslint: {
      options: {
        configFile: '.eslintrc.json',
        fix: true
      },
      story: ['./build-files.js', './src/modules/**/*.js']
    },

    yaml: {
      builder: {
        options: {
          ignored: /^_/,
          space: 4
        },
        files: [
          {
            expand: true,
            src: ['./src/*.yml'],
            rename: function(dest, src) {
              return src.replace('yml', 'json');
            }
          }
        ]
      },
    },

    watch: {
      sass: {
        files: ['./stories/**/build/*.scss', './src/scss/style.scss', './src/modules/**/style.scss', './builder/style.scss'],
        tasks: ['sass:stories', 'sass:builder']
      },
      js: {
        files: ['./build/index.js', './modules/**/script.js'],
        tasks: ['browserify']
      },
      // rebuild template after changes in data
      data: {
        files: ['./stories/**/data.json'],
        tasks: ['shell:buildStory:' + story]
      },
      // recompile handlebars after a change in templates, then rebuild story files
      hbs: {
        files: ['./src/modules/**/template.hbs', './stories/**/**/template.hbs'],
        tasks: ['handlebars', 'shell:buildStory:' + story]
      },
      yml: {
        files: ['./src/*.yml', './stories/**/*.yml', './src/*.yaml'],
        tasks: ['shell:buildStory:' + story, 'responsive_images']
      }
    },

    serve: {
      'path': './stories/' + story + '/dist/index.html'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-yaml');
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('lintall', ['eslint']);

  grunt.registerTask('default', ['watch']); //test
};
