# js-md2
[![CI](https://github.com/emn178/js-md2/actions/workflows/ci.yml/badge.svg)](https://github.com/emn178/js-md2/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/emn178/js-md2/badge.svg?branch=master)](https://coveralls.io/r/emn178/js-md2?branch=master)
[![NPM](https://img.shields.io/npm/v/js-md2)](https://www.npmjs.com/package/js-md2)
[![CDNJS](https://img.shields.io/jsdelivr/npm/hm/js-md2)](https://www.jsdelivr.com/package/npm/js-md2)

A simple MD2 hash function for JavaScript supports UTF-8 encoding.

## Download
[Compress](https://raw.github.com/emn178/js-md2/master/build/md2.min.js)  
[Uncompress](https://raw.github.com/emn178/js-md2/master/src/md2.js)

## Installation
You can also install js-md2 by using Bower.

    bower install js-md2

For node.js, you can use this command to install:

    npm install js-md2

## Notice
MD2 is obsolete and insecure. Use it only for compatibility with legacy systems.

## Usage
You could use like this:
```JavaScript
md2('Message to hash');

var hash = md2.create();
hash.update('Message to hash');
hash.hex();

var hash2 = md2.update('Message to hash');
hash2.update('Message2 to hash');
hash2.array();
```
If you use node.js, you should require the module first:
```JavaScript
var md2 = require('js-md2');
```
If you use node.js ESM or a bundler, you can import like this:
```JavaScript
import { md2 } from 'js-md2';
// or
import md2 from 'js-md2';
```
In browsers, you can import the ESM build directly:
```HTML
<script type="module">
  import { md2 } from 'https://cdn.jsdelivr.net/npm/js-md2/build/md2.min.mjs';
</script>
```
If you use TypeScript, you can import like this:
```TypeScript
import { md2 } from 'js-md2';
```
It supports AMD:
```JavaScript
require(['your/path/md2.js'], function (md2) {
// ...
});
```

## Example
```JavaScript
md2(''); // 8350e5a3e24c153df2275c9f80692773
md2('The quick brown fox jumps over the lazy dog'); // 03d85a0d629d2c442e987525319fc471
md2('The quick brown fox jumps over the lazy dog.'); // 71eaa7e440b611e41a6f0d97384b342a

// It also supports UTF-8 encoding
md2('中文'); // 7af93c270b0ec392ca2f0d90a927cf8a

// Unpaired surrogates are encoded as U+FFFD, the same as TextEncoder
md2('\ud800'); // c010db6cf6cc1bd72e2d36f23477e8c2

// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
md2([]); // 8350e5a3e24c153df2275c9f80692773
md2(new Uint8Array([])); // 8350e5a3e24c153df2275c9f80692773

// Different output
md2(''); // 8350e5a3e24c153df2275c9f80692773
md2.hex(''); // 8350e5a3e24c153df2275c9f80692773
md2.array(''); // [131, 80, 229, 163, 226, 76, 21, 61, 242, 39, 92, 159, 128, 105, 39, 115]
md2.digest(''); // [131, 80, 229, 163, 226, 76, 21, 61, 242, 39, 92, 159, 128, 105, 39, 115]
md2.arrayBuffer(''); // ArrayBuffer
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-md2  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
