# js-md2
This is a simple MD2 hash function for JavaScript supports UTF-8 encoding.

## Install
For node.js, you can use this command to install:

    npm install js-md2

## Usage
If you use node.js, you should require the module first:
```JavaScript
md2 = require('js-md2');
```
And you could use like this:
```JavaScript
md2('Message to hash');
```
## Example
Code
```JavaScript
md2('');
md2('The quick brown fox jumps over the lazy dog');
md2('The quick brown fox jumps over the lazy dog.');
```
Output

    8350e5a3e24c153df2275c9f80692773
    03d85a0d629d2c442e987525319fc471
    71eaa7e440b611e41a6f0d97384b342a

It also supports UTF-8 encoding:

Code
```JavaScript
md2('中文');
```
Output

    7af93c270b0ec392ca2f0d90a927cf8a

## Tests
You can open `tests/index.html` in browser or use node.js to run test

    node tests/node-test.js

or

    npm test

## Extensions
### jQuery
If you prefer jQuery style, you can add following code to add a jQuery extension.

Code
```JavaScript
jQuery.md2 = md2
```
And then you could use like this:
```JavaScript
$.md2('message');
```
### Prototype
If you prefer prototype style, you can add following code to add a prototype extension.

Code
```JavaScript
String.prototype.md2 = function() {
  return md2(this);
};
```
And then you could use like this:
```JavaScript
'message'.md2();
```
## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-md2  
Author: emn178@gmail.com
