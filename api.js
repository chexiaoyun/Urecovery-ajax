/**
* ajax post提交  
* @param url  
* @param param  
* @param datat 为html,json,text  
* @param callback回调函数  
* @return  
*/
//var apiurl="http://recycle.91poweron.com/";
var apiurl="http://hs.dev/";
function jsonAjax(url, param, data, callback) {
    return $.ajax({  
        type: "post",  
        url: apiurl+url,  
        data: param,  
        dataType: data,  
        success: callback,  
        error: function () {  
            //alert("请求失败！");
        }  
    });  
}  
//获取验证码
var InterValObj; 
var count = 60; 
function sendMessage() {
    $("#btnSendCode").attr("disabled", "true");
    $("#btnSendCode").html("剩余" + count + "秒");
    InterValObj = window.setInterval(SetRemainTime, 1000);
};
function SetRemainTime() {   
    if (count == 0) {                
        window.clearInterval(InterValObj);       
        $("#btnSendCode").removeAttr("disabled");
        $("#btnSendCode").html("重新获取");
    }else {
        count--;
        $("#btnSendCode").html("剩余" + count + "秒");
    }
}
//时间戳
var timestamp = Math.round(new Date().getTime()/1000);
var token = localStorage.token; 
var sign = hex_md5("api_key=uzhi&token="+localStorage.token+"&timestamp="+timestamp);
var allparam = {timestamp:timestamp,token:localStorage.token,sign:sign};
//截取
var urlinfo = decodeURI(window.location.href);  
var len = urlinfo.length; 
var offset = urlinfo.indexOf("?"); 
var newsidinfo = urlinfo.substr(offset+1,len);
