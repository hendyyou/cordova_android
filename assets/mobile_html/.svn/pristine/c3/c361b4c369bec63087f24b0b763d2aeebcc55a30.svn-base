// =========================== 公用方法定义部分 ===========================
var Utils = {
      
    /**
     * 显示等待框
     *
     * @param msgText
     *            等待框提示
     */
	 
    showLoading : function(msgText) {
        if (msgText == null) {
            msgText = "正在加载中......";
        }
        cordova.exec(null, null, 'LoadingDialog', 'loadingStart', [msgText]);//参数已修改
    },
    /**
     * 隐蔽等待框
     *
     * @param flag
     *            是否关闭所有等待框
     */
    hideLoading : function(flag) {
        var closeAll = false;
        if (flag != null && flag == true) {
            closeAll = true;
        }
        cordova.exec(null, null, 'LoadingDialog', 'loadingStop', [ closeAll ]);
    },
	/**
	 *直接拨打电话
	 * @param number
	 *			电话号码
	 */
	phoneCall : function(number){		
		cordova.exec(null,null, 'Phone', 'call', [number]); 
	},
	
	//点击系统通知栏消息后的回调函数
	onClickNotify : function(messageKey){
		showNotify(messageKey);
	},
	
		
	/**
	 * 处理网络连接不可用的回调
	 *
	 */
	onNetworkUnavailable : function(){
		offLineTip();
	},
    
    /**
     *         推送设置 ,
     *      @param  push_setting  ["push_key","push_value"]
     *      push_key:policy,announcement or night
     *      push_value: on or  off
     *      @example  pushSetting(['policy',''on])
     */
    pushSetting : function(setting){
        cordova.exec(null,null,'PushSetting','push_settting',setting);
    },
   
   	goToHome : function(){		
		cordova.exec(null,null,'GoToHome','tohome',['000']);
	},
     
	//拦截所有的回退键，调用GoToHome插件跳转到桌面
	eventBackButton : function() {
		historyBack();
	},
	clearMomery : function(){
		cordova.exec(null,null,'GoToHome','clearMemory',['000']);
	}
};
