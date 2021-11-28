import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './bin/simple-crud-api.js',


  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

};
