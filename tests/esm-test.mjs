import { createRequire } from 'module';
import expect from 'expect.js';
import * as esm from '../build/md2.mjs';
import * as esmMin from '../build/md2.min.mjs';
import * as pkg from 'js-md2';

const require = createRequire(import.meta.url);

globalThis.expect = expect;

[['build/md2.mjs', esm], ['build/md2.min.mjs', esmMin], ['js-md2', pkg]].forEach(([name, mod]) => {
  describe('ESM ' + name, () => {
    it('should export the named member matching the default export', () => {
      expect(mod.md2).to.be(mod.default);
      expect(mod.default('abc')).to.be('da853b0d3f88d99b30283a69e6ded6bb');
    });
  });

  globalThis.md2 = mod.default;
  delete require.cache[require.resolve('./test.js')];
  require('./test.js');
});
