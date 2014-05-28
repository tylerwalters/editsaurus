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
	});
};