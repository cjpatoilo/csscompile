'use strict'
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const less = require('gulp-less')
const stylus = require('gulp-stylus')
const cssnano = require('gulp-cssnano')

function error (value) {
	value = value || undefined
	console.error(`[error] ${value}`)
	process.exit(1)
}

function resolveInput (value) {
	if (!fs.existsSync(value)) error('Input not exist.')
	if (fs.lstatSync(value).isFile()) error('Input should be a folder.')
	let dirname = value
	value = fs
		.readdirSync(value)
		.filter(file => path.parse(file).ext === '.sass' || path.parse(file).ext === '.scss' || path.parse(file).ext === '.less' || path.parse(file).ext === '.styl')
	return value[0] ? path.resolve(dirname, `**/*${path.parse(value[0]).ext}`) : error('File not found.')
}

function resolveOutput (input, output) {
	if (!output) return path.dirname(path.dirname(input))
	return path.resolve(output)
}

function csscompile (input, output) {
	input = resolveInput(input)
	output = resolveOutput(input, output)

	return new Promise((resolve, reject) => {
		try {
			let compile
			switch (path.parse(input).ext) {
				case '.sass':
					compile = sass
					break
				case '.scss':
					compile = sass
					break
				case '.less':
					compile = less
					break
				case '.styl':
					compile = stylus
					break
				default:
					error('Input not supported.')
			}
			gulp
				.src(input)
				.pipe(compile())
				.pipe(cssnano())
				.pipe(gulp.dest(output))
			console.info(`[info] Rendering Complete, saving .css file...`)
			console.info(`[info] Wrote CSS to ${output}`)
			resolve(output)
		} catch (err) {
			reject(err)
		}
	})
}

module.exports = csscompile
