'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * <%= pkg.title || pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * \n' +
            ' * @author <%= pkg.author %> \n' +
            ' * @since <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
            ' * @version v<%= pkg.version %>\n' +
            ' */\n',
        // Task configuration.
        clean: {
            pre: {
                src: ['build']
            },
            post: {
                src: ['build/enabler.js', 'build/html5-overlay/main.js']
            }
        },
        copy: {
            build: {
                files: [{
                    src: 'template.html',
                    dest: 'build/html5-overlay/index.html'
                }, {
                    expand: true,
                    src: 'css/**',
                    dest: 'build/html5-overlay/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'js/**',
                    dest: 'build/html5-overlay/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'images/**',
                    dest: 'build/html5-overlay/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'media/**',
                    dest: 'build/html5-overlay/',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },
        uglify: {
            enabler: {
                src: 'build/enabler.js',
                dest: 'build/enabler.min.js'
            },
            helper: {
                src: 'build/html5-overlay/main.js',
                dest: 'build/html5-overlay/main.min.js'
            }
        },
        browserify: {
            enabler: {
                files: {
                    'build/enabler.js': ['lib/enabler.js']
                },
                options: {
                    require: ['ad-utils'],
                }
            },
            helper: {
                files: {
                    'build/html5-overlay/main.js': ['lib/main.js']
                },
                options: {
                    require: ['ad-utils/lib/helper', 'ad-utils/lib/dimensions'],
                }
            }
        },
        watch: {
            js: {
                files: ['lib/**/*.js', '*.html', 'css/**/*.css'], // which files to watch
                tasks: ['dev'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['clean:pre', 'browserify', 'uglify', 'copy', 'clean:post']);
    grunt.registerTask('dev', ['clean:pre', 'browserify', 'uglify', 'copy']);
};
