$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $(function() {
        // 获取一级分类
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategory',
            dataType: 'json',
            success: function(res) {
                // console.log(res)
                var html = template('category_temp', res);
                // console.log(html);
                $('.links').html(html);
                
               if(res.rows.length > 0) {
                   var id = res.rows[0].id;
                   getSecondCategory(id);
                    $('.links a').first().addClass('active');
               }
            }
       })
    });

    $('.links').on('click', 'a', function() {
         //根据一级分类id 获取二级分类 (点击一级分类中的a标签)
        var id = $(this).data('categoryId');
        // console.log(id);
        $(this).addClass('active').siblings('a').removeClass('active');
        getSecondCategory(id); 
    });

      // 函数封装
      function getSecondCategory(id) {      
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dateType: 'json',
            success: function(res) {
                // console.log(res);
                var html = template('category2_temp', res);
                $('.brand_list').html(html);
            }
        })   
    }
})