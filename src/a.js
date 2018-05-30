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