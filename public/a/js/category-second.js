$(function() {

    var page = 1;
    var pageSize = 2;
    var maxPage = 0;


    $('#nextBtn').on('click', function() {

        page++;
        if(page > maxPage) {
            page = maxPage;
            alert('这是最后一页啦!');
            return;
        }
        getData();

    })

    $('#prevBtn').on('click', function() {
        page--;
        if(page < 1) {
            page = 1;
            alert('这是第一页啦!');
            return;
        }
        getData();
    })
    // 获取二级分类数据并展示在页面上

    getData();

    function getData() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                maxPage = Math.ceil(res.total / pageSize);
                var html = template('second_temp', res);
                $('.table-bordered').html(html);
    
            }
    
        })
    }

    // 添加二级分类

    //获取一级分类的数据并显示在选择框内
    // 图片文件上传
    // 获取保存按钮添加点击事件
    //调用接口 实现二级分类数据添加

    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 30
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            var html = template('categoryId', res);
            $('#categoryInfo').html(html);
        }
    })

    var brandLogo = '';
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data);
            // console.log(data.result.picAddr);

            brandLogo = data.result.picAddr;
            // 上传图片预览
            $('#preview').attr('src', data.result.picAddr);
        }
    })

    // 实现二级分类的添加
    $('#save').on('click', function() {
        var categoryId = $('[name="categoryId"]').val();
        var brandName = $('[name="brandName"]').val();

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: {
                categoryId: categoryId,
                brandName: brandName,
                brandLogo: brandLogo,
                hot: 0
            },
            beforeSend: function() {
                if(brandName.trim() == '') {
                    alert('名称不能为空!') ;
                    return false;
                }
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })

    })
})