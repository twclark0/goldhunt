var path = require('path');

module.exports = {
  plugins: [
      new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  node: {
    __dirname: true,
  },
  alias: {
    'inherits': 'inherits/inherits_browser.js',
    'superagent': 'superagent/lib/client',
    'emitter': 'component-emitter',
  },
};
