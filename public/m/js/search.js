$(function() {

    // 用户第二次进入页面的时候可以看到搜索历史.所以先把关键字存储到localStorage中.并且用模板引擎吧关键字渲染到页面中.用户下次进来就可以看到了.
    var key = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : [];
    // console.log(key);
    var html = template('search_temp', {list: key});
    $('#list_search').html(html);
    // var txt = localStorage.getItem('txt') ? JSON.parse(localStorage.getItem('txt')) : [];
    // var keywords = "";

    $('#search-btn').on('click', function() {
        var keywords = $(this).siblings('input').val();
        // console.log(keywords);
        if(keywords.trim() == '') {
            mui.alert('请输入要搜索商品的关键字'); 
            return         
        } else {
            key.push(keywords);
            localStorage.setItem('key', JSON.stringify(key));
            location.href = 'search_result.html?key='+ keywords;  
        }
    })
    
    // 点击以前历史可以跳转到搜索结果
    $('#list_search').on('click', 'li', function() {
        var text = $(this).text(); 
        // txt.push(text);    
        // localStorage.setItem('txt', JSON.stringify(txt));
        location.href = 'search_result.html?key='+ text;
        // location.href = 'search_result.html?key='+ keywords;
    })

    // 清空历史记录
    $('.c_history').click(function() {
        // localStorage.removeItem('key');
        localStorage.clear();
        $('#list_search').html('');
        key = [];
    })
   

})