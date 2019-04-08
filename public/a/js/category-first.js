$(function() {

    var page = 1;
    var pageSize = 5;
    var maxPage = 0;
    // 获取一级分类数据

    // --发送ajax 请求

    getData();

    $('#next').on('click', function() {
        page++;

        if(page > maxPage) {
            page = maxPage;
            alert('这是最后一页了!');
            return;
        }
        getData();
    })

    $('#prev').on('click', function() {
        page--;

        if(page < 1) {
            page = 1;
            alert('这是第一页');
            return;
        }
        getData();
    })
    function getData() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                maxPage = Math.ceil(res.total / pageSize);
                var html = template('first_temp', res);
                // console.log(html);
                $('.table-bordered').html(html);
            }
        })
    }


    // 添加一级分类

    // 获取保存按钮添加点击事件
    // 获取文本框内的值并验证
    // 调用接口添加分类完成添加
    // 刷新页面

    $('#save').on('click', function() {
        
        var categoryName = $('.form-control').val();
        // console.log(categoryName);
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: {
                categoryName: categoryName
            },
            beforeSend: function() {
                if(categoryName.trim() == '') {
                    alert('不能为空');
                    return false;
                }
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })
    })

})