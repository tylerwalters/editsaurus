module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			css: {
				src: ['app/css/*.css'],
				dest: 'dist/css/style.css'
			},
			js: {
				src: ['app/js/*.js'],
				dest: 'dist/js/script.js'
			}
		},
		sass: {
			dist: {
				files: {
					'app/css/style.css': 'app/css/sass/style.scss'
				}
			}
		},
		uglify: {
			minify: {
				files: {
					'dist/js/script.min.js': ['<%= concat.js.dest %>']
				}
			}
		}, 
		cssmin: {
			minify: {
				files: {
					'dist/css/style.min.css': ['<%= concat.css.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'app/js/*.js']
		},
		watch: {
			css: {
				files: ['app/css/sass/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build', ['jshint', 'sass', 'concat', 'uglify', 'cssmin']);
};