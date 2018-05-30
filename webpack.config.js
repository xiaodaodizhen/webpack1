let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let WebpackServer = require('webpack-dev-server');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let extractCss = new ExtractTextWebpackPlugin('./css.css');
let extractLess = new ExtractTextWebpackPlugin('./less.css');
let purifyWebpack = require('purifycss-webpack');
let glob = require('glob');
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
  module: { // 对象模块处理，各种loader加载器 

    // 抽离样式文件，抽离出以link标签形式引入到文件-----------插件：extract-text-webpack-plugin@next  (不能使用当前版本，当前版本只是支持webpack3)

    rules: [
      // 方法一： 会抽离成一个样式文件，然后以link的形式引入到页面文件
      // {
      //   test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
      //     use: ['css-loader']
      //   })
      // },
      // {
      //   test: /\.less$/, use: ExtractTextWebpackPlugin.extract({
      //     use: ['css-loader', 'less-loader']
      //   })
      // },
      // {
      //   test: /\.(sass|scss)$/, use: ExtractTextWebpackPlugin.extract({
      //     use: ['css-loader', 'sass-loader']
      //   })
      // }

      // 方法二： 会抽离成多个样式文件，然后以link形式引入到页面
      {
        test: /\.css$/, use: extractCss.extract({
          use: ['css-loader', 'postcss-loader']  // postcss-loader 给不兼容的css 自动添加前缀，达到兼容效果( -webkit-transform: rotate(45deg);)，备注：需要配置postcss.config.js 
        })
      },
      {
        test: /\.less$/, use: extractLess.extract({
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(sass|scss)$/, use: extractLess.extract({
          use: ['css-loader', 'sass-loader']
        })
      }

      // 方法三： 回忆<style>标签的形式插入到页面中
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /.(sass|scss)/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },

  plugins: [ // 对应的插件


    // new ExtractTextWebpackPlugin('./css/index.css'),// 将所有的css样式抽离到index.css 文件中，备注：如果使用了css抽离功能，css-loader内置的热更新功能将会失效（原因是css抽离之后进入到了html中），解决方案在webpacke2文件项目中############
    extractCss,
    extractLess,

    new purifyWebpack({ // 删除多余的样式
      paths: glob.sync(path.join(__dirname, './src/*.html'))  // 全局同步查找html的路径范围
    }),

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
    hot: true,// 默认自动刷新，热更新， 还需配置一个HotModuleReplacementPlugin插件（webpack 自带的）,这样也只是能实现css的热更新（因为css-loader 自带这个功能）,实现js的热更新需要在 js文件中加入 module.hot.accept();
  },


  mode: "development" // 模式配置

};

