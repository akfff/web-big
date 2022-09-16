var form = layui.form
var layer = layui.layer
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称不能大于6'
        }
    }
})
initUserInfo()

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // console.log(res)
            // 调用 form.val() 快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}
// 重置
$('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
})
// 监听提交事件
$('.layui-form').on('click', function (e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            } layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
            // $('.layui-form')[0].reset()
        }
    })
})