﻿/********************************************************** 以下都是直供机移植过来的函数 *********************************************************/
//图片地址
var STATICS_FILE_URL = "http://upload.139b2b.com/";
var PHOTO_URL = STATICS_FILE_URL;
//var TERMINAL_URL="http://wwwdev.100gong.tk/service100gonghost";//订单流程服务器URL
var TERMINAL_URL="/service100gonghost";
/***************************************************************common说明开始**************************************************/
//所有以下划线"_"开始的函数都是不支持外面调用的
/***************************************************************common说明结束**************************************************/
/***************************************************************common开发配置开始**************************************************/
//主体.顶级域名,方便于跨子域访问
var stUrlReg=/[^\.]*?\.com\.cn|[^\.]*?\.net\.cn|[^\.]*?\.org\.cn|[^\.]*?\.edu\.cn|[^\.]*?\.com|[^\.]*?\.cn|[^\.]*?\.net|[^\.]*?\.org|[^\.]*?\.edu|[^\.]*?\.tk/i;
var sBaseAreaName=window.location.host.toLowerCase().match(stUrlReg)[0];
/***************************************************************common开发配置结束**************************************************/
/***************************************************************ajax跨域打包开始**************************************************/
function ajax(stAjaxOB)
{	if(!isOnLine()){
		offLineTip();
		return;	
	}
	stAjaxOB.url=$.trim(stAjaxOB.url);
	stAjaxOB.waitTagId=$.trim(stAjaxOB.waitTagId);
	if(stAjaxOB.url=='')
	{
		alert('url不能为空!');
		return;
	}
	if(!(/\.html?/.test(stAjaxOB.url))){
		var _loginflag=0;
		if(isUserLogin())_loginflag=1;
		if(stAjaxOB.url.indexOf('?')==-1)stAjaxOB.url+='?_loginflag='+_loginflag;
		else stAjaxOB.url+='&_loginflag='+_loginflag;
	}
	//加载等待图片
	if(typeof(stAjaxOB.waitTagId)!='undefined'&&stAjaxOB.waitTagId!=''){
		stAjaxOB.waitPicId=true;
		var stIDOB=document.getElementById(stAjaxOB.waitTagId);
		if(stIDOB){
			var sTime=(new Date()).getTime();
			stAjaxOB.waitPicId="WaitImg"+sTime;
			var stPosition=getElementPosition(stIDOB);
			//等待图片为46*46的格式，所以要减去16
			var iTop=stPosition.top+stIDOB.offsetHeight/2-23;
			var iLeft=stPosition.left+stIDOB.offsetWidth/2-23;
			var sImg='<img id="'+stAjaxOB.waitPicId+'" style="border:0;position:absolute;top:'+iTop+'px;left:'+iLeft+'px;" src="/images/loader.gif"/>'
			$("body").append(sImg);
		}else $.mobile.loading('show');
	}
	if(typeof(stAjaxOB.uploadForm)!='undefined'&&stAjaxOB.uploadForm!=''){
		var uploadForm=document.getElementById($.trim(stAjaxOB.uploadForm));
		if(uploadForm&&uploadForm.nodeName.toLowerCase()=='form'){
			ajaxUploadForm(arguments);
		}
	}else{
		_doAjax($,arguments);
	}
}
//二级函数,不能直接调用
function _doAjax(stJquery,stParam)
{	var stAjaxOB=stParam[0];
	var errorFun=typeof(stAjaxOB.error)!='undefined'?stAjaxOB.error:function(){};
	var successFun=typeof(stAjaxOB.success)!='undefined'?stAjaxOB.success:function(){};
	stJquery.ajax({ 
		url:typeof(stAjaxOB.url)!='undefined'?stAjaxOB.url:'',
		type:typeof(stAjaxOB.type)!='undefined'?stAjaxOB.type:'get',
		data:typeof(stAjaxOB.data)!='undefined'?stAjaxOB.data:'',
		dataType:typeof(stAjaxOB.dataType)!='undefined'?stAjaxOB.dataType:'text',
		async:typeof(stAjaxOB.async)!='undefined'?stAjaxOB.async:true,
		cache:typeof(stAjaxOB.cache)!='undefined'?stAjaxOB.cache:false,
		timeout:typeof(stAjaxOB.timeout)!='undefined'?stAjaxOB.timeout:30000,
		error:function(data){
			stParam[0]=data;
			errorFun.apply(stAjaxOB,stParam);
			if(typeof(stAjaxOB.waitPicId)!='undefined'){
				if(stAjaxOB.waitPicId===true)$.mobile.loading('hide');
				else $("#"+stAjaxOB.waitPicId).remove();
			}
		}, 
		success:function(data)
		{	stParam[0]=data;
			successFun.apply(stAjaxOB,stParam);
			if(typeof(stAjaxOB.waitPicId)!='undefined'){
				if(stAjaxOB.waitPicId===true)$.mobile.loading('hide');
				else $("#"+stAjaxOB.waitPicId).remove();
			}
		}
	})	
}
/****************** form 上传 ***************/
function ajaxUploadForm(stParam){
		var stAjaxOB=stParam[0];
		stAjaxOB.url=$.trim(stAjaxOB.url);
		stAjaxOB.uploadForm=$.trim(stAjaxOB.uploadForm);
		var uploadForm=document.getElementById(stAjaxOB.uploadForm);
		if(stAjaxOB.url==''||stAjaxOB.uploadForm==''||!uploadForm||uploadForm.nodeName.toLowerCase()!='form')return;
		var time=(new Date()).getTime();
		var singleUpload=typeof(stAjaxOB.singleUpload)!='undefined'?stAjaxOB.singleUpload:false;
		var dataType=typeof(stAjaxOB.dataType)!='undefined'?stAjaxOB.dataType:'text';
		var cache=typeof(stAjaxOB.cache)!='undefined'?stAjaxOB.cache:false;
		if(!cache){
			if(stAjaxOB.url.indexOf('?')==-1)stAjaxOB.url+='?_t='+time;
			else stAjaxOB.url+='&_t='+time;
		}
		//单个上传begin
		if(singleUpload){
			if(!uploadForm.uploadList&&!uploadForm.uploadIndex){
				var stFile=[];
				var stTemp=uploadForm.getElementsByTagName('input');
				for(var i=0,iLength=stTemp.length;i<iLength;i++){
					if(stTemp[i].type.toLowerCase()=='file'&&stTemp[i].name!=''&&stTemp[i].value!=''){
						stTemp[i].backName=stTemp[i].name;
						stTemp[i].name='';
						stFile.push(stTemp[i]);
					}
				}
				uploadForm.uploadList=stFile;
				uploadForm.uploadIndex=0;
			}
			var stList=uploadForm.uploadList;
			var iIndex=uploadForm.uploadIndex;
			for(var i=0,iLength=stList.length;i<iLength;i++)stList[i].name='';
			stList[iIndex].name=stList[iIndex].backName;
			//生成等待图标
			var stPosition=getElementPosition(stList[iIndex]);
			//等待图片为32*32的格式，所以要减去16
			var iHeight=stList[iIndex].offsetHeight;
			var iTop=stPosition.top;
			var iLeft=stPosition.left+stList[iIndex].offsetWidth/2-iHeight/2;
			var sImg='<img id="ajaxUploadFormWaitImg'+time+'" style="border:0;position:absolute;top:'+iTop+'px;left:'+iLeft+'px;height:'+iHeight+'px" src="/images/module/loadingAnimation.gif"/>';
			$("body").append(sImg);
		}
		//单个上传end
		uploadForm.target='ajaxUploadForm'+time;
		uploadForm.enctype='multipart/form-data';//IE这样设置无效
		uploadForm.encoding="multipart/form-data";//IE这样设置有效
		uploadForm.method='post';
		uploadForm.action=stAjaxOB.url; 
		//创建iframe  
		var proxy=null;
		try{
			if(isIE())proxy=document.createElement('<iframe name="ajaxUploadForm'+time+'"></iframe>');
		}catch(e){
				
		}
		if(!proxy)proxy=document.createElement("iframe");
		proxy.name='ajaxUploadForm'+time;
		proxy.style.display="none"; 
		proxy.stParam=stParam;
		//IE这样设置box.onload无效
		if(proxy.attachEvent)
		{
			proxy.attachEvent('onload',function(){
				_doAjaxUploadForm(proxy);
			});
		}
		else
		{	
			proxy.onload=function(){
				_doAjaxUploadForm(this);
			}
		}
		$("body").append(proxy);
		uploadForm.submit();
}
function _doAjaxUploadForm(stIframe){
	var sHref=stIframe.contentWindow.location.href.replace(/\s/g,'');
	if(sHref=='about:blank')return;
	var data=_ajaxResponseFilter(stIframe.contentWindow.document.body.innerHTML);
	var stParam=stIframe.stParam;
	var stAjaxOB=stParam[0];
	stParam[0]=data;
	var errorFun=typeof(stAjaxOB.error)!='undefined'?stAjaxOB.error:function(){};
	var successFun=typeof(stAjaxOB.success)!='undefined'?stAjaxOB.success:function(){};
	if(stAjaxOB.dataType=='json'){
		stParam[0]=$.parseJSON(stParam[0]);
		if(stParam[0])successFun.apply(stAjaxOB,stParam);
		else errorFun.apply(stAjaxOB,stParam);
	}else successFun.apply(stAjaxOB,stParam);
	//还原原始参数
	stParam[0]=stAjaxOB;
	//单个上传begin
	stAjaxOB.uploadForm=$.trim(stAjaxOB.uploadForm);
	var uploadForm=document.getElementById(stAjaxOB.uploadForm);
	if(stAjaxOB.url==''||stAjaxOB.uploadForm==''||!uploadForm||uploadForm.nodeName.toLowerCase()!='form')return;
	var singleUpload=typeof(stAjaxOB.singleUpload)!='undefined'?stAjaxOB.singleUpload:false;
	if(singleUpload){
		//删除单个上传的等待图标
		var sTime=uploadForm.target.replace(/ajaxUploadForm/g,'');
		var stUploadImg=document.getElementById('ajaxUploadFormWaitImg'+sTime);
		if(stUploadImg)$(stUploadImg).remove();
		if(uploadForm.uploadIndex>=(uploadForm.uploadList.length-1)){
			for(var i=0,iLength=uploadForm.uploadList.length;i<iLength;i++)uploadForm.uploadList[i].name=uploadForm.uploadList[i].backName;
			uploadForm.uploadList=null;
			uploadForm.uploadIndex=null;
		}else{
			uploadForm.uploadIndex++;
			ajaxUploadForm(stParam);
		}
	}
	//单个上传end
	if(stIframe){
		setTimeout(function(){
			$(stIframe).remove();
		},1000);
	}
	if(typeof(stAjaxOB.waitPicId)!='undefined'){
		if(stAjaxOB.waitPicId===true)$.mobile.loading('hide');
		else $("#"+stAjaxOB.waitPicId).remove();
	}
}
function _ajaxResponseFilter(sResponse){
	var stResponse=$.trim(sResponse);
	return stResponse;
}
/***************************************************************ajax跨域打包结束**************************************************/
function toPenny(num,len){
	len=len||2;
	if(isNaN(parseFloat(num)))return num;
	else return (num/100).toFixed(len);
}
function toFloat(num,len){
	len=len||2;
	if(isNaN(parseFloat(num)))return num;
	else return (num).toFixed(len);
}
function trim(sStr){
	if(typeof(sStr)!='string')return sStr;
	return sStr.replace(/(^\s*)|(\s*$)/g,"");
}