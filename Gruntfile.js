
var fs = require('fs');

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
                src: ['build/temp']
            }
        },
        copy: {
        	build: {
        		files: [
        			{src: 'template.html', dest: 'build/template.html'},
                    {src: 'css/**', dest: 'build/css'},
                    {src: 'js/**', dest: 'build/js'},
                    {src: 'images/**', dest: 'build/images'},
        		]
        	}
        },
        uglify: {
            build: {
                src: 'build/temp/main.js',
                dest: 'build/temp/main.min.js'
            }
        },
        browserify: {
            build: {
                files: {
                    'build/temp/main.js': ['lib/**/*.js']
                },
                options: {
                    require: ['ad-utils'],
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task.
    grunt.registerTask('default', ['clean:pre', 'browserify', 'uglify','copy', 'clean:post']);
};
