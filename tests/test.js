(function(md2) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    'ascii': {
      '8350e5a3e24c153df2275c9f80692773': '',
      'da853b0d3f88d99b30283a69e6ded6bb': 'abc',
      'ab4f496bfb2a530b219ff33031fe06b0': 'message digest',
      '4e8ddff3650292ab5a4108c3aa47940b': 'abcdefghijklmnopqrstuvwxyz',
      '03d85a0d629d2c442e987525319fc471': 'The quick brown fox jumps over the lazy dog',
      '71eaa7e440b611e41a6f0d97384b342a': 'The quick brown fox jumps over the lazy dog.'
    },
    'ascii more than 64 bytes': {
      '3658f72434eecc8bdb99047f9710c263': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
    },
    'UTF8': {
      '7af93c270b0ec392ca2f0d90a927cf8a': '中文',
      '628657f2dbd637b6b13500e8567a1c83': 'aécio',
      '434fc70b04f5ce106b1463f2201223a2': '𠜎'
    },
    'UTF8 more than 64 bytes': {
      '540807038b552743df461fa1ba5c0cbb': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
      '4a0cf02bb374a56e9a9a17e426dee995': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
    },
    'UTF8 unpaired surrogates': {
      'c010db6cf6cc1bd72e2d36f23477e8c2': '\ud800',
      'eaefa2bdfe437eaad4692c8dfe7c1eff': 'a\ud83db',
      '9419d39dc086812bc6b58c3ee185871c': '\ud83d😀\udfff',
      '139dd865bd114630dcee111357755f35': Array(15).join('a') + '\ud800b'
    },
    'UTF8 across block boundary': {
      'dbc39051d86809074e6aafecebe88e33': Array(16).join('a') + 'é',
      'fdda2de1ca577209bb2c5f7f84f59958': Array(15).join('a') + '中',
      'f3c14b0ccafe74c0126e27d21ac48e48': Array(16).join('a') + '中',
      'f859fc3813912f471bada7a542bf8095': Array(14).join('a') + '𠜎',
      '97342e8915535a85848215c05f0c74b6': Array(15).join('a') + '𠜎',
      '259c46f9f1a4ae342b5e71ac940365fb': Array(16).join('a') + '𠜎',
      '149754be97487037f6f49ca86101fc5f': Array(15).join('a') + '\ud800',
      '5fd7c269b68ea09f5534896a270cf39d': Array(16).join('a') + '\ud800'
    },
    'special length': {
      'd95629645108a20ab4d70e8545e0723b': '0123456789abcde',
      '12c8dfa285f14e1af8c5254e7092d0d3': '0123456789abcdef',
      '24663d5c73dcf877bc739d394c9276c2': '0123456789abcdef0',
      '47c291dfc979fbae4a75cd477bc96cdd': '0123456789abcdef0123456789abcdef'
    },
    'Array': {
      '8350e5a3e24c153df2275c9f80692773': [],
      'ee8dbae3bc62bdc94ea63f69c1bc26c9': [0],
      '03d85a0d629d2c442e987525319fc471': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103],
      'e45ccf257d52c8acca3456073b91aafa': [72, 69, 76, 76, 79]
    }
  };

  if (typeof JS_MD2_NO_ARRAY_BUFFER === 'undefined') {
    var u16 = new Uint8Array([2, 1]);
    var view = new Uint8Array([9, 72, 69, 76, 76, 79, 9]);
    testCases['Uint8Array'] = {
      '03d85a0d629d2c442e987525319fc471': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]),
      'e45ccf257d52c8acca3456073b91aafa': new Uint8Array([72, 69, 76, 76, 79])
    };
    testCases['Int8Array'] = {
      'e45ccf257d52c8acca3456073b91aafa': new Int8Array([72, 69, 76, 76, 79])
    };
    testCases['ArrayBuffer view'] = {
      '18bb11a5585658d7cb01788ef13139ef': new Uint16Array(u16.buffer),
      'e45ccf257d52c8acca3456073b91aafa': new DataView(view.buffer, 1, 5)
    };
    testCases['ArrayBuffer'] = {
      'ee8dbae3bc62bdc94ea63f69c1bc26c9': new ArrayBuffer(1)
    };
  }

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  var methods = [
    {
      name: 'md2',
      call: md2
    },
    {
      name: 'md2.hex',
      call: md2.hex
    },
    {
      name: 'md2.array',
      call: function (message) {
        return md2.array(message).toHexString();
      }
    },
    {
      name: 'md2.digest',
      call: function (message) {
        return md2.digest(message).toHexString();
      }
    }
  ];

  var classMethods = [
    {
      name: 'create',
      call: function (message) {
        return md2.create().update(message).toString();
      }
    },
    {
      name: 'update',
      call: function (message) {
        return md2.update(message).toString();
      }
    },
    {
      name: 'hex',
      call: function (message) {
        return md2.update(message).hex();
      }
    },
    {
      name: 'array',
      call: function (message) {
        return md2.update(message).array().toHexString();
      }
    },
    {
      name: 'digest',
      call: function (message) {
        return md2.update(message).digest().toHexString();
      }
    },
    {
      name: 'finalize',
      call: function (message) {
        var hash = md2.update(message);
        hash.hex();
        return hash.hex();
      }
    }
  ];

  if (typeof JS_MD2_NO_ARRAY_BUFFER === 'undefined') {
    methods.push({
      name: 'md2.arrayBuffer',
      call: function (message) {
        return md2.arrayBuffer(message).toHexString();
      }
    });
    classMethods.push({
      name: 'arrayBuffer',
      call: function (message) {
        return md2.update(message).arrayBuffer().toHexString();
      }
    });
  }

  function runTests(method) {
    describe('#' + method.name, function () {
      for (var testCaseName in testCases) {
        (function (testCaseName) {
          var testCase = testCases[testCaseName];
          context('when ' + testCaseName, function () {
            for (var hash in testCase) {
              (function (message, hash) {
                it('should be equal', function () {
                  expect(method.call(message)).to.be(hash);
                });
              })(testCase[hash], hash);
            }
          });
        })(testCaseName);
      }
    });
  }

  describe('Md2', function () {
    methods.forEach(runTests);
    classMethods.forEach(runTests);
  });

  describe('#md2', function () {
    errorTestCases.forEach(function (testCase) {
      context('when ' + testCase, function () {
        it('should throw error', function () {
          expect(function () {
            md2(testCase);
          }).to.throwError(/input is invalid type/);
        });
      });
    });

    context('when update after finalize', function () {
      it('should throw error', function () {
        expect(function () {
          var hash = md2.update('any');
          hash.hex();
          hash.update('any');
        }).to.throwError(/finalize already called/);
      });
    });

    context('when updating in chunks', function () {
      it('should be equal', function () {
        var message = 'The MD5 message-digest algorithm is a widely used cryptographic hash function';
        var hash = md2.create();
        for (var i = 0; i < message.length; i += 7) {
          hash.update(message.substr(i, 7));
        }
        expect(hash.hex()).to.be(md2(message));
        expect(md2.update('中').update('文').hex()).to.be('7af93c270b0ec392ca2f0d90a927cf8a');
      });
    });

    context('when a surrogate pair is split across updates', function () {
      it('should encode each unpaired half as U+FFFD', function () {
        expect(md2.update('a\ud83d').update('\ude00b').hex()).to.be('ef2686aa539502602de9fcacb3d25cd9');
        expect(md2.update('a\ud83d').update('b').hex()).to.be('eaefa2bdfe437eaad4692c8dfe7c1eff');
      });
    });
  });
})(md2);
