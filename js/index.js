document.write('<script src="js/pull.min.js"><\/script>');
document.write('<script src="js/md5.js"><\/script>');
document.write('<script src="api.js"><\/script>');
// 刷新加载
var $listWrapper = $('#listWrapper');
var total=1;
var pullInstance = new Pull($listWrapper, {
    scrollArea: $('#main'),
	autoLoad: false, // 自动加载，加载完成立即判断是否触发加载 默认 true
    // threshold: 100, // 滚动至底部多少距离触发onPullUp。默认 100，单位px
    onPullUp: function () {
        setTimeout(function () {
            // pullInstance.pullUpSuccess();
            // pullInstance.pullUpFailed();
            // pullInstance.pullUpDone();
            Math.round(Math.random() + 0.2) ? handlePullUpSuccess() : handlePullUpFailed();
        }, 1000);
    },

    // 下拉刷新回调方法，如果不存在该方法，则不加载下拉dom
    onPullDown: function () {
        setTimeout(function () {
            Math.round(Math.random() + 0.2) ? handlePullDownSuccess() : handlePullDownFailed();
        }, 1000);
    },

    pullUpText: {
        start: '点击加载更多', // 上拉加载前的文本。默认 上拉加载更多
        loading: '加载中', // 上拉加载中文本。默认 正在加载
        // failed: '失败了，点我再试试', // 上拉加载失败文本，加载失败时，点击触发onPullUp重新加载。默认 加载失败，点击重试
        // done: '加载完成，不会再加载了' // 加载完成文本。默认 已全部加载
    },
});
var pullDownTotal = 0,
    pullUpTotal = 0;

// 创建li dom
function createList(str) {
    return '<li><div class="u-header-wraplist u-flex"><div class="u-header-leftlist u-flex"><div class="u-leftlist-top u-flex u-range"><span>UPS电源&nbsp;&nbsp;100台</span><i class="u-flex u-center">个人</i></div><div class="u-leftlist-time u-flex u-range"><i class="u-flex u-center">距结束</i><span>0天0小时0分0秒</span></div></li>';
}

// 处理下拉刷新成功
function handlePullDownSuccess() {
    var count = 4;
    var htmlArr = [];
	var str = ''
    while(count){
        count--;
        htmlArr.unshift(createList('item pullDown ' + pullDownTotal));
        pullDownTotal++;
    }

    $listWrapper.prepend($(htmlArr.join('')));

    pullInstance.pullDownSuccess();
    
}

// 处理下拉刷新失败
function handlePullDownFailed() {
    pullInstance.pullDownFailed();
}

// 处理上拉加载成功
function handlePullUpSuccess() {
    var count = 4,
        htmlArr = [];

    while(count){
        count--;
        htmlArr.push(createList('item pullUp ' + pullUpTotal));
        pullUpTotal++;
    }

    $listWrapper.append(htmlArr.join(''));
	
    // 超过20条即加载完成
    if(pullUpTotal >= 20){
        pullInstance.pullUpDone();
    }else{
        pullInstance.pullUpSuccess();
    	page = total++;
		//console.log(page);
    }
    
    var name_id = $('.u-nav-ul li.u-active').index()+1;
	var param = {name_id:name_id,page:page};
	jsonAjax(
		"api/good/index",
		param,
		"json",
		function(data){
			alert("加载成功！");
		}
	);
}

// 处理上拉加载失败
function handlePullUpFailed() {
    pullInstance.pullUpFailed();
}