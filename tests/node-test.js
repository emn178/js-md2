md2 = require('../src/md2.js');
expect = require('expect.js');
require('./test.js');

delete require.cache[require.resolve('../src/md2.js')]
delete require.cache[require.resolve('./test.js')]
md2 = null

JS_MD2_TEST = true;
require('../src/md2.js');
require('./test.js');
