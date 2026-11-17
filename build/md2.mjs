var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var md2$1 = {exports: {}};

/**
 * [js-md2]{@link https://github.com/emn178/js-md2}
 *
 * @namespace md2
 * @version 0.3.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2026
 * @license MIT
 */

(function (module) {
	/*jslint bitwise: true */
	(function () {

	  var INPUT_ERROR = 'input is invalid type';
	  var FINALIZE_ERROR = 'finalize already called';
	  var WINDOW = typeof window === 'object';
	  var root = WINDOW ? window : {};
	  if (root.JS_MD2_NO_WINDOW) {
	    WINDOW = false;
	  }
	  var WEB_WORKER = !WINDOW && typeof self === 'object';
	  var NODE_JS = !root.JS_MD2_NO_NODE_JS && !WINDOW && typeof process === 'object' && process.versions && process.versions.node && process.type != 'renderer';
	  if (NODE_JS) {
	    root = commonjsGlobal;
	  } else if (WEB_WORKER) {
	    root = self;
	  }
	  var COMMON_JS = !root.JS_MD2_NO_COMMON_JS && 'object' === 'object' && module.exports;
	  var ARRAY_BUFFER = !root.JS_MD2_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
	  var HEX_CHARS = '0123456789abcdef'.split('');
	  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

	  var S = [
	    0x29, 0x2E, 0x43, 0xC9, 0xA2, 0xD8, 0x7C, 0x01, 0x3D, 0x36, 0x54, 0xA1, 0xEC, 0xF0, 0x06, 0x13,
	    0x62, 0xA7, 0x05, 0xF3, 0xC0, 0xC7, 0x73, 0x8C, 0x98, 0x93, 0x2B, 0xD9, 0xBC, 0x4C, 0x82, 0xCA,
	    0x1E, 0x9B, 0x57, 0x3C, 0xFD, 0xD4, 0xE0, 0x16, 0x67, 0x42, 0x6F, 0x18, 0x8A, 0x17, 0xE5, 0x12,
	    0xBE, 0x4E, 0xC4, 0xD6, 0xDA, 0x9E, 0xDE, 0x49, 0xA0, 0xFB, 0xF5, 0x8E, 0xBB, 0x2F, 0xEE, 0x7A,
	    0xA9, 0x68, 0x79, 0x91, 0x15, 0xB2, 0x07, 0x3F, 0x94, 0xC2, 0x10, 0x89, 0x0B, 0x22, 0x5F, 0x21,
	    0x80, 0x7F, 0x5D, 0x9A, 0x5A, 0x90, 0x32, 0x27, 0x35, 0x3E, 0xCC, 0xE7, 0xBF, 0xF7, 0x97, 0x03,
	    0xFF, 0x19, 0x30, 0xB3, 0x48, 0xA5, 0xB5, 0xD1, 0xD7, 0x5E, 0x92, 0x2A, 0xAC, 0x56, 0xAA, 0xC6,
	    0x4F, 0xB8, 0x38, 0xD2, 0x96, 0xA4, 0x7D, 0xB6, 0x76, 0xFC, 0x6B, 0xE2, 0x9C, 0x74, 0x04, 0xF1,
	    0x45, 0x9D, 0x70, 0x59, 0x64, 0x71, 0x87, 0x20, 0x86, 0x5B, 0xCF, 0x65, 0xE6, 0x2D, 0xA8, 0x02,
	    0x1B, 0x60, 0x25, 0xAD, 0xAE, 0xB0, 0xB9, 0xF6, 0x1C, 0x46, 0x61, 0x69, 0x34, 0x40, 0x7E, 0x0F,
	    0x55, 0x47, 0xA3, 0x23, 0xDD, 0x51, 0xAF, 0x3A, 0xC3, 0x5C, 0xF9, 0xCE, 0xBA, 0xC5, 0xEA, 0x26,
	    0x2C, 0x53, 0x0D, 0x6E, 0x85, 0x28, 0x84, 0x09, 0xD3, 0xDF, 0xCD, 0xF4, 0x41, 0x81, 0x4D, 0x52,
	    0x6A, 0xDC, 0x37, 0xC8, 0x6C, 0xC1, 0xAB, 0xFA, 0x24, 0xE1, 0x7B, 0x08, 0x0C, 0xBD, 0xB1, 0x4A,
	    0x78, 0x88, 0x95, 0x8B, 0xE3, 0x63, 0xE8, 0x6D, 0xE9, 0xCB, 0xD5, 0xFE, 0x3B, 0x00, 0x1D, 0x39,
	    0xF2, 0xEF, 0xB7, 0x0E, 0x66, 0x58, 0xD0, 0xE4, 0xA6, 0x77, 0x72, 0xF8, 0xEB, 0x75, 0x4B, 0x0A,
	    0x31, 0x44, 0x50, 0xB4, 0x8F, 0xED, 0x1F, 0x1A, 0xDB, 0x99, 0x8D, 0x33, 0x9F, 0x11, 0x83, 0x14
	  ];

	  var isArray = Array.isArray;
	  if (root.JS_MD2_NO_NODE_JS || !isArray) {
	    isArray = function (obj) {
	      return Object.prototype.toString.call(obj) === '[object Array]';
	    };
	  }

	  var isView = ARRAY_BUFFER ? ArrayBuffer.isView : null;
	  if (ARRAY_BUFFER && (root.JS_MD2_NO_ARRAY_BUFFER_IS_VIEW || !isView)) {
	    isView = function (obj) {
	      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
	    };
	  }

	  // [message: string, isString: bool]
	  var formatMessage = function (message) {
	    var type = typeof message;
	    if (type === 'string') {
	      return [message, true];
	    }
	    if (type !== 'object' || message === null) {
	      throw new Error(INPUT_ERROR);
	    }
	    if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
	      return [new Uint8Array(message), false];
	    }
	    if (isArray(message)) {
	      return [message, false];
	    }
	    if (!ARRAY_BUFFER || !isView(message)) {
	      throw new Error(INPUT_ERROR);
	    }
	    // read the underlying bytes of any view (DataView, Uint16Array, ...)
	    return [new Uint8Array(message.buffer, message.byteOffset, message.byteLength), false];
	  };

	  var createOutputMethod = function (outputType) {
	    return function (message) {
	      return new Md2().update(message)[outputType]();
	    };
	  };

	  var createMethod = function () {
	    var method = createOutputMethod('hex');
	    method.create = function () {
	      return new Md2();
	    };
	    method.update = function (message) {
	      return method.create().update(message);
	    };
	    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
	      var type = OUTPUT_TYPES[i];
	      method[type] = createOutputMethod(type);
	    }
	    return method;
	  };

	  /**
	   * Md2 class
	   * @class Md2
	   * @description This is internal class.
	   * @see {@link md2.create}
	   */
	  function Md2() {
	    this.X = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	    this.C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	    this.M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	    this.L = 0;
	    this.start = 0;
	    this.finalized = false;
	  }

	  /**
	   * @method update
	   * @memberof Md2
	   * @instance
	   * @description Update hash
	   * @param {String|Array|ArrayBuffer|ArrayBufferView} message message to hash
	   * @returns {Md2} MD2 object.
	   */
	  Md2.prototype.update = function (message) {
	    if (this.finalized) {
	      throw new Error(FINALIZE_ERROR);
	    }
	    var result = formatMessage(message);
	    message = result[0];
	    var isString = result[1];
	    var M = this.M, i = this.start, index = 0, length = message.length, code, code2;

	    if (isString) {
	      for (; index < length; ++index) {
	        code = message.charCodeAt(index);
	        if (code < 0x80) {
	          M[i++] = code;
	        } else if (code < 0x800) {
	          M[i++] = 0xc0 | (code >>> 6);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | (code & 0x3f);
	        } else if (code < 0xd800 || code >= 0xe000) {
	          M[i++] = 0xe0 | (code >>> 12);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | ((code >>> 6) & 0x3f);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | (code & 0x3f);
	        } else if (code < 0xdc00 && (code2 = message.charCodeAt(index + 1)) >= 0xdc00 && code2 < 0xe000) {
	          ++index;
	          code = 0x10000 + (((code & 0x3ff) << 10) | (code2 & 0x3ff));
	          M[i++] = 0xf0 | (code >>> 18);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | ((code >>> 12) & 0x3f);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | ((code >>> 6) & 0x3f);
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0x80 | (code & 0x3f);
	        } else {
	          // unpaired surrogate: U+FFFD
	          M[i++] = 0xef;
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0xbf;
	          if (i === 16) { this.block(); i = 0; }
	          M[i++] = 0xbd;
	        }
	        if (i === 16) { this.block(); i = 0; }
	      }
	    } else {
	      for (; index < length; ++index) {
	        M[i++] = message[index] & 0xff;
	        if (i === 16) { this.block(); i = 0; }
	      }
	    }
	    this.start = i;
	    return this;
	  };

	  Md2.prototype.block = function () {
	    var M = this.M, C = this.C, L = this.L, i;
	    for (i = 0; i < 16; ++i) {
	      C[i] ^= S[M[i] ^ L];
	      L = C[i];
	    }
	    this.L = L;
	    this.compress(M);
	  };

	  Md2.prototype.compress = function (B) {
	    var X = this.X, i, j, t = 0;
	    for (i = 0; i < 16; ++i) {
	      X[16 + i] = B[i];
	      X[32 + i] = B[i] ^ X[i];
	    }
	    for (j = 0; j < 18; ++j) {
	      for (i = 0; i < 48; ++i) {
	        X[i] = t = X[i] ^ S[t];
	      }
	      t = (t + j) & 0xff;
	    }
	  };

	  Md2.prototype.finalize = function () {
	    if (this.finalized) {
	      return;
	    }
	    this.finalized = true;
	    var M = this.M, i = this.start, pad = 16 - i;
	    for (; i < 16; ++i) {
	      M[i] = pad;
	    }
	    this.block();
	    this.compress(this.C);
	  };

	  /**
	   * @method hex
	   * @memberof Md2
	   * @instance
	   * @description Output hash as hex string
	   * @returns {String} Hex string
	   */
	  Md2.prototype.hex = function () {
	    this.finalize();
	    var X = this.X, hex = '';
	    for (var i = 0; i < 16; ++i) {
	      hex += HEX_CHARS[(X[i] >>> 4) & 0x0f] + HEX_CHARS[X[i] & 0x0f];
	    }
	    return hex;
	  };

	  Md2.prototype.toString = Md2.prototype.hex;

	  /**
	   * @method digest
	   * @memberof Md2
	   * @instance
	   * @description Output hash as bytes array
	   * @returns {Array} Bytes array
	   */
	  Md2.prototype.digest = function () {
	    this.finalize();
	    return this.X.slice(0, 16);
	  };

	  Md2.prototype.array = Md2.prototype.digest;

	  /**
	   * @method arrayBuffer
	   * @memberof Md2
	   * @instance
	   * @description Output hash as ArrayBuffer
	   * @returns {ArrayBuffer} ArrayBuffer
	   */
	  Md2.prototype.arrayBuffer = function () {
	    this.finalize();
	    var buffer = new ArrayBuffer(16);
	    var bytes = new Uint8Array(buffer);
	    for (var i = 0; i < 16; ++i) {
	      bytes[i] = this.X[i];
	    }
	    return buffer;
	  };

	  var exports = createMethod();

	  if (COMMON_JS) {
	    module.exports = exports;
	  } else {
	    root.md2 = exports;
	  }
	})(); 
} (md2$1));

var md2Exports = md2$1.exports;
var md2 = /*@__PURE__*/getDefaultExportFromCjs(md2Exports);

export { md2 as default, md2 };
