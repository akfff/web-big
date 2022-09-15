$(function () {
    getUserInfo()
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            rederAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }

        // }
    })
}
// 渲染头像
function rederAvatar(user) {
    // 获取用户名字
    var name = user.nickname || user.username
    // 渲染欢迎文字
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 图片头像渲染
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文字头像渲染
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
var layer = layui.layer
$('#btnLogout').on('click', function () {
    //eg1
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        //    清空token
        localStorage.removeItem('token')
        // 跳转到login
        location.href = '/login.html'

        layer.close(index);
    });

})