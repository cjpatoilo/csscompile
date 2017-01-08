'use strict'
const fs = require('fs')
const path = require('path')
const child = require('child_process')
const mkdirp = require('mkdirp')

function exit (value) {
	console.error(`[error] ${value}`)
	process.exit(1)
}

function resolveInput (value) {
	if (!fs.existsSync(value)) exit('File not found!')
	if (!fs.lstatSync(value).isFile()) exit('File not found!')
	return path.parse(value)
}

function resolveOutput (value) {
	value = path.parse(value)
	if (value.ext !== '.css') exit('Output should have .css extension!')
	if (!fs.existsSync(value.dir)) mkdirp(value.dir)
	return value
}

function csscompile (input, output, options) {
	if (!input) exit('Input not defined!')
	if (!output) exit('Output not defined!')

	input = resolveInput(input)
	output = resolveOutput(output)
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
					exit('Extension not supported.')
			}
			console.log(`[info] Rendering Complete, saving .css file...`)
			console.log(`[info] Wrote CSS to ${path.resolve(output.dir, output.base)}`)
			resolve(output)
		} catch (err) {
			reject(err)
		}
	})
}

module.exports = csscompile
