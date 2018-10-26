var path = require('path')
var webpack = require('webpack')

module.exports = (env={}) => {

  if(!env.version) {
    console.log("To set create a filename representing a new version, run the command like so: `npm run deploy --  --env.version=3`.\n")
  }
  
  return {
    entry: './widget-script.js',
    output: {
      path: path.resolve(__dirname, `widget-script-${!env.version ? 'test-' : ''}builds`),
      filename: `widget-script-${env.version ? `v${env.version}` : Date.now()}.js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
            ],
          },
        },
      ],
    },
    mode: 'production',
  }
}
