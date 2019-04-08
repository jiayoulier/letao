$(function() {
    // --1. 给注册按钮添加点击事件
    // --2.获取用户输入的信息
    // --3.对用户信息进行验证
    // --4.调用注册接口发送ajax请求 实现注册功能
    // -- 5.给出用户提示,告诉用户是否成功
    // -- 6.跳转登录页面

    $('#register_btn').on('click', function() {
        // -- 收集用户信息
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var confirmPwd = $('[name="confirmPwd"]').val();
        var vCode = $('[name="vCode"]').val();
        // console.log(username)
        // console.log(mobile)
        // console.log(password)
        // console.log(confirmPwd)
        // console.log(vCode)

        // -- 验证信息
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            beforeSend: function() {
                if(username.trim() == '') {
                    mui.toast('用户名不能为空');
                    return false;
                }
                var reg = /1\d{10}/;
                if(!reg.test(mobile)) {
                    mui.toast('请输入合法的十一位手机号');
                    return false;
                }
                if(password.trim() == '') {
                    mui.toast('密码不能为空');
                    return false;
                }
                if(password.trim() != confirmPwd.trim()) {
                    mui.toast('输入的密码不一致');
                    return false;
                }
               
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res); 立立  123456
                if(res.success) {
                    mui.toast('注册成功');
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 2000)
                }
            }
        })
    })

    // 获取认证码
    //--给认证码添加点击事件
    //--调用接口获取认证码
    // --将认证码输出到控制台
    $('.getCode').on('click', function() {
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            dataType: 'json',
            success: function(res) {
                console.log(res.vCode);
            }
        })
    })
})