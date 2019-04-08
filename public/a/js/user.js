$(function() {
    
    // 查询用户
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: 1,
            pageSize: 10
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res)
            var html = template('userTemp', res);
            // console.log(html);
            $('#userInfo').html(html);
        }
    })

    // 更新用户状态

    // 获取操作按钮  添加点击事件
    // 判断当前状态是启用还是禁用
    // 根据当前的操作 调用接口 传递不同的参数
    // 刷新页面

    $('#userInfo').on('click', '#editBtn', function() {
        // var that = $(this);
        var isDelete = parseInt($(this).data('isDelete'));
        // console.log(isDelete);
        var id = parseInt($(this).data('id'));
        // console.log(id);
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    location.reload();
                   
                    // if(that.text() == '启用') {
                    //     that.text('禁用');
                    //     that.parent().prev().text('已启用');                       

                    // } else {
                    //     that.text('启用');
                    //     that.parent().prev().text('已禁用');                      
                    // }

                }
            }
        })

    })

})