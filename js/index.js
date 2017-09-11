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
}


//估价
function valUrl(){
	var li = $('.u-header-list li');
	var sum = li.length;
	for(var i=0;i<sum;i++){
		var goods_id = li.eq(i).attr('id');
		li.eq(i).find(".u-rightlist-assess").attr("href","personal/part-valuation.html?goods_id="+goods_id);
	}
};
//竞价
function bidUrl(){
	var li = $('.u-header-list li');
	var num = li.length;
	console.log(num)
	for(var i=0;i<num;i++){
		var goods_id = li.eq(i).attr('id');
		li.eq(i).find(".u-rightlist-bidding").attr("href","personal/part-badding.html?goods_id="+goods_id);
	}
};
//侧滑
function shown(){
	var param = allparam;
	$.ajax({
		type:'post',
		url:apiurl+'api/user/getuserinfo',
		data:param,
		dataType:"json",
		success:function(data){
			if( data.flag ){
				$('.u-sideslip').show();
			}else{
				alert("您还未登录！")
				location.href = "login/login.html";
			}
		}
	});
};
function hide(){
	$('.u-sideslip').hide();
};
function Authenticate(){
	window.location.href="personal/not-certified.html";
}
//切换
function change(){
	$('#allmap').hide();
	$('#main').show();
	$('.u-all').hide();
	$('.u-mmap').show();
	$('.u-refresh').hide();
};
function rechange(){
	$('#main').hide();
	$('#allmap').show();
	$('.u-mmap').hide();
	$('.u-all').show();
	$('.u-refresh').show();
};
//刷新
$('.u-refresh').click(function(){
	location.reload();	
});
//免费发布
function publishUrl(){
	var param = allparam;
	$.ajax({
		type:'post',
		url:apiurl+'api/user/getuserinfo',
		data:param,
		dataType:"json",
		success:function(data){
			if( data.flag ){
				location.href = 'publish-require.html';
			}else{
				alert('您还未登录！');
			}
		}
	});
};