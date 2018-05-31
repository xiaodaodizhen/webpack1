import "./a.less";
import "./c.less";
document.write('22222222222sssdddddddddd111111111111ddddddddddddddddddddd1');

if (module.hot) {
  // 这里实现 js html的热更新

  // ------------如果配置路径参数了，那只是允许 相对路径的文件的热更新
  // module.hot.accept('./a.js', () => {
  //   document.write('9999999999999999');
  // });

  //------------------ 如果没有配置路径，默认允许全部文件可以热更新
  module.hot.accept();


}

// -------------------同一模块（文件）被多次使用，---方法一：暴露全局变量

//-----------------  引入一次全局变量（jquery） 后就将全局变量（jquery） 暴露出去-----有了文件公共文件抽离会放弃这种写法
// import $ from 'jquery';
// import 'c.js';// 文件中使用暴露的juery，位置应该在引入的juery 后
// console.log($);

// -------------------同一模块（文件）被多次使用，---方法二：公共文件进行抽离

import "./gonggong"