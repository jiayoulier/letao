$(function() {


    var page = 1;
    var pageSize = 10;

    // 商品的列表数据获取并展示在页面中

    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: {
            page: page,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            var html = template('product_temp', res);
            // console.log(html);
            $('#product_info').append(html);
        }

    })

    // 添加商品 

    // 1.获取二级分类并展示在选择框中
    //2.实现图片上传
    // 3.实现添加商品

    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 50
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            var html = template('productName_temp', res);
            // console.log(html);
            $('#product_name').html(html);
        }
    })

    var imageArr = [];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            console.log(data.result.picAddr);
            imageArr.push(data.result);
        }
    })


    // 添加商品
    $('#addProduct').on('click', function() {
        
        var brandId = $('[name="brandId"]').val();
        var proName = $('[name="proName"]').val();
        var oldPrice = $('[name="pro_oldPrice"]').val();
        var price = $('[name="price"]').val();
        var proDesc = $('[name="proDesc"]').val();
        var size = $('[name="proSize"]').val();
        var num = $('[name="proNum"]').val();


        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: {
                brandId: brandId,
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                pic: imageArr
            },
            beforeSend: function() {
                if(proName.trim() == '') {
                    alert('不能为空');
                    return false;
                }
                if(oldPrice.trim() == '') {
                    alert('不能为空');
                    return false;
                }
                if(price.trim() == '') {
                    alert('不能为空');
                    return false;
                }
                if(proDesc.trim() == '') {
                    alert('不能为空');
                    return false;
                }
                if(size.trim() == '') {
                    alert('不能为空');
                    return false;
                }
                if(num.trim() == '') {
                    alert('不能为空');
                    return false;
                }
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    location.reload();
                } else {
                    alert(res.message);
                }
            }
        })

    })

})