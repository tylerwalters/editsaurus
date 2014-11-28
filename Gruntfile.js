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
		jade: {
			compile: {
				options: {
					pretty: true
				},
				files: {
					"app/index.html": "app/jade/index.jade"
				}
			}
		},
		processhtml: {
			dist: {
				files: {
					'dist/index.html': 'app/index.html'
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
			},
			html: {
				files: ['app/jade/*.jade'],
				tasks: ['jade:compile']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('build', ['jshint', 'sass', 'concat', 'uglify', 'cssmin', 'processhtml']);
};