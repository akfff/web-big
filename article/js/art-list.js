var layer = layui.layer
var form = layui.form
var laypage = layui.laypage;
var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}
inittable()
initCate()
function inittable() {
    $.ajax({
        method: 'get',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取列表失败')
            }
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
            // 调用渲染分页方法
            renderPage(res.total)
        }
    })
}
// 文章分类
function initCate() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取分类数据失败')
            }
            // 调模板引擎渲染结构
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 通知layui重新渲染表单结构
            form.render()
        }
    })
}
//  为筛选表单绑定submit事件
$('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取表单选中的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 为q赋值
    q.cate_id = cate_id
    q.state = state
    // 重新渲染表格数据
    inittable()
})
// 渲染分页
function renderPage(total) {
    laypage.render({
        // id
        elem: 'pageBox',
        // 总条数
        count: total,
        // 一页几条
        limit: q.pagesize,
        // 默认选中页数
        curr: q.pagenum
    });
}
