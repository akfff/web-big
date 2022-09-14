// 调用$.post $.get $.ajax都会先调用ajaxPrefilter这个函数
// 里面可以拿到ajax的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})