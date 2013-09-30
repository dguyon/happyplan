module.exports = function(grunt, happyplan) {
  "use strict";

  var fs = require('fs')
    , path = require('path')

  return grunt.util._.extend({}, happyplan.themesCopyTask, {
    cssAsScss: {
      files: [{
        expand: true,
        cwd: '<%= happyplan.bower_components %>',
        src: ['**/*.css'],
        dest: '<%= happyplan.bower_components %>',
        filter: function(src) {
          if (fs.statSync(src).isFile()) {
            // try to see if a similar Scss partials doesn't exist already
            try {
              return !fs.statSync(path.dirname(src) + path.sep + '_' + path.basename(src, '.css') + '.scss').isFile();
            }
            catch (e) {
              return e.code === 'ENOENT';
            }
          }

          return false;
        },
        ext:    ".scss"
      }]
    },

    images: {
      files: [{
        expand: true,
        cwd: '<%= happyplan.build.assets.images %>',
        src: '<%= happyplan.assets.images.src %>',
        dest: '<%= happyplan.dist.assets.images %>'
      }]
    },

    'jekyll-dist': {
      files: [{
        expand: true,
        cwd: '<%= happyplan.build.jekyll.dist %>',
        src: ['**', '**/.*'],
        dest: '<%= happyplan.dist._ %>'
      }]
    }
  })
}
