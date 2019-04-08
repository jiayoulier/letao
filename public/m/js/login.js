$(function() {
    // --页面功能
    // 1--获取登录按钮,添加点击事件
    // 2-获取用户的登录信息
    //3.调用登录接口比对信息
    //4.登陆成功后跳转到会员中心页面

    $('#login_btn').on('click', function() {
        // 收集信息
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                if(username.trim() == '') {
                    mui.toast('密码不能为空');
                    return false;
                }
                if(password.trim() == "") {
                    mui.toast('密码不能为空');
                    return false;
                }
                $('#login_btn').html('正在登录...');
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    mui.toast('登录成功');
                    $('#login_btn').html('登录');
                    setTimeout(function() {
                        location.href = 'member.html';
                    },2000)
                }
            }
        })
    })

})