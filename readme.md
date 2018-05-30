## 依赖
- 标识项目依赖 --save 上线开发都需要
-  --save-dev    ||   -D  开发依赖，只有开发用 

## 安装
```
npm install webpack webpack-cli -D   (开发用)

 ```

 ## webpack 可以0配置，功能很弱。
- 打包工具，优化代码，模块化

## npx 的使用，必须要求node8.5+
- npx 文件名     就会到node-modules 里找到然后执行，如果没有安装会自动安装

## 配置执行的文件，在package.json 中
-   "scripts": {
         "build": "webpack"
    },


## 插件:实现html 打包功能，可以通过一个模板实现打包出引用好js路径的html
- npm install html-webpack-plugin -D

## 插件 ： 清空打包以输出文件

- npm install clean-webpack-plugin -D

## 插件 ： 配置开发服务器

- npm install webpack-dev-server -D

## loader 加载器

- npm install style-loader css-loader -D
- npm install less less-loader node-sass sass-loader -D


- npm install postcss-loader autoprefixer -D   给css加前缀，达到各个浏览器内核兼容

- npm install purifycss-webpack purify-css glob -D    glob 插件是为了全局搜索   purifycss-webpack 删除多余未用的css less样式，依赖于purify-css插件