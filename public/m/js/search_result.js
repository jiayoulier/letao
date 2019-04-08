$(function() {
    // 1--获取地址栏的参数
    // 2--用关键字调取搜索接口
    // 3--将搜索结果展示在页面中
   
    

   


   
     var keywords = parseInt(getParamByUrl(location.href, 'key'));
    //  console.log(typeof keywords);
    //  var txt  = getParamByUrl(location.href, 'txt');
     var html = "";
     var page = 1;
     var pageSize = 3;
     var priceSort = 1;
     var numSort = 1;
     var that = null;
    // console.log(r)


   
    mui.init({
        pullRefresh : {
          container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback : getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

      // 点击价格按钮升序降序价格
      $('#priceSort').on('tap', function() {
          priceSort = priceSort == 1 ? 2 : 1;
          html = "";
          page = 1;
          mui('#refreshContainer').pullRefresh().refresh(true);
          getData();
      })
      //点击销量按钮进行排序(假设库存少说明销量好)
      $('#product_sales').on('tap', function() {
        numSort = numSort == 1 ? 2 : 1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
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
    function getData() {
        // console.log(this);
        // var that = this
        if(!that) {
            that = this;
        }
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                page: page++,
                pageSize: pageSize,
                // proName: keywords || txt,
                proName: keywords,
                price: priceSort,
                num: numSort
            },
            dataType: 'json',
            success: function(res) {
                if (res.data.length > 0) {
                    // console.log(res);
                    html += template('product1_temp', res);
                    $('#product_list').html(html);
 
                    that.endPullupToRefresh(false);
                } else {
                    that.endPullupToRefresh(true);
                }
                
            }
        })
    }
})