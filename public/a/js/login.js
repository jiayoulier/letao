// 判断是否登录 , 登录过关闭网页再进登录页面,还是会员页面
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    async: false,
    dataType: 'json',
    success: function(res) {
        // console.log(res);
        if(res.success) {
            location.href = 'user.html';
        }
    }
})




$(function() {
    


    // 登录 

    // 给登录按钮添加点击事件
    // -- 收集数据
    // --对数据进行验证
    // 调用接口实现登录功能
    // 登录成功跳转到用户管理页面

    $('.login-form').on('click', '.btn-primary', function(e) {

        // 搜集数据
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        // console.log(username);
        // console.log(password);
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                if(username.trim() == '') {
                    alert('用户名不能为空');
                    return false;
                }
                if(password.trim() == '') {
                    alert('密码不能为空');
                    return false;
                }
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    alert('登录成功');
                    setTimeout(function() {
                        location.href = 'user.html';
                    }, 2000)
                } else {
                    alert(res.message);
                }
            }
        })

        e.preventDefault();
    })

})