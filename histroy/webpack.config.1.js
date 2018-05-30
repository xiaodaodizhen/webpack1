let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let WebpackServer = require('webpack-dev-server');
let webpack = require('webpack');
module.exports = {
  // #####################################多页面开发，配置多页面入口##########################################，
  entry: {
    b: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: "[name].[hash:8].js", //name 对应的是entry 对象的key（配置多入口多出口）  ------ hash取一个md5戳截取前8位添加到文件名，解决缓存问题, 例如：bundle.3aa634e3.js

    // 路径是绝对路径
    path: path.join(__dirname, 'dist')
  },//出口文件
  module: {},// 对象模块处理，各种loader加载器

  plugins: [ // 对应的插件
    new webpack.HotModuleReplacementPlugin(),// 热更新，实现热替换
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'a.html',// 如果是多文件入口，和多文件出口，就要给文件定义名字，不能使用默认值
      chunks: ['a'], // 对应的打包完成的js
      template: './src/index.html',// 用哪个html做的模板，会将打包好的js引入到以这个模板新创建的文件
      hash: true,// 解决缓存文件，让引用的文件后面加上 ?XXXXX   md5戳 例如：<script type=text/javascript src=bundle.js?7574113d7966dcb22a78></script>，
      minify: {  // 压缩
        collapseWhitespace: true,// 折叠空格
        removeAttributeQuotes: true// 去除双引号
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'b.html',
      chunks: ['b'],
      template: './src/index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })

  ],
  devServer: { // 启动静态服务器
    contentBase: './dist',// 服务目录,打包到内存中了（开发文件），跟目录里的dist 不是一个，目录里的是上线文件
    host: 'localhost',
    port: 3000, // 默认是8080   如果端口被占用会 ++port
    open: true, // 启动服务，在浏览器自动打开
    hot: true,// 默认自动刷新，热更新， 还需配置一个HotModuleReplacementPlugin插件（webpack 自带的）
  },


  mode: "development" // 模式配置

};

