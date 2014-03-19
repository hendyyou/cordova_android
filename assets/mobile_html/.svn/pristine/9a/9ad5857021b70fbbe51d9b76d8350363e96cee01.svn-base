//页面入口函数
function executeAccess(pageId,hasFooter,stfun,stPull){
	var jq = $("#"+pageId);
	jq[0].hasFooter = hasFooter;
	jq[0].stPull = stPull;
	jq.off("pageshow").on("pageshow",(function(fun){
		return function(){
			if(!this.isCache){
				fun.apply(this,arguments);
				//防止"返回上一页"刷新页面
				this.isCache = true;
			}
		}												   	
	})(stfun));
	jq.off("pagebeforeshow").on("pagebeforeshow",function(){
		if(this.hasFooter){
			//载人尾部导航
			var html = config_footerHTML;
			var id = $.trim($(this).attr("footer-focus"));
			if(id != "")html = html.replace('footer-focus="'+id+'"','class="cur"');
			$(this).append(html);
		}
		//添加更多按钮	
		var content = $("div[data-role='content']",this);
		if(stPull && !$(".more-list-button",content)[0]){
			content.append('<div class="more-list-button" align="center" style="background-color:#FFFFFF;color:#C9C9C9;height:50px;line-height:50px;font-size:14px;font-weight:bold;cursor:pointer;">点击查看更多</div>');
			$(".more-list-button",content).unbind("tap").bind("tap",(function(fun){
				return function(){
					fun.apply(this,arguments);
					return false;
				}												   	
			})(stPull.onPullUp));
		}
		//渲染页面
		jqmRefresh(this);
	});
}
//重新渲染id里面的元素
function jqmRefresh(id){
	var dom = null;
	if(id && id.nodeType && id.nodeType==1)dom = id;
	else dom = $('#'+id)[0];
	if(!dom)return;
	var jq = $(dom);
	if(dom.dataset && dom.dataset['role']){
		var data = dom.dataset['role'];	
		if(data == "page")jq.trigger("pagecreate");
		else if(data == "listview")jq.listview('refresh');
		else if(data == "collapsible-set")jq.collapsibleset("refresh");
		else jq.trigger("create");
	}else{
		var nodeName = dom.nodeName.toLowerCase();
		if(nodeName == "select")jq.selectmenu("refresh");
		else if(nodeName == "input" && (dom.type.toLowerCase() =="radio" || dom.type.toLowerCase() =="checkbox"))jq.checkboxradio("refresh");
		else jq.trigger("create");
	}
	//图片自适应
	var stImg = $("img",dom);
	for(var i =0,length = stImg.length; i < length; i++){
		var img = stImg[i];
		var sSrc = $.trim(img.src);
		var width = parseInt(img.style.width);
		var height = parseInt(img.style.height);
		if(sSrc == "" || isNaN(width) || width <= 0 || isNaN(height) || height <=0)continue;
		var imgTemp=new Image();
		imgTemp.src=sSrc;
		var iWidth=imgTemp.width;
		var iHeight=imgTemp.height;
		var sStyle='';
		if((iWidth/width)>(iHeight/height))sStyle='width:'+width+'px;height:auto;';
		else sStyle='width:auto;height:'+height+'px;font-size:12px;';
		$(img).attr("style",sStyle);
	}
	//刷新pull列表
	var st = dom.id.split('_');
	if(st){
		var stTemp =[];
		var stPage = null;
		for(var i =0,length = st.length; i < length; i++){ 
			stTemp.push(st[i]);
			var isPageId = stTemp.join('_');
			stPage = $("#"+isPageId)[0];
			if(stPage)break;
		}
		var isPageId = st.join('_');
		var stJq = $("div[data-role='content']",stPage);
		if(stJq[0] && stJq.attr("data-iscroll")){
			setTimeout(function(){
				stJq.iscrollview("refresh");
			},100);
		}
	}
	//注册单击,href事件
	var stDom = $("a,input[type='button']",dom);
	for(var i =0,length = stDom.length; i < length; i++){
		var sHref = stDom[i].href+"";
		var stFun = stDom[i].onclick;
		var sType = typeof(stFun)+"";
		sType = $.trim(sType.toString());
		if(sType == "function"){
			stDom[i].onclick = null;
			$(stDom[i]).attr("onclick",null);
			$(stDom[i]).unbind("tap").bind("tap",(function(fun){
				return function(){
					fun.apply(this,arguments);
					return false;
				}												   	
			})(stFun));
		}
		if(sHref.indexOf("locationHref") != -1){
			sHref = sHref.replace(/["'\(\)]|%\d+|javascript[^"']*?\:|locationHref/g,"");
			stDom[i].href = "javascript:;";
			$(stDom[i]).unbind("tap").bind("tap",(function(href){
				return function(){
					locationHref(href);
					return false;
				}
			})(sHref));	
		}
	}
}

function showTip(sText){
	$('#default_tipBox_block1,#default_tipBox_block2').remove();
	var sText = $.trim(sText);
	if(sText == "")return;
	//添加标签
	var html = '<div id="default_tipBox_block1"><style type="text/css">.default_tip_box{display:none;position:fixed;top:0;left:0;background-color:rgba(0,0,0,0.7);z-index:100000;width:100%;text-align:center;font-size:14px;padding:0 10px;color:#FFFFFF;line-height:40px;}</style><div id="default_tipBox" class="default_tip_box">'+sText+'</div></div>';
	$('body').append(html);
	//获取高度
	var iHeight = parseInt($('#default_tipBox').height());
	if(isNaN(iHeight) || iHeight <= 0)return;
	var sTop = "-"+iHeight+"px";
	var html='<style id="default_tipBox_block2" type="text/css">.default_tip{top:'+sTop+';display:block;animation:myTip 3s;-moz-animation:myTip 3s;-webkit-animation:myTip 3s; -o-animation:myTip 3s;}@keyframes myTip {0%{top:'+sTop+';} 15%{top:0px;} 85%{top:0px;} 100%{top:'+sTop+';}}@-moz-keyframes myTip {0%{top:'+sTop+';} 15%{top:0px;} 85%{top:0px;} 100%{top:'+sTop+';}}@-webkit-keyframes myTip {0%{top:'+sTop+';} 15%{top:0px;} 85%{top:0px;} 100%{top:'+sTop+';}}@-o-keyframes myTip {0%{top:'+sTop+';} 15%{top:0px;} 85%{top:0px;} 100%{top:'+sTop+';}}</style>';
	$('body').append(html);
	$('#default_tipBox').addClass("default_tip");
}

function showNotify(messageKey){
	var newsId = 0;
	var st = messageKey.match(/id[\s\S]*?\=(\d+)/);
	if(st && st.push)newsId = st[1];
	newsId = parseInt(newsId);
	if(isNaN(newsId) || newsId <= 0)return;
	var sUrl = "/news/news-detail.html?newsId="+newsId;
	if(!isUserLogin())sUrl = "/login/login.html?toUrl="+encodeURIComponent(sUrl);
	locationHref(sUrl);	
}

function offLineTip(){
	showTip("当前网络不可用");
}

function phoneCall(number){
	var number = $.trim(number);
	if(number == "" || typeof(Utils) == 'undefined')return;
	Utils.phoneCall(number);
}

//保证图片按比例显示
function imgScale(ob,width,height){
	var iWidth=$(ob).width();
	var iHeight=$(ob).height();
	var sStyle='';
	if((iWidth/width)>(iHeight/height))sStyle='width:'+width+'px;height:auto;';
	else sStyle='width:auto;height:'+height+'px;';
	$(ob).attr('style',sStyle).show()
}

function isOnLine(){
	var state = true;
	if(navigator.network && navigator.network.connection && navigator.network.connection.type){
		 if(navigator.network.connection.type==Connection.NONE)state =false;
	}
	return state;
}

//得到元素实际坐标
function getElementPosition(OB)
{	var posX=OB.offsetLeft;
	var posY=OB.offsetTop;
	var aBox=OB;//需要获得位置的对象
	while(aBox.tagName.toLowerCase()!="body")
	{	aBox=aBox.offsetParent;
		if(!aBox)break;
		posX+=aBox.offsetLeft;
		posY+=aBox.offsetTop;
	}
	return {left:posX,top:posY};
}

//获取url参数
function getUrlParam(sName){
	var sValue = "";
	sName = trim(sName);
	if(sName != ""){
		var re = new RegExp("\\b"+sName+"\\b=([^&=]+)");
		var st = null;
		var sHref ="";
		if(this.location){
			sHref = trim(this.location.search);
		}else if(this.myUrl){
			sHref = trim(this.myUrl);
		}
		st = sHref.match(re);
		if(st && st.length == 2){
			sValue = trim(st[1]);
		}
	}
	return sValue;
}

function getPageId(url){
	var id = "";
	var st = url.match(/.*?\.html/i);
	if(!st || st.length != 1)return id;
	var file = trim(st[0]);
	file = file.replace(/\.html/gi,"");
	var stTemp = file.split("/");
	var stTemp1 = [];
	for(var i =0,length = stTemp.length; i < length; i++){
		stTemp[i] = trim(stTemp[i]);
		if(!stTemp[i] == "")stTemp1.push(stTemp[i]);		
	}
	var fileName = stTemp1[stTemp1.length - 1];
	var stFileName = fileName.split("-");
	for(var i =1,length = stFileName.length; i < length; i++){
		stFileName[i] = trim(stFileName[i]).charAt(0).toUpperCase() +  stFileName[i].substr(1);
	}
	if(stTemp1.length > 0)stTemp1.pop();
	if(stTemp1.length > 0)id = stTemp1.join("_") + "_" + stFileName.join("");
	else id = stFileName.join("");
	return id;
}
//页面跳转
function locationHref(url,isCache){
	var pageParam = url.replace(/^.*?\.html/gi,"");
	var pageId = getPageId(url);
	var pageDom = $('#'+pageId)[0];
	var goUrl = "#"+pageId+pageParam;
	if(!pageDom){
		ajax({
			waitTagId:"center",
			url:url,
			type:'get',
			dataType:'text',
			async:true,
			cache:false,
			timeout:30000,
			success:function(html){
				html = html.replace(/<script[^<>]*?src\=["']\/include\/header.js["'][^<>]*?>.*?<\/script>/g,"");
				$("body").append(html);
				setTimeout(function(){
					locationHref(url,isCache);	
				},10);	
			}
		});
		return;
	}
	pageDom.isCache = isCache;
	pageDom.myUrl = url;
	if(locationHref.caller != historyBack){
		//历史记录处理
		if(stHistoryClear[pageId])stHistoryList = [];
		else if($.mobile.activePage[0] && $.mobile.activePage[0].myUrl)stHistoryList.push($.mobile.activePage[0].myUrl);
	}
	$.mobile.changePage(goUrl,{transition:"none"});
}

function historyBack(){
	var length = stHistoryList.length;
	if(length > 0){
		var sUrl = $.trim(stHistoryList.pop());
		locationHref(sUrl,true);
	}else {
		if($("#showBox"+historyBack.showBoxId)[0])return;
		historyBack.showBoxId = showBox('提示','当前已经是最顶页,是否退出程序','confirm',function(){
			if(!navigator || !navigator.app || !navigator.app.exitApp)return;
			navigator.app.exitApp();		
		});
	}
}

/**************************************************** 设置cookie **********************************************/
function getCookie(name){
	var start=document.cookie.indexOf(name+"=");
	if(start==-1) return null;
	var len=start + name.length + 1;
	var end = document.cookie.indexOf(';',len);
	if (end==-1) end=document.cookie.length;
	return decodeURIComponent(document.cookie.substring(len, end));
}

function setCookie(name,value,expires){
	if(expires){
		expires=expires*1000*60*60*24;
		var today = new Date();
		expires = new Date(today.getTime()+(expires));
		expires = 'expires='+expires.toGMTString();
	}else expires = '';
	value = encodeURIComponent(value);
	//sBaseAreaName来自common.js
	document.cookie = name+'='+value+';path=/;domain='+sBaseAreaName+';'+expires;
}

function deleteCookie(name){
	//sBaseAreaName来自common.js
	document.cookie = name+'=;path=/;domain='+sBaseAreaName+';expires=Thu, 01-Jan-1970 00:00:01 GMT'; 
}

//判断用户是否登录
function isUserLogin(){
	var _usergd=getCookie('100gong_user');
	if(_usergd==null)_usergd='';
	_usergd=$.trim(_usergd);
	if(_usergd=='')return false;
	else return true;	
}
/*//检查json是否有权限,然后跳转到相关页面(默认跳回登录页面)*/
function checkJsonRight(data,toUrl){
	var bState = false;
	var sMsg = "";
	var sHref = '/login/login.html';
	if(toUrl){
		toUrl = $.trim(toUrl);
		if(toUrl != "" && toUrl.indexOf(sHref) == -1)sHref += "?toUrl="+encodeURIComponent(toUrl);
	}
	if(!data || !data.msgCode){
		sMsg = "数据返回异常";
		showTip(sMsg);
	}else if(data.msgCode == 1){
		bState = true;
	}else if(data.msgCode == 3){
		sMsg = "你还未登录";
		showTip(sMsg);
		locationHref(sHref);
	}else {
		sMsg = $.trim(data.msg);
		showTip(sMsg);
	}
	return bState;
}

//得到当前时间,stDate是日期对象，iDay当前日期对象偏移的天数，long是否显示小时，分钟,秒
function GetTime(stDate,iDay,long)
{	var alldate="";
	var dt=null;
	if(stDate)dt=stDate;
	else dt=new Date();
	dt.setDate(dt.getDate()+iDay);
	var sYear=dt.getFullYear();
	var sMonth=dt.getMonth();
	sMonth++;
	if(sMonth<=9)sMonth="0"+sMonth;
	var sDay=dt.getDate();
	if(sDay<=9)sDay="0"+sDay;
	if(!long)
	{
		alldate=sYear+"-"+sMonth+"-"+sDay;
	}
	else
	{
		var sHours=dt.getHours();
		if(sHours<=9)sHours="0"+sHours;
		var sMinutes=dt.getMinutes();
		if(sMinutes<=9)sMinutes="0"+sMinutes;
		var sSeconds=dt.getSeconds();
		if(sSeconds<=9)sSeconds="0"+sSeconds;
		alldate=sYear+"-"+sMonth+"-"+sDay+' '+sHours+':'+sMinutes+':'+sSeconds;
	}
	return alldate;
}

function HTMLEncode(html){
	var temp = document.createElement("div");
	(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
	var output = temp.innerHTML;
	temp = null;
	return output;
}

function HTMLDecode(text){
	var temp = document.createElement("div");
	temp.innerHTML = text;
	var output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}
/******************************************************* 购物车 ********************************************************/
var card_cookie = 'cn.digione.cart'; // 存储的cookie的 key
// 添加产品到购物车
function addCartCookie(productId, quantity, priceId, priceType,productRelation,withProductActivityId) {
	if (getCookie(card_cookie) == null)setCookie(card_cookie,'[]',30);
	var cart = JSON.parse(getCookie(card_cookie));
	var flag = false;
	for (var i = 0, length=cart.length; i < length; i++) {
		if (cart[i].productId == productId && cart[i].priceId == priceId) {
			var total = parseInt(cart[i].quantity) + parseInt(quantity);
			if (total < 0) {
				alert('您输入的数字已经超出最小值');
				return;
			}
			cart[i].quantity = total;
			if(productRelation == 2){
				cart[i].productRelation = productRelation;
				cart[i].withProductActivityId = withProductActivityId;
			}
			flag = true;
			break;
		}
	}
	// 如果购物车中没有此产品，则添加到购物车
	if (!flag) {
		cart[cart.length] = {
				"productId" : productId,
				"quantity" : quantity,
				"priceId" : priceId,
				"priceType" : priceType,
				"productRelation" : productRelation,
				"withProductActivityId" : withProductActivityId
		};// 增加isafterser属性：售后由公司承担，默认为否：0表示,afterserPrice属性：费用
	}
	setCookie(card_cookie,JSON.stringify(cart),30);
	return true;
}
//删除购物车中的产品
function removeCardCookie(productId) {
	var cart = JSON.parse(getCookie(card_cookie));
	if(!cart||!cart.push)return;
	for (var i = 0, length=cart.length; i < length; i++) {
		if (cart[i].priceId == parseInt(productId)) {
			cart.splice(i, 1);
			setCookie(card_cookie,JSON.stringify(cart),30);
			break;
		}
	}
}
//得到购物车的产品数量
function getCardCookieQuantity(){
	var quantity = 0;
	if (getCookie(card_cookie) != null) {
		var cart = JSON.parse(getCookie(card_cookie));
		for (var i = 0, length=cart.length; i < length; i++) {
			quantity += parseInt(cart[i].quantity);
		}
	}
	return quantity;
}
//得到购物车的产品ID
function getCardCookieProductId(){
	var productIdList = [];
	if (getCookie(card_cookie) != null) {
		var cart = JSON.parse(getCookie(card_cookie));
		for (var i = 0, length=cart.length; i < length; i++) {
			productIdList.push(parseInt(cart[i].productId));
		}
	}
	return productIdList;
}
//处理购物车中已下架的产品
function arrDive(aArr,bArr){
    if(bArr.length==0){ return; }
    var current = [];
    var str = bArr.join(",");
    for(var e in aArr){
        if(str.indexOf(aArr[e])==-1){ current.push(aArr[e]); }
    }
    if(current.length > 0){	//cookie中存在已下架产品
    	for(var j=0,len=current.length; j<len; j++){ removeCardCookie(current[j]); }
    }
}
// 清空购物车
function cleanCartCookie() {
	deleteCookie(card_cookie);
}
/************************************************************* 修正浏览器JSON对象 *******************************************************/
//JSON其实就是高级浏览器的一个window.JSON,低于IE8是没有JSON对象的,大家注意啦不要乱使用
if(typeof(JSON)=='undefined')JSON={};
if(!JSON.parse)JSON.parse=function(str){
	var json = (new Function("return " + str))();
	return json;	
};
if(!JSON.stringify)JSON.stringify=function(obj){
	switch(typeof(obj)){
		case 'string':
			return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
		case 'array':
			return '[' + obj.map(arguments.callee).join(',') + ']';
		case 'object':
			 if(obj instanceof Array){
				var strArr = [];
				var len = obj.length;
				for(var i=0; i<len; i++){
					strArr.push(arguments.callee(obj[i]));
				}
				return '[' + strArr.join(',') + ']';
			}else if(obj==null){
				return 'null';

			}else{
				var string = [];
				for (var property in obj) string.push(arguments.callee(property) + ':' + arguments.callee(obj[property]));
				return '{' + string.join(',') + '}';
			}
		case 'number':
			return obj;
		case false:
			return obj;
	}
};
/************************************************************** 自定义弹框 *************************************************************/
/*
showBox('内标签','footerId')
showBox('内标签',dom对象)
showBox('自定义文本','你好我是自定义文本')
showBox('显示Iframe','/index.html?width=500&height=300')
showBox('显示AjaxHTML','/include/header.html?ajax')
showBox('alert框','用户不存在','alert',function(){alert('执行自定义函数')})
showBox('confirm框','用户不存在','confirm',function(){alert('执行自定义函数')})
showBox('tip提示','提示内容','tip',{'tagId':'xxx','left':0,'top':0,'time':500})//time是毫秒
*/
function showBox(title,param,winType,callBack){
	if(typeof(winType)=='undefined')winType='';
	winType=trim(winType.toLowerCase());
	title=trim(title);
	param=trim(param);
	var id=(new Date()).getTime();
	var html=[];
	html.push('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" class="showBox" id="showBox'+id+'" style="z-index:'+id+'">');
	html.push('<tr><td align="center" valign="middle" style="width:100%;height:100%">');
	/************************* 添加css Begin *************************/
	html.push('<style type="text/css">.showBox{position:fixed;top:0px;left:0px;}.box_overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#000;filter:alpha(opacity=50);-moz-opacity:0.50;opacity:0.50}');
	html.push('.box_main{text-align:left;background-color:#fff;position:relative;top:0;left:0;border-collapse:collapse;border-radius:4px}');
	html.push('.box_title{font-size:16px;font-weight:700;overflow:hidden;background-color:#74afff;display:block;border-radius:4px 4px 0 0}');
	html.push('.box_title .text{padding-left:10px;height:35px;line-height:35px;color:#fff}');
	html.push('.box_title .close_box{ text-align:right;padding-right:10px;}');
	html.push('.box_title .close{display:inline-block;width:14px;height:30px;overflow:hidden;cursor:pointer;}');
	html.push('.box_btn{border-top:1px dashed #d2d2d2;text-align:center;}');
	html.push('.box_content{background-color:;}');
	html.push('.box_txt{padding:0 10px}');
	html.push('.box_btn button{width:50%;height:30px;border:0;cursor:pointer;background:none;font-size:14px}');
	html.push('.box_btn button.yes{color:#74afff}');
	html.push('.box_btn button.no{border-left:1px dashed #d2d2d2;color:#565656}');
	html.push('</style>');
	/************************* 添加css End *************************/
	html.push('<div class="box_overlay"></div><table id="box_main'+id+'" class="box_main">');
	html.push('<tr class="box_title"><td class="text">'+title+'</td><td class="close_box">');
	var isAddCloseButton=true;
	if(winType=='alert'||winType=='confirm')isAddCloseButton=false;
	if(isAddCloseButton){
		html.push('<span class="close" onclick="closeBox(');
		html.push(id);
		html.push(');"></span>');
	}
	html.push('</td></tr><tr><td valign="center" id="box_content'+id+'" colspan="2" class="box_content">');
	var isAjaxHTML=false;
	var isInnerHTML=false;
	var isIframeHTML=false;
	var innerHTML='';
	var element=null;
	if(param&&param.nodeType==1)element=param;
	else element=document.getElementById(param);
	if(element){
		isInnerHTML=true;
		innerHTML=element.innerHTML;
		element.innerHTML='';
		html.push(innerHTML);	
	}
	else if(/^[^<>]*?\.(html|htm|jsp)[^<>]*$/i.test(param)){
		//xxxxx.html?width=xxx&height=xxx
		if(/\?[^&=\?]*?ajax/i.test(param)){
			isAjaxHTML=true;	
		}else{
			isIframeHTML=true;
			var width='';
			var height='';
			var stWidth=param.match(/width=([0-9%]+)/i);
			if(stWidth&&stWidth.length)width=stWidth[1];
			var stHeight=param.match(/height=([0-9%]+)/i);
			if(stHeight&&stHeight.length)height=stHeight[1];
			if(param.indexOf('?')==-1)param+='?boxId='+id;
			else param+='&boxId='+id;
			html.push('<iframe id="contentIframe'+id+'" name="contentIframe" onload="this.contentWindow.document.body.style.background=\'#fff\'" frameborder="0" marginheight="0" marginwidth="0" ');
			if(width!='') {html.push('width="'+width+'"');}
			if(height!='') {html.push(' height="'+height+'"');}
			html.push(' src="'+param+'"></iframe>');
		}
	}
	else{
		html.push('<div class="box_txt">'+param+'</div>');	
	}
	html.push('</td></tr><tr style="display:none"><td colspan="2" class="box_btn" id="box_btn');
	html.push(id);
	html.push('"></td></tr></table></td></tr></table>');
	var div=document.createElement('div');
	div.innerHTML=html.join('');
	document.body.appendChild(div.firstChild);
	//插入内标签缓存内容
	if(isInnerHTML){
		var input=document.createElement('input');
		input.innerDom=element;
		input.id="box_InnerTag"+id;
		input.type='hidden';
		input.value=innerHTML;
		document.getElementById("box_content"+id).appendChild(input);
	}
	if(isAjaxHTML&&loadHtml)loadHtml('box_content'+id,param);
	if(winType=='alert'||winType=='confirm'){
		var oBtn1=document.createElement('button');
		oBtn1.className="yes"; 
		oBtn1.innerHTML='确定';
		oBtn1.onclick=function(){
			closeBox(id);
			if(typeof(callBack)!="undefined"){callBack();};
		};
		var buttonBox=document.getElementById("box_btn"+id);
		buttonBox.parentNode.style.display="";
		buttonBox.appendChild(oBtn1);
		if(winType=='confirm'){
			var oBtn2=document.createElement('button');
			oBtn2.className="no";
			oBtn2.innerHTML='取消';
			oBtn2.onclick=function(){
				closeBox(id);
			};
			buttonBox.appendChild(oBtn2);
		}
	}
	var main=document.getElementById('box_main'+id);
	var width=main.offsetWidth;
	var height=main.offsetHeight;
	if(width<250)main.style.width='250px';
	if(height<100)main.style.height='100px';
	return id;
}
function closeBox(id){
	//如果没有传id,关闭的将是最近的打开的showBox
	if(typeof(id)=='undefined'){
		var stTable=document.getElementsByTagName('table');
		for(var i=0,length=stTable.length;i<length;i++){
			if(stTable[i].className=='showBox'){
				id=stTable[i].id.replace(/\D/g,'');
			}
		}	
	}
	if(typeof(id)=='undefined')return;
	//还原内标签
	var input=document.getElementById("box_InnerTag"+id);
	if(input){
		var innerTag=input.innerDom;
		if(innerTag)innerTag.innerHTML=input.value;
	}
	var dombox=document.getElementById('showBox'+id);
	if(dombox)document.body.removeChild(dombox);
}
