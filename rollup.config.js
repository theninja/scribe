import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

const MINIFY = process.env.MINIFY === 'true';

const config = {
  entry: 'src/scribe.js',
  moduleName: 'scribe',
  targets: [
    { dest: `build/scribe.umd${MINIFY ? '.min' : ''}.js`, format: 'umd' },
    { dest: `build/scribe${MINIFY ? '.min' : ''}.js`, format: 'iife' }
  ],
  plugins: [
    {
      resolveId(importee, importer) {
        if (importee === 'immutable')
          return 'node_modules/immutable/src/Immutable.js';
      }
    }
  ],
  sourceMap: true
};

if (MINIFY) {
  config.plugins.push(uglify(undefined, minify));
}

export default config;
