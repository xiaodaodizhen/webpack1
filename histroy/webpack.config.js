// 默认情况下 文件名字定为 webpack.config.js
// webpack 基于node的，用法是commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  // #############################################单入口文件、多入口文件单出口文件######################################
  // entry: "./src/index.js",// 单入口文件
  // 多入口文件是没有关系的，但是要打包到一起去，需要给entry属性定义一个数组，实现多个文件打包为一个,一个，一个一个
  entry: ["./src/index.js", "./src/index2.js"],
  output: {
    // filename: 'bundle.js',
    filename: "bundle.[hash:8].js", // 取一个md5戳截取前8位添加到文件名，解决缓存问题, 例如：bundle.3aa634e3.js

    // 路径是绝对路径
    path: path.join(__dirname, 'dist')
  },//出口文件
  module: {},// 对象模块处理，各种loader加载器

  plugins: [
    new CleanWebpackPlugin(['dist']),// 清空打包输出的文件
    new HtmlWebpackPlugin({
      template: './src/index.html',// 用哪个html做的模板，会将打包好的js引入到以这个模板新创建的文件
      hash: true,// 解决缓存文件，让引用的文件后面加上 ?XXXXX   md5戳 例如：<script type=text/javascript src=bundle.js?7574113d7966dcb22a78></script>，
      minify: {  // 压缩
        collapseWhitespace: true,// 折叠空格
        removeAttributeQuotes: true// 去除双引号
      }
    }),

  ],//对应的插件
  devServer: {},//开发服务器配置
  mode: "development" // 模式配置

};


//  实现html 打包功能，可以通过一个模板实现打包出引用好js路径的html-----使用npm install html-webpack-plugin -D 插件