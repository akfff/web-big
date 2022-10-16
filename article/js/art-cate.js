// const { format } = require("mysql")

var layer = layui.layer
var form = layui.form
initArtCateList()
// 获取列表数据
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res)
            var htmlStr = template('tpl-table', res)
            // console.log(htmlStr);
            $('tbody').html(htmlStr)
        }
    })
}

var indexAdd = null
$('#btnAddCate').on('click', function () {
    // 添加弹出层
    indexAdd = layer.open({
        // 类型
        type: 1,
        title: '添加文章分类',
        content: $("#dialong-add").html(),
        // 宽高
        area: ['500px', '300px']
    });
})
// 代理
$('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        // 拿到表单的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('新增分类失败！')
            }
            initArtCateList()
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
        }
    })
})

var indexEdit = null
$('tbody').on('click', '.btn-edit', function (e) {
    // 弹出修改文章分类层
    indexEdit = layer.open({
        // 类型
        type: 1,
        title: '修改文章分类',
        content: $("#dialong-edit").html(),
        // 宽高
        area: ['500px', '300px']
    });
    var id = $(this).attr('data-id')
    // console.log(id);
    // 发请求获取数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            // console.log(res);
            // 填充数据
            form.val('form-edit', res.data)
        }
    });
    // 代理修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            // 拿到表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败！')
                }
                initArtCateList()
                layer.msg('修改分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexEdit)
            }
        })
    })
})

var indexDelete = null
$('tbody').on('click', '.btn-delete', function (e) {
    var id = $(this).attr('data-id')
    // 弹出删除文章分类层
    layer.confirm('是否删除?', { icon: 3, title: '提示' },
        function (index) {
            //do something
            // 发请求获取数据
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            });

        });
})