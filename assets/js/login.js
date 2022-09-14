
$('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link-login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})
// 从layui获取layer
var layer = layui.layer
// 从layui获取form
var form = layui.form
// 自定义验证规则
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位,且不能出现空格'
    ],
    repwd: function (value) {
        // value得到的是repasssword的值
        var pwd = $('#form-reg [name=password]').val()
        if (pwd !== value) {
            return '两次不一致'
        }
    }
})
// 监听注册表单
$('#form-reg').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
        if (res.status != 0) {
            return layer.msg(res.message);
        }
        console.log('注册成功');
        layer.msg('注册成功');
        $('#link-login').click()
    })
})
// 监听登录表单
var data = $('#form-login').serialize()
$('#form-login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'post',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登陆失败!')
            }
            layer.msg('登陆成功!')
            // 储存token
            localStorage.setItem('token', res.token)
            // 跳转页面
            // location.href = '/index.html'
        }
    })
})