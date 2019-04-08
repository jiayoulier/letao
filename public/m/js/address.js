$(function() {

    var address = [];
    // 发送ajax请求获取收货地址列表并且展示在页面中
    $.ajax({
        type: 'get',
        url: '/address/queryAddress',
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            address = res;
            var html = template('shipAddress_temp', {address: res});
            $('#address_ship').html(html);
        }
    })



    // 删除收货地址

    // 给删除按钮添加点击事件
    // 弹出一个确认删除框
    // 如果用户点击确认删除
    // 调用删除收货地址的接口 完成删除功能
    // 刷新当前页面
    $('#address_ship').on('tap', '.mui-btn-red',  function() {
        var id = $(this).data('id');
        // console.log(id)
        // var li = $(this).parent().parent();
        var li = this.parentNode.parentNode;
        // console.log(li);
        mui.confirm('确认要删除吗?', function(message) {
            // console.log(message);
           
            if(message.index == 1) {
                // 删除成功
                $.ajax({
                    type: 'post',
                    url: '/address/deleteAddress',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        if(res.success) {
                            location.reload();
                        }
                    }
                })
            } else {
                // 失败 关闭滑动效果
                // 只能传入DOM元素
                mui.swipeoutClose(li);
            }
        });
    })

    // 编辑收货地址
    
    //--给编辑按钮添加点击事件
    //--跳转到添加地址管理页面(并且把数据传过来)
    // ---将数据展示在页面中
    // --给确定按钮添加点击事件
    // --调用接口执行编辑操作
    // --跳回收货地址管理页面
    $('#address_ship').on('tap', '.mui-btn-blue', function() {
        
        var id = $(this).data('id');

        address.forEach(function(value, index) {
            if(value.id == id) {
                var value = JSON.stringify(value);
                // console.log(value);
                localStorage.setItem('address', value);
            }
        })
        location.href = 'addAddress.html?isEdit=1';
        // console.log(address);
        // console.log(id);
    })

})