# CSSCompile

> Compile, optimize and compress anything to CSS.

[![Travis Status](https://travis-ci.org/cjpatoilo/csscompile.svg?branch=master)](https://travis-ci.org/cjpatoilo/csscompile?branch=master)
[![AppVeyor Status](https://ci.appveyor.com/api/projects/status/ddvb3deetsy4hbus?svg=true)](https://ci.appveyor.com/project/cjpatoilo/csscompile)
[![Codacy Status](https://img.shields.io/codacy/grade/acd168808f5445de9c7a859ccfa141c7/master.svg)](https://www.codacy.com/app/cjpatoilo/csscompile/dashboard)
[![Dependencies Status](https://david-dm.org/cjpatoilo/csscompile.svg)](https://david-dm.org/cjpatoilo/csscompile)
[![Version Status](https://badge.fury.io/js/csscompile.svg)](https://www.npmjs.com/package/csscompile)
[![Download Status](https://img.shields.io/npm/dt/csscompile.svg)](https://www.npmjs.com/package/csscompile)
[![Gitter Chat](https://img.shields.io/badge/gitter-join_the_chat-4cc61e.svg)](https://gitter.im/cjpatoilo/csscompile)


## Why it's awesome

This library reads the package.json files for each of those dependencies. Based on these connections, it will generate a bundle of the master files.

*NOTE: For now only works with Sass, SCSS, Stylus and Less files.*


## Getting Started

**Install with npm**

```
$ npm install csscompile
```

**Usage**

```
$ csscompile src/main.styl
```

*NOTE: If you only declare the folder name by default the `main.{sass,scss,styl,less}` file will be searched.*


## CLI

```
$ csscompile --help

  Usage:

    $ csscompile <input> [<output>] [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version

  Examples:

    $ csscompile src/app.sass dist/app.css
```



## Contributing

Want to contribute? Follow these [recommendations](https://github.com/cjpatoilo/csscompile/blob/master/.github/contributing.md).


## License

Designed with ♥ by [CJ Patoilo](http://twitter.com/cjpatoilo). Licensed under the [MIT License](http://cjpatoilo.mit-license.org).
