const path = require('path') 
const mode = process.env.NODE_ENV == "production" ? "production" : "development" 
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  entry: {  
    index: path.resolve(__dirname, './src/index.js') 
  }, 
  output: {
      path: path.resolve(__dirname, './build'), 
      filename: '[name].bundle.js' 
    }, 
  mode: mode,
  module: { 
    rules: [ 
    { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
    }, 
    {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,  
        type: 'asset/resource', 
    },
    ], 
    }, 
  devtool: 'inline-source-map',
  plugins: [   
     new HtmlWebpackPlugin({   
     template: path.resolve(__dirname, "./src/template.html")   
  })   
  ],  
}  
