$(function() {


    var editParam = parseInt(getParamByUrl(location.href, 'isEdit'));
    // console.log(editParam);
    if(editParam) {
        if(localStorage.getItem('address')) {
            var item = JSON.parse(localStorage.getItem('address'));
            // console.log(item);
            var html = template('editAddress_temp', item);
            // console.log(html);
            $('#form_info').html(html);
        }
    }else {
        // alert(123)
        var html = template('editAddress_temp', {});
        // console.log(html);
        $('#form_info').html(html);
    }

    // 创建picker选择器
    var picker = new mui.PopPicker({
        layer: 3
    });

    // 给picker对象添加数据
    picker.setData(cityData);

    // 显示数据
    $('[name="city"]').on('tap',function() {
        picker.show(function(selectIetms) {
            // console.log(selectIetms);
            $('[name="city"]').val(selectIetms[0].text + selectIetms[1].text + selectIetms[2].text);
        });
    })
   
    // 添加收货地址
    // -- 获取按钮添加点击事件
    // 收集用户数据信息
    // 对用户表单信息进行验证
    // 调用接口完成添加
    // 添加成功后跳转到收货地址列表页面
    $('#confirm_address').on('click', function() {
        var recipient = $('[name="recipient"]').val();
        var address = $('[name="city"]').val();
        var addressDetail = $('[name="particular"]').val();
        var postcode = $('[name="postcode"]').val();

        var data = {
            address: address,
            addressDetail: addressDetail,
            recipients: recipient,
            postcode: postcode
        }
    
        if(editParam) {
           var  url = '/address/updateAddress';
           data.id = item.id;
        } else {
            var url = '/address/addAddress';
        }
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            beforeSend: function() {
                if(recipient.trim() == '') {
                    mui.toast('用户名不能为空');
                    return false;
                }
                if(address.trim() == '') {
                    mui.toast('地址错误');
                    return false;
                }
                if(addressDetail.trim() == '') {
                    mui.toast('地址不能为空');
                    return false;
                }
                if(postcode.trim() == '') {
                    mui.toast('编码不能为空');
                    return false;
                }
            },
            success: function(res) {
                // console.log(res)
                if(res.success) {
                    if(editParam) {
                        mui.toast('地址修改成功');
                    } else {
                        mui.toast('地址添加成功');
                    }
                    setTimeout(function() {
                        location.href = 'shipAddress.html';
                    }, 1000)
                }
            }
        })
    })

    function getParamByUrl(url, name) {
        // console.log(url)
        var str = url.substr(url.indexOf('?')+1);
        var arr = str.split('&');
        // console.log(arr);
        // arr.forEach(function(value, index) {
        //     var arr2 = value.split('=');
        //     // console.log(array);
        //     // console.log(array[0]);
        //     //  console.log(array[1]);
        //     if(arr2[0] == name) {
        //         return arr2[1];
        //     }
        // })
        // return null;
        for(var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if(arr2[0] == name) {
                return arr2[1];
            }
        }
        return null;
    }
  


    


})