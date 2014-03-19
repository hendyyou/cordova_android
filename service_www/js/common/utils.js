// =========================== 公用方法定义部分 ===========================
var Utils = {
    /**
     * Toast显示次数
     */
    _toastCount : 0,
    /**
     * 显示Toast的div
     *
     * @param message
     *            消息内容
     * @param toastTime
     *            显示时间，单位毫秒
     */
    drawToast : function(message, toastTime) {
        var global_toast_item = document.getElementById("global_toast");
        if (global_toast_item == null) {
            var toastHTML = '<div id="global_toast">' + message + '</div>';
            document.body.insertAdjacentHTML('beforeEnd', toastHTML);
            var global_toast = $("#global_toast");
            // 获取元素的内容高度
            var h = Math.ceil(global_toast.height());
            // outerHeight=padding+border+height
            var oh = Math.ceil(global_toast.outerHeight());
            // 取得margin-top值
            var mt = Math.ceil(oh / 2);
            // 实现元素居中效果
            global_toast.css({
                "margin-top" : "-" + mt + "px",
                "top" : "80%",
                "left" : "15%",
                "width" : "70%",
                "height" : h,
                "position" : "absolute"
            });
        } else {
            global_toast_item.style.opacity = .88;
            $("#global_toast").text(message);
        }
        if (isNaN(toastTime)) {
            toastTime = 2000;
        }
        Utils._toastCount++;
        // 关闭Interval执行的Counter
        var intervalCounter = setInterval(function() {
            Utils._toastCount--;
            if (Utils._toastCount <= 0) {
                clearInterval(intervalCounter);
                var global_toast_item = document.getElementById("global_toast");
                global_toast_item.style.opacity = 0;
            }
        }, toastTime);
    },
    /**
     * 获取url参数
     *
     * @param sName
     *            参数名称
     * @returns 参数值。存在返回参数值，不存在返回空，没有传入参数名，返回false
     */
    getUrlParam : function(sName) {
        if (sName) {
            var sValue = '';
            var re = new RegExp("\\b" + sName + "\\b=([^&=]+)");
            var st = window.location.search.match(re);
            if (st && st.length == 2) {
                sValue = st[1].replace(/^\s*|\s*$/g, '');
            }
            return sValue
        } else {
            alert("参数不能为空");
            return false;
        }
    },
    /**
     * 重新加载新页面
     *
     * @param url
     *            跳转的URL
     * @param clearHistory
     *            清除浏览历史
     */
    locationHref : function(url, clearHistory) {
        var pageUrl = url;
        if (pageUrl.indexOf(Constants.local_url_prefix) == -1) {
            pageUrl = Constants.local_url_prefix + pageUrl;
        }
        if (clearHistory == null) {
            clearHistory = false;
        }
        navigator.app.loadUrl(pageUrl, {
            loadingDialog : "wait,正在加载中......",
            loadUrlTimeoutValue : 60000,
            clearHistory : clearHistory
        });
    },
    /**
     * 跳转URL
     *
     * @param hrefObj
     *            跳转对象<br>
     *            url:跳转的URL<br>
     *            options:其他跳转选项
     */
    changeHref : function(hrefObj) {
        console.log('changeHref() url:' + hrefObj.url + ', hrefOptions:' + hrefObj.options);
        if (hrefObj.options == null) {
            hrefObj.options = {
                transition : "none",
                allowSamePageTransition : true
            };
        } else {
            if (hrefObj.options.transition == null || hrefObj.options.transition == '') {
                hrefObj.options.transition = "none";
            }
            if (hrefObj.options.allowSamePageTransition == null || hrefObj.options.allowSamePageTransition == '') {
                hrefObj.options.allowSamePageTransition = true;
            }
        }
        $.mobile.changePage(hrefObj.url, hrefObj.options);
    },
    /**
     * 上一个页面ID
     */
    _lastPageId : "",
    /**
     * 跳转页面URL
     *
     * @param pageHrefObj
     *            跳转对象<br>
     *            pageId:跳转的Page的ID,规范模式为xxx_yyy_page;xxx表示所在的tab,yyy表示模块<br>
     *            pageUrl:跳转的Page的html路径。如果不设置，则使用pageId创建<br>
     *            pageJsUrl:跳转的Page的js路径。如果不设置，则使用pageId创建<br>
     *            pageJsCallback:跳转的Page的js的回调方法对象。<br>
     *            options:跳转的Page的其他跳转选项。<br>
     */
    changePageHref : function(pageHrefObj) {
        if (pageHrefObj.pageId == '') {
            alert('pageId不能为空!');
            return;
        }
		if(!navigator.onLine){
			Utils.drawToast('网络连接不可用');
			Utils.hideLoading();
			return;
		}

        if (pageHrefObj.pageUrl === undefined || pageHrefObj.pageJsUrl === undefined) {
            var dashIndex = pageHrefObj.pageId.indexOf("_");
            var prefix, postfix;
            if (dashIndex != -1) {
                prefix = pageHrefObj.pageId.substring(0, dashIndex);
                postfix = pageHrefObj.pageId.substring(dashIndex + "_".length);
            }
            if (pageHrefObj.pageUrl === undefined) {
                if (dashIndex == -1) {
                    alert('pageId不规范，所以pageUrl不能不设置!');
                    return;
                }
                pageHrefObj.pageUrl = prefix + "/" + postfix + ".html";
            }
            if (pageHrefObj.pageJsUrl === undefined) {
                if (dashIndex == -1) {
                    alert('pageId不规范，所以pageJsUrl不能不设置!');
                    return;
                }
                pageHrefObj.pageJsUrl = "js/" + prefix + "/" + postfix + ".js";
            }
        }

        Utils.showLoading();

        if (pageHrefObj.pageUrl.indexOf(Constants.local_url_prefix) == -1) {
            pageHrefObj.pageUrl = Constants.local_url_prefix + pageHrefObj.pageUrl;
        }
        var pageSelector = '#' + pageHrefObj.pageId;
        if ($(pageSelector).length != 0) {
            $(pageSelector).remove();
        }
        Utils.appendHtml(null, pageHrefObj.pageUrl);

        // 试图处理显示前需要的行为
        $("#" + pageHrefObj.pageId).off('pageshow').on('pageshow', function(event, ui) {
            //            var headerSelector = pageSelector + ' div[data-role="header"]';
            //            var headerHeight = $(headerSelector).outerHeight();
            //            var pagePaddingTopVal = headerHeight + 'px !important'
            //            console.log('pagePaddingTopVal:' + pagePaddingTopVal);
            //            $(pageSelector).css('padding-top', pagePaddingTopVal);
            //            $.mobile.resetActivePageHeight();
        });

        var currentPageId = $.mobile.activePage.attr("id");
        console.log('changePageHref() pageUrl:' + pageHrefObj.pageUrl + ', pageHrefObj.pageId:' + pageHrefObj.pageId);
        if (pageHrefObj.pageJsUrl != '') {
            if (pageHrefObj.pageJsUrl.indexOf(Constants.local_url_prefix) == -1) {
                pageHrefObj.pageJsUrl = Constants.local_url_prefix + pageHrefObj.pageJsUrl;
            }
            console.log('changePageHref() pageJsUrl:' + pageHrefObj.pageJsUrl);
            if (typeof pageHrefObj.pageJsCallback == 'function') {
                $.getScript(pageHrefObj.pageJsUrl).done(function() {
                    pageHrefObj.pageJsCallback();
                    Utils.changeHref({
                        url : "#" + pageHrefObj.pageId,
                        options : pageHrefObj.options
                    });
                    Utils._lastPageId = currentPageId;
                    console.log('changePageHref() lastPageId:' + currentPageId);
                    Utils.hideLoading();
                });
            } else {
                $.getScript(pageHrefObj.pageJsUrl).done(function() {
                    Utils.changeHref({
                        url : "#" + pageHrefObj.pageId,
                        options : pageHrefObj.options
                    });
                    Utils._lastPageId = currentPageId;
                    console.log('changePageHref() lastPageId:' + currentPageId);
                    Utils.hideLoading();
                });
            }
        } else {
            Utils.changeHref({
                url : "#" + pageHrefObj.pageId,
                options : pageHrefObj.options
            });
            Utils._lastPageId = currentPageId;
            console.log('changePageHref() lastPageId:' + currentPageId);
            Utils.hideLoading();
        }
    },
    /**
     * 加载HTML文件
     *
     * @param headerId
     *            加载到的ID
     * @param sUrl
     *            加载文件名相对路径
     * @param isAsync
     *            是否异步加载，默认为同步加载
     */
    loadHtml : function(headerId, sUrl, isAsync) {
        if (!isAsync) {
            isAsync = false;
        }
        var pageUrl = sUrl;
        if (pageUrl.indexOf(Constants.local_url_prefix) == -1) {
            pageUrl = Constants.local_url_prefix + pageUrl;
        }
        $.ajax({
            url : pageUrl,
            type : "get",
            dateType : "html",
            async : isAsync,
            success : function(html) {
                $("#" + headerId).html(html);
            }
        });
    },
    /**
     * 加载HTML文件
     *
     * @param headerId
     *            加载到的ID
     * @param sUrl
     *            加载文件名相对路径
     * @param isAsync
     *            是否异步加载，默认为同步加载
     */
    appendHtml : function(headerId, sUrl, isAsync) {
        if (!isAsync) {
            isAsync = false;
        }
        var pageUrl = sUrl;
        if (pageUrl.indexOf(Constants.local_url_prefix) == -1) {
            pageUrl = Constants.local_url_prefix + pageUrl;
        }
        $.ajax({
            url : pageUrl,
            type : "get",
            dateType : "html",
            async : isAsync,
            success : function(html) {
                if (headerId != null) {
                    $("#" + headerId).append(html);
                } else {
                    $("body").append(html);
                }
            }
        });
    },
    /**
     * 得到元素实际坐标对象
     *
     * @param htmlObj
     *            需要获得位置的对象
     * @returns 坐标对象{{left: (Number|number), top: (Number|number)}}
     */
    getElementPosition : function(htmlObj) {
        var posX = htmlObj.offsetLeft;
        var posY = htmlObj.offsetTop;
        var aBox = htmlObj;// 需要获得位置的对象
        while (aBox.tagName.toLowerCase() != "body") {
            aBox = aBox.offsetParent;
            if (!aBox) {
                break;
            }
            posX += aBox.offsetLeft;
            posY += aBox.offsetTop;
        }
        var resultObj = {
            left : posX,
            top : posY
        };
        return resultObj;
    },
    /**
     * 创建等待图片
     *
     * @param waitTagId
     *            等待图片创建Tag的ID
     * @returns {String}等待图片ID
     */
    showWaitPic : function(waitTagId) {
        var waitPicId = "WaitImg" + (new Date()).getTime();
        var waitTagObj = document.getElementById(waitTagId);
        var stPosition = Utils.getElementPosition(waitTagObj);
        // 等待图片为32*32的格式，所以要减去16
        var iTop = stPosition.top + waitTagObj.offsetHeight / 2 - 16;
        var iLeft = stPosition.left + waitTagObj.offsetWidth / 2 - 16;
        var sImg = '<img id="' + waitPicId + '" style="border:0;position:';
        if (waitTagObj.tagName.toLowerCase() == "body") {
            sImg += "fixed";
        } else {
            sImg += "absolute";
        }
        sImg += ';_position:absolute;top:' + iTop + 'px;left:' + iLeft + 'px" src="' + Constants.local_url_prefix +
            'css/jquery/images/ajax-loader.gif"/>';
        $("body").append(sImg);

        return waitPicId;
    },
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
        cordova.exec(null, null, 'LoadingDialog', 'loadingStart', [ "", msgText ]);
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
	
	/**
	 * 将消息显示到系统状态栏上。
	 * @param message  ["title","content"]
	 *
	 */
	sendNotify : function(message){		
		cordova.exec(null,null,'Notify','send',message);
	},
	
	/**
	 * 处理网络连接不可用的回调
	 *
	 */
	onNetworkUnavailable : function(){
		alert("网络不可用");
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
   
    /**
     * 是否登陆
     *
     * @returns {Boolean}
     */
    isLogin : function() {
        var userInfoStr = sessionStorage.getItem(Constants.argName.session.userInfo);
        if (userInfoStr == null || userInfoStr == '') {
            return false;
        } else {
            return true;
        }
    },
   
    /**
     * 退出程序
     */
    exit : function() {
        console.log('exit()');
        if (Utils.isLogin()) {
            Utils.logout();
        }
        navigator.app.exitApp();
    },
    /**
     * 弹出窗口的打开方法
     *
     * @param options
     *            弹出选项，<br>
     *            transition:弹出方式;<br>
     *            positionTo：弹出位置;<br>
     *            popupDivId：弹出Div;<br>
     *            popupAId：弹出的A标签ID;<br>
     *            popupId：弹出的id;<br>
     *            href：弹出文件路径;<br>
     *            callback：弹出后回调方法
     */
    openPopup : function(options) {
        var transition = options.transition || "slideup";
        var positionTo = options.positionTo || "origin";
        var targetId = $.mobile.activePage.attr("id");
        var newPopupDivId = options.popupDivId + "_" + targetId;
        var newPopupAId = options.popupAId + "_" + targetId;
        var newPopupId = options.popupId + "_" + targetId;
        console.log('openPopup() transition:' + transition + ', positionTo:' + positionTo);
        if ($("#" + newPopupDivId).length == 0) {
            Utils.appendHtml(targetId, options.href);
            $("#" + options.popupAId).attr("href", "#" + newPopupId).attr("data-transition",
                transition).attr("data-position-to", positionTo).attr("id", newPopupAId);
            $("#" + options.popupId).attr("id", newPopupId);
            $("#" + options.popupDivId).attr("id", newPopupDivId).trigger('create');
        }
        $("#" + newPopupAId).trigger('click');

        if (typeof options.callback == 'function') {
            options.callback(targetId);
        }
    },
    /**
     * 当前的Tab索引
     */
    _currentTabIndex : Constants.tabIndex.HOME,
    /**
     * 设置当前的Tab索引
     *
     * @param tabIndex
     *            索引
     */
    setCurrentTabIndex : function(tabIndex) {
        Utils._currentTabIndex = tabIndex;
    },
    /**
     * 获取当前的Tab索引
     *
     * @returns 索引
     */
    getCurrentTabIndex : function() {
        return Utils._currentTabIndex;
    },
    /**
     * 页脚Tab的事件绑定方法
     *
     * @param pageId
     *            页面ID
     * @param tabIndex
     *            当前Tab的Index。home:0;product:1;shopcart:2;workbench:3;more:4
     */
    bindFooterTabEvent : function(pageId, tabIndex) {
        // 添加页脚脚本
        var pageDiv = $("#" + pageId);
        console.log('bindFooterTabEvent() pageId:' + pageId);
        if (pageDiv.length != 0) {
            var pageFooterDiv = $("#global_footer_" + pageId);
            if (pageFooterDiv.length != 0) {
                pageFooterDiv.remove();
            }
            Utils.appendHtml(pageId, "include/global_footer_div.html");
            $("#global_footer").attr("id", "global_footer_" + pageId);
            if (tabIndex == null) {
                tabIndex = 0;
            }
            switch (tabIndex) {
                case 0:
                    $("#global_footer_" + pageId + " #footer_home_tab").addClass("ui-btn-active");
                    break;
                case 1:
                    $("#global_footer_" + pageId + " #footer_product_tab").addClass("ui-btn-active");
                    break;
                case 2:
                    $("#global_footer_" + pageId + " #footer_shopcart_tab").addClass("ui-btn-active");
                    break;
                case 3:
                    $("#global_footer_" + pageId + " #footer_workbench_tab").addClass("ui-btn-active");
                    break;
                case 4:
                    $("#global_footer_" + pageId + " #footer_more_tab").addClass("ui-btn-active");
                    break;
            }
            pageFooterDiv = $("#global_footer_" + pageId);
            pageFooterDiv.trigger('create');
            Utils.setCurrentTabIndex(tabIndex);
        }

        // 绑定Tab事件
        $("#global_footer_" + pageId + " #footer_home_tab").off("click").on("click", function() {
            console.log('footer_home_tab() click');
            if ("home_index_page" != $.mobile.activePage.attr("id")) {
                Utils.changeToHomeIndex();
            }
        });
        $("#global_footer_" + pageId + " #footer_product_tab").off("click").on("click", function() {
            console.log('footer_product_tab() click');
            if ("product_index_page" != $.mobile.activePage.attr("id")) {
                Utils.changeToProductIndex();
            }
        });
        $("#global_footer_" + pageId + " #footer_shopcart_tab").off("click").on("click", function() {
            console.log('footer_shopcart_tab() click');
            if ("shopcart_index_page" != $.mobile.activePage.attr("id")) {
                Utils.changeToShopcartIndex();
            }
        });
        $("#global_footer_" + pageId + " #footer_workbench_tab").off("click").on("click", function() {
            console.log('footer_workbench_tab() click');
            if ("workbench_index_page" != $.mobile.activePage.attr("id")) {
                Utils.changeToWorkbenchIndex();
            }
        });
        $("#global_footer_" + pageId + " #footer_more_tab").off("click").on("click", function() {
            console.log('footer_more_tab() click');
            if ("more_index_page" != $.mobile.activePage.attr("id")) {
                Utils.changeToMoreIndex();
            }
        });
    },
   
   
    /**
     * 切换到主首页页面
     */
    changeToHomeIndex : function() {
        Utils.changePageHref({
            pageId : "home_index_page",
            pageJsCallback : function() {
                homeIndexPage.initialize(Constants.tabIndex.HOME);
                Utils.setCurrentTabIndex(Constants.tabIndex.HOME);
            }
        });
    },
    /**
     * 切换到导购首页页面
     */
    changeToProductIndex : function() {
        Utils.changePageHref({
            pageId : "product_index_page",
            pageJsCallback : function() {
                productIndexPage.initialize(Constants.tabIndex.PRODUCT);
                Utils.setCurrentTabIndex(Constants.tabIndex.PRODUCT);
            }
        });
    },
    /**
     * 切换到购物车首页页面
     */
    changeToShopcartIndex : function() {
        Utils.changePageHref({
            pageId : "shopcart_index_page",
            pageJsCallback : function() {
                shopcartIndexPage.initialize(Constants.tabIndex.SHOPCART);
                Utils.setCurrentTabIndex(Constants.tabIndex.SHOPCART);
            }
        });
    },
    /**
     * 切换到我的直供首页页面
     */
    changeToWorkbenchIndex : function() {
        Utils.changePageHref({
            pageId : "workbench_index_page",
            pageJsCallback : function() {
                workbenchIndexPage.initialize(Constants.tabIndex.WORKBENCH);
                Utils.setCurrentTabIndex(Constants.tabIndex.WORKBENCH);
            }
        });
    },
    /**
     * 切换到首页页面
     */
    changeToMoreIndex : function() {
        Utils.changePageHref({
            pageId : "more_index_page",
            pageJsCallback : function() {
                moreIndexPage.initialize(Constants.tabIndex.MORE);
                Utils.setCurrentTabIndex(Constants.tabIndex.MORE);
            }
        });
    },
    /**
     * 转换为带￥的金额字符串
     *
     * @param fee
     * @returns {string}
     */
    formatMoneyStr : function(fee) {
        if (isNaN(fee)) {
            console.log("Utils.formatMoneyStr的输入参数fee：" + fee + "，为非数字！");
            return "￥0.00";
        }
        var isNegative = false;
        if (fee < 0) {
            isNegative = true;
            fee = fee * -1;
        }
        fee = parseFloat((fee + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
        var feeArray = fee.split(".");
        var leftFee = feeArray[0].split("").reverse(), rightFee = feeArray[1];
        var temp = "";
        for (var i = 0; i < leftFee.length; i++) {
            temp += leftFee[i] + ((i + 1) % 3 == 0 && (i + 1) != leftFee.length ? "," : "");
        }
        return "￥" + (isNegative ? "-" : "") + temp.split("").reverse().join("") + "." + rightFee;
    },
    /**
     * 把金额字符串转换为double
     *
     * @param feeString
     * @returns {Number}
     */
    moneyStrToDouble : function(feeString) {
        feeString = $.trim(feeString);
        var index = feeString.indexOf("￥");
        if (index >= 0) {
            feeString = feeString.substring(index + "￥".length);
        }
        return parseFloat(feeString.replace(/[^\d\.-]/g, ""));
    },
    /**
     * 显示暂无图片的图片
     * @param img
     */
    showNoneImage : function(img) {
        img.src = 'img/no_picture.jpg';
    },
	//拦截所有的回退键，调用GoToHome插件跳转到桌面
	eventBackButton : function() {
		Utils.goToHome();
		}
   
};
