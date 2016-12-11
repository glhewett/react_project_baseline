'use strict';

var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var compileLess = require('broccoli-less-single');
var eslint = require('rollup-plugin-eslint');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var nodeResolve = require('rollup-plugin-node-resolve');
var replace = require('rollup-plugin-replace');
var Rollup = require('broccoli-rollup');
var uglify = require('rollup-plugin-uglify');

var js = new Rollup('app', {
  rollup: {
    entry: './index.jsx',
    dest: 'app.js',
    sourceMap: true,
    format: 'iife',
    plugins: [
      eslint({
        throwError: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: true
      })
    ]
  }
});

var less = compileLess('app', 'index.less', 'app.css', {
  paths: ['.'],
  sourceMap: true,
  outputSourceFiles: true
});

var assets = new Funnel('public');

module.exports = mergeTrees([js, less, assets], {overwrite: true});
