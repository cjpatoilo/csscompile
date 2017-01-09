'use strict'
const fs = require('fs')
const path = require('path')
const child = require('child_process')
const mkdirp = require('mkdirp')

function error (value) {
	value = value || undefined
	console.error(`[error] ${value}`)
	process.exit(1)
}

function resolveInput (value) {
	if (!fs.existsSync(value)) error('File not found!')
	if (fs.lstatSync(value).isFile()) return path.parse(value)
	if (fs.lstatSync(value).isDirectory()) {
		let main = fs.readdirSync(value)
			.filter(file => path.parse(file).name === 'main' && path.parse(file).ext !== '.css')
		main = main[0] ? path.resolve(value, main[0]) : error('Main file not found!')
		return path.parse(main)
	}
	error('File not found!')
}

function resolveOutput (value) {
	if (path.basename(value) !== '.css') value = path.resolve(value, 'main.css')
	value = path.parse(value)
	if (value.ext !== '.css') value.ext = '.css'
	if (path.extname(value.base) !== '.css') value.base = `${value.name}.css`
	if (!fs.existsSync(value.dir)) mkdirp(value.dir)
	return value
}

function csscompile (input, output, options) {
	input = !input ? error('Input not defined!') : resolveInput(input)
	output = !output ? resolveOutput(`${input.dir}/${input.base}`) : resolveOutput(output)
	options = options || {}

	return new Promise((resolve, reject) => {
		try {
			switch (input.ext) {
				case '.sass':
					child.exec(`node_modules/.bin/node-sass --output-style expanded ${input.dir}/${input.base} ${output.dir}/${output.base}`)
					break
				case '.scss':
					child.exec(`node_modules/.bin/node-sass --output-style expanded ${input.dir}/${input.base} ${output.dir}/${output.base}`)
					break
				case '.less':
					child.exec(`node_modules/.bin/lessc ${input.dir}/${input.base} ${output.dir}/${output.base}`)
					break
				case '.styl':
					child.exec(`node_modules/.bin/stylus ${input.dir}/${input.base} --out ${output.dir}/${output.base}`)
					break
				default:
					error('Extension not supported.')
			}
			console.info(`[info] Rendering Complete, saving .css file...`)
			console.info(`[info] Wrote CSS to ${path.resolve(output.dir, output.base)}`)
			resolve(output)
		} catch (err) {
			reject(err)
		}
	})
}

module.exports = csscompile
