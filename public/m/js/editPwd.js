$(function() {

    // -- 修改密码
    // 添加点击事件
    // 收集用户的表单信息
    // 对用户输入密码进行验证
    // 调用修改密码接口.实现修改密码功能
    // 修改成功跳转到登录页面

    $('#confirm_btn').on('tap', function() {
        var oldPwd = $('[name="oldPwd"]').val();
        var newPwd = $('[name="newPwd"]').val();
        var conNewPwd = $('[name="newPwd"]').val();
        var vCode = $('[name="vCode"]').val();

        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword: oldPwd,
                newPassword: newPwd,
                vCode: vCode
            },
            beforeSend: function() {
                if(oldPwd.trim() == '') {
                    mui.toast('密码不能为空');
                    return false;
                }
                if(newPwd.trim() == '') {
                    mui.toast('密码不能为空');
                    return false;
                }
                if(conNewPwd.trim() != newPwd.trim()) {
                    mui.toast('两次输入的密码不一致');
                    return false;
                }
                if(vCode.trim() == '') {
                    mui.toast('验证码错误');
                    return false;
                }
            },
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    mui.toast('修改密码成功');
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 2000)
                }
            }
        })
    })


    $('.edit_getCode').on('tap',function() {
        $.ajax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            dataType: 'json',
            success: function(res) {
                // 将修改密码的认证码输出到控制台
                console.log(res.vCode);
            }
        })
    })
})