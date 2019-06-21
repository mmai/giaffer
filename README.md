# Giaffer

#### A guided serendipity tool : combine your interests in a search request

## About

Giaffer facilitate the discovery of new Web pages by combining search terms related to subjects randomly selected from a list of your favorite interests.

It is a web implementation of Integrate your Interests, a hack by [Ron Hale Evans](http://ludism.org/tinfoil) from his book Mindhacker.

Try it on http://mmai.github.io/giaffer or [install the chrome extension](https://chrome.google.com/webstore/detail/giaffer/noodloalemeghdoiolcopooienadaocb)

## Installation

```sh
$ npm install
$ ./node_modules/bower/bin/bower install
```

## Web app compilation

```sh
$ ./node_modules/gulp/bin/gulp.js compile
$ ./node_modules/gulp/bin/gulp.js bootswatch:dist
```

## Chrome extension build

```sh
$ ./node_modules/gulp/bin/gulp.js --gulpfile gulpfile_chrome.js build
```
