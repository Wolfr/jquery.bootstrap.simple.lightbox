module.exports = (grunt) ->
    @loadNpmTasks('grunt-contrib-clean')
    @loadNpmTasks('grunt-contrib-jshint')
    @loadNpmTasks('grunt-contrib-watch')
    @loadNpmTasks('grunt-contrib-uglify')

    @initConfig
        jshint:
            all: ['js/*.js', '!js/*.min.js']

        clean:
            minified: ['js/*.min.js']

        uglify:
            all:
                files:
                    'js/jquery.bootstrap.simple.lightbox.min.js': ['js/jquery.bootstrap.simple.lightbox.js']

        watch:
            all:
                files: ['js/*.js', '!js/*.min.js']
                tasks: ['build']

    @registerTask 'default', ['build']
    @registerTask 'build', ['clean', 'jshint', 'uglify']
