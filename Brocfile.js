'use strict';

var babelify = require('babelify');
var compileLess = require('broccoli-less-single');
var env = require('broccoli-env').getEnv();
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var watchify = require('broccoli-watchify');
var Extractor = require('broccoli-source-map').SourceMapExtractor;

var production = env === 'production';

var js = watchify('src', {
  browserify: {
    debug: !production,
    entries: ['./index.jsx'],
    extensions: ['.js', '.jsx']
  },
  cache: true,
  outputFile: 'app.js',
  init: function(b) {
    b.transform(babelify)
  }
});

var extractedSourceMap = new Extractor([js]);

var less = compileLess('src', 'index.less', 'app.css', {
  paths: ['.'],
  sourceMap: true,
  outputSourceFiles: true
});

var assets = new Funnel('public');

module.exports = mergeTrees([js, less, assets, extractedSourceMap], {overwrite: true});
