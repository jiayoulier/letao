var userInfo = {};
$.ajax({
     type: 'get',
     url: '/user/queryUserMessage',
     // 因为ajax 是异步请求,所以改成同步的
     async: false,
     dataType: 'json',
     success: function(res) {
        //  console.log(res);
        if(res.error && res.error == 400) {
            location.href = 'login.html';
        }
        userInfo = res;
     }
})


$(function() {
    // ---退出登录
    // -给按钮添加点击事件
    // -调用退出登录接口退出登录
    // --登录成功回到首页

    $('#logout_btn').on('click', function() {
        $.ajax({
            type: 'get',
            url: '/user/logout',
            data: {},
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    mui.toast('退出成功');
                    setTimeout(function() {
                        location.href = 'index.html';
                    }, 1000)
                }
            }

        })
    })

  // 获取用户信息.并且处理用户未登录的问题
    var html = template('member_temp', userInfo);
    $('#userInfo').html(html);
  

})