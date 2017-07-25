$(function(){
	//登录方式的切换
	$('.u-loginmode li').click(function(){
		$(this).addClass('u-active').siblings('li').removeClass('u-active');
		$(this).parent().siblings('form').eq($(this).index()).show().siblings('form').hide();
	});
	
	//勾选按钮
	$('.u-apply-agree').click(function(){
		$(this).find('.u-apply-select').toggleClass('u-apply-accede');
		$(this).find('.u-apply-select').toggleClass('u-apply-dissent');
	});
	
	//竞拍时长
	$('.u-bidding-num .u-reduce').click(function(){
		var num = parseInt( $(this).next("input").val() );
		if(num>1){
			num--;
		};
		$(this).next("input").val(num);
	});
	$('.u-bidding-num .u-add').click(function(){
		var num = parseInt( $(this).prev("input").val() );
		num++;
		$(this).prev("input").val(num);
	});
	
	//服务方式,交易模式
	$(".u-publish-service li").click(function(){
		$(this).addClass('u-active').siblings('li').removeClass('u-active');
	});
	
	//完善信息
	$('.u-publish-show').click(function(){
		var text=$(this).find('span').text();
		if(text=='展开完善信息'){
			$(this).find('span').text('收起更多信息');
		}else{
			$(this).find('span').text('展开完善信息');
		};
		$(this).find('img').toggleClass('u-rotate');
		$('.u-publish-more').slideToggle();
	});
	
	//选择资源品类
	$('.u-publish-click').click(function(){
		$('.u-type-mask').show();
	});
	$('.u-type-mask').click(function(){
		$('.u-type-mask').hide();
	});
	$('.u-type-classify ul li').click(function(){
		$(this).addClass('u-active').siblings().removeClass('u-active');
		$(this).find('img').show();
		$(this).siblings().find('img').hide();
		$('.u-type-mask').hide();
		$('.u-publish-click .u-type-left input').val($(this).text());
	});
	
	//领取红包
//	$('.u-publish-btn').click(function(){
//		$('.u-red-mask').show();
//	});
//	$('.u-empty').click(function(){
//		$('.u-red-mask').hide();
//	});
	
	//交投
	$('.u-battery-btn').click(function(){
		$(this).toggleClass('u-bgcolor').toggleClass('u-bgray');
		$(this).parent('li').siblings('li').find('.u-battery-btn').removeClass('u-bgray').addClass('u-bgcolor');
	});
	
	//查看更多
	$('.u-battery-more').click(function(){
		$('.u-battery-detail').toggleClass('u-battery-hide').toggleClass('u-battery-show');
	});
	
	//立即认证
	$('.u-current-wrapper .u-confirm').click(function(){
		$('.u-mask').show();
	});
	
	//图片放大
	$('.u-battery-img li').click(function(){
		var imgsrc = $(this).find('img').attr('src');
		$('.u-photo-mask').show();
		$('.u-photo-shell img').attr('src',imgsrc);	
	});
	$('.u-photo-mask').click(function(){
		$(this).hide();
	});
	    
});


new function () {
    var _self = this;
    _self.width = 750;
    _self.fontSize = 100;
    _self.widthProportion = function () {
        var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
        return p > 1 ? 1 : p < 0.5 ? 0.5 : p;
    };
    _self.changePage = function () {
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px");
    }
    _self.changePage();
    window.addEventListener('resize', function () {
        _self.changePage();
    }, false);
};


document.addEventListener("plusready", function() {
    // 注册返回按键事件
    plus.key.addEventListener('backbutton', function() {
        // 事件处理
        window.history.back();
    }, false);
});