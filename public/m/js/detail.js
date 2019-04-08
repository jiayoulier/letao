$(function() {

    var num = 0;
    var size = null;
    var productId = 0;
    var id = parseInt(getParamByUrl(location.href, 'id'));
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        dataType:'json',
        success: function(res) {
            // console.log(res);
            num = res.num;
            // console.log(num);
            productId = res.id;
            // console.log(productId)
            var html = template('detail_temp', res);
            $('.mui-content').prepend(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })

    $('.mui-content').on('tap', '.product_size span', function(){
        $(this).addClass('active').siblings('span').removeClass('active');
        size = $(this).text();
        // console.log(size);
    })
    $('.mui-content').on('tap', '#num_reduce', function() {
        var number = $(this).siblings('input').val();
        // console.log(num);
        if(number > 0) {
            $(this).siblings('input').val(--number);            
        } else {
            return;
        }
        
    })
    $('.mui-content').on('tap', '#num_increase', function() {
        var number = $(this).siblings('input').val();
        if(number < num) {
            $(this).siblings('input').val(++number);    
        } else {
            return;
        }
    })

    // --加入购物车

    // 加入购物车并添加点击事件
    // 判断用户是否选择尺码
    // 调用加入购物车接口
    // 提醒用户加入购物车成功 是否跳转到购物车页面

    $('#addCart').on('tap', function() {
        
        if(!size) {
            mui.toast('请选择尺码');
            return;
        } else {
            $.ajax({
                type: 'post',
                url: '/cart/addCart',
                data: {
                    productId: productId,
                    num: num,
                    size: size
                },
                dataType: 'json',
                success: function(res) {
                    // console.log(res);
                    if(res.success) {
                        mui.confirm('是否添加到购物车?','温馨提示', function(message) {
                            // console.log(message);
                            if(message.index) {
                                mui.toast('添加购物车成功');
                                setTimeout(function() {
                                    location.href = 'cart.html';
                                },2000);
                            }
                        })
                    }
                }
            })
        }
        
        
    })

    $('#lookCart').on('tap', function() {
        location.href = 'cart.html';
    })


    function getParamByUrl(url, name) {
        var num = url.indexOf('?') + 1;
        var str = url.substr(num);
        var arr = str.split('&');
        for(var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if(arr2[0] == name){
                return arr2[1];
            }
        }
        return null;
    }
})