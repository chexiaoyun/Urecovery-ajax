document.write('<script src="../js/pull.min.js"><\/script>');
document.write('<script src="../js/md5.js"><\/script>');
document.write('<script src="../api.js"><\/script>');
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

    pullUpText: {
        start: '点击加载更多', // 上拉加载前的文本。默认 上拉加载更多
        loading: '加载中', // 上拉加载中文本。默认 正在加载
    },
});
var pullDownTotal = 0,
    pullUpTotal = 0;

// 创建li dom
function createList(str) {
	return str;
}

// 处理上拉加载成功
function handlePullUpSuccess() {
    var count = 4,
        htmlArr = [];

    while(count){
        count--;
        htmlArr.push(createList());
        pullUpTotal++;
    }

    //$listWrapper.append(htmlArr.join(''));
	
    // 超过20条即加载完成
    if(pullUpTotal >= 20){
        pullInstance.pullUpDone();
    }else{
        pullInstance.pullUpSuccess();
    	page = total++;
		//console.log(page);
    }
    
	loading();
}

// 处理上拉加载失败
function handlePullUpFailed() {
    pullInstance.pullUpFailed();
};

//发布-跳转详情页
function jumpUrl(){
	var li = $('.u-relase-list li');
	var sum = li.length;
	for(var i=0;i<sum;i++){
		var goods_id = li.eq(i).attr('id');
		li.eq(i).find("a").attr("href","battery-detail.html?goods_id="+goods_id);
		
	}
}
//竞价-跳转详情页
function biddingUrl(){
	var li = $('.u-relase-list li');
	var sum = li.length;
	for(var i=0;i<sum;i++){
		var bidding_id = li.eq(i).attr('id');
		li.eq(i).find("a").attr("href","nobattery-details.html?bidding_id="+bidding_id);
		
	}
}
