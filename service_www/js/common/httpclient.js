// =========================== 网络调用 HttpClient 公用部分 ===========================
// HttpClient基类定义
/**
 * HttpClient网络请求对象定义
 *
 * @param httpClientObj
 *            构造对象<br>
 *            isCheckTimeout:是否判断超时执行超时处理,true:是;false:否。<br>
 *            timeoutForwardCallback:超时后，成功登陆的跳转回调方法<br>
 *            timeoutForwardArgObj:超时后，成功登陆的跳转回调方法的参数对象<br>
 *            intfSuccessCallBack:接口调用返回成功后的处理回调方法。方法原型：function(dataObj, msg)<br>
 *            intfFailureCallBack:接口调用返回失败后的处理回调方法。方法原型：function(dataObj, msg, failureCode)<br>
 *            intfTimeoutCallBack:接口调用返回超时后的处理回调方法。方法原型：function(dataObj, msg, failureCode)如果设置了这个方法，则会覆盖原有的超时处理的默认方法<br>
 *            httpFailureCallBack:接口调用失败后的处理回调方法。方法原型：function()<br>
 *            showIntfSuccessMsg:是否显示接口调用返回成功提示,true:是;false:否。<br>
 *            showIntfFailureMsg:是否显示接口调用返回失败提示,true:是;false:否。<br>
 *            showIntfTimeoutMsg:是否显示接口调用返回超时提示,true:是;false:否。<br>
 *            showHttpFailureMsg:是否显示接口调用失败提示,true:是;false:否。<br>
 * @returns {HttpClient} 返回调用对象
 */
function HttpClient(httpClientObj) {
    if (httpClientObj === undefined) {
        this._showIntfSuccessMsg = true;
        this._showIntfFailureMsg = true;
        this._showIntfTimeoutMsg = true;
        this._showHttpFailureMsg = true;
        return this;
    } else {
        if (typeof httpClientObj.isCheckTimeout != 'undefined') {
            this.isCheckTimeout = httpClientObj.isCheckTimeout;
        }
        if (typeof httpClientObj.timeoutForwardCallback != 'undefined') {
            this._timeoutForwardCallback = httpClientObj.timeoutForwardCallback;
        }
        if (typeof httpClientObj.timeoutForwardArgObj != 'undefined') {
            this._timeoutForwardArgObj = httpClientObj.timeoutForwardArgObj;
        }
        if (typeof httpClientObj.intfSuccessCallBack != 'undefined') {
            this._intfSuccessCallBack = httpClientObj.intfSuccessCallBack;
        }
        if (typeof httpClientObj.intfFailureCallBack != 'undefined') {
            this._intfFailureCallBack = httpClientObj.intfFailureCallBack;
        }
        if (typeof httpClientObj.intfTimeoutCallBack != 'undefined') {
            this._intfTimeoutCallBack = httpClientObj.intfTimeoutCallBack;
        }
        if (typeof httpClientObj.httpFailureCallBack != 'undefined') {
            this._httpFailureCallBack = httpClientObj.httpFailureCallBack;
        }
        if (typeof httpClientObj.showIntfSuccessMsg == 'undefined') {
            this._showIntfSuccessMsg = true;
        } else {
            this._showIntfSuccessMsg = httpClientObj.showIntfSuccessMsg;
        }
        if (typeof httpClientObj.showIntfFailureMsg == 'undefined') {
            this._showIntfFailureMsg = true;
        } else {
            this._showIntfFailureMsg = httpClientObj.showIntfFailureMsg;
        }
        if (typeof httpClientObj.showIntfTimeoutMsg == 'undefined') {
            this._showIntfTimeoutMsg = true;
        } else {
            this._showIntfTimeoutMsg = httpClientObj.showIntfTimeoutMsg;
        }
        if (typeof httpClientObj.showHttpFailureMsg == 'undefined') {
            this._showHttpFailureMsg = true;
        } else {
            this._showHttpFailureMsg = httpClientObj.showHttpFailureMsg;
        }
    }

    return this;
};

// HttpClient基类接口原型定义
HttpClient.prototype = {
    // 接口调用成功msgCode=1处理接口
    intfSuccess : function(dataObj, msg) {
        if (this._showIntfSuccessMsg) {
            Utils.drawToast(msg);
        }
        if (typeof this._intfSuccessCallBack == 'function') {
            this._intfSuccessCallBack(dataObj, msg);
        }
    },
    // 接口调用失败msgCode=2处理接口
    intfFailure : function(dataObj, msg, failureCode) {
        if (this._showIntfFailureMsg) {
            Utils.drawToast(msg);
        }
        if (typeof this._intfFailureCallBack == 'function') {
            this._intfFailureCallBack(dataObj, msg, failureCode);
        }
    },
    // 接口调用超时msgCode=3处理接口
    intfTimeout : function(dataObj, msg, failureCode) {
        if (this._showIntfTimeoutMsg) {
            Utils.drawToast(msg);
        }
        if (typeof this._intfTimeoutCallBack == 'function') {
            this._intfTimeoutCallBack(dataObj, msg, failureCode);
        } else {
      //      Utils.changeToUserLogin(this._timeoutForwardCallback, this._timeoutForwardArgObj);
        }
    },
    // 网络请求调用成功处理接口
    httpSuccess : function(returnObj) {
        console.log('httpSuccess() returnObj.msgCode:' + returnObj.msgCode);
        if (returnObj.msgCode == Constants.msgCode.Success) {
            this.intfSuccess(returnObj.entity, returnObj.msg);
        } else if (returnObj.msgCode == Constants.msgCode.Failure) {
            this.intfFailure(returnObj.entity, returnObj.msg, returnObj.failureCode);
        } else if (returnObj.msgCode == Constants.msgCode.Timeout && this.isCheckTimeout) {
            this.intfTimeout(returnObj.entity, returnObj.msg, returnObj.failureCode);
        }
    },
    // 网络请求调用失败处理接口
    httpFailure : function() {
        console.log('httpFailure()');
        if (this._showHttpFailureMsg) {
            Utils.drawToast("网络无法访问！");
        }
        if (typeof this._httpFailureCallBack == 'function') {
            this._httpFailureCallBack();
        }
    },
    /**
     * POST方式异步调用网络请求处理接口
     *
     * @param postObj
     *            POST的数据对象<br>
     *            url:网络请求Url。<br>
     *            params:网络请求的参数数据对象。<br>
     *            waitTagId:等待图片区域ID。设置后，网络请求不再显示等待窗口，而是使用等待图片在指定区域显示。<br>
     *            isCheckTimeout:是否判断超时执行超时处理,true:是;false:否。不设置默认true。<br>
     *            timeoutForwardCallback:超时后，成功登陆的跳转回调方法<br>
     *            timeoutForwardArgObj:超时后，成功登陆的跳转回调方法的参数对象<br>
     *            intfSuccessCallBack:接口调用返回成功后的处理回调方法。方法原型：function(dataObj, msg)<br>
     *            intfFailureCallBack:接口调用返回失败后的处理回调方法。方法原型：function(dataObj, msg, failureCode)<br>
     *            intfTimeoutCallBack:接口调用返回超时后的处理回调方法。方法原型：function(dataObj, msg, failureCode)如果设置了这个方法，则会覆盖原有的超时处理的默认方法<br>
     *            httpFailureCallBack:接口调用失败后的处理回调方法。方法原型：function()<br>
     *            showIntfSuccessMsg:是否显示接口调用返回成功提示,true:是;false:否。<br>
     *            showIntfFailureMsg:是否显示接口调用返回失败提示,true:是;false:否。<br>
     *            showIntfTimeoutMsg:是否显示接口调用返回超时提示,true:是;false:否。<br>
     *            showHttpFailureMsg:是否显示接口调用失败提示,true:是;false:否。<br>
     * @returns {Boolean}
     */
    post : function(postObj) {
		/*if(!navigator.onLine){
			Utils.drawToast('网络连接不可用');
			Utils.hideLoading();
			return;
		}*/
		
        postObj.url = $.trim(postObj.url);
        if (postObj.url == '') {
            alert('url不能为空!');
            return false;
        }
        if (postObj.url.indexOf(Constants.remote_url_prefix) == -1) {
            if (postObj.url.substring(0, 1) == '/') {
                postObj.url = Constants.remote_url_prefix_apache + postObj.url;
            } else {
                postObj.url = Constants.remote_url_prefix_apache + '/' + postObj.url;
            }
        }
        // 加载等待图片
        if (typeof (postObj.waitTagId) != 'undefined' && postObj.waitTagId != '') {
            postObj.waitPicId = Utils.showWaitPic(postObj.waitTagId);
        } else {
            Utils.showLoading();
        }
        var that = this;
        var props = "";
        for (var element in postObj.params) {
            if (typeof (postObj.params[element]) != "function") {
                props += element + "=" + postObj.params[element] + ";";
            }
        }
        console.log('post() url:' + postObj.url + ', params:' + props);

        // 设置默认的超时检查标识
        if (postObj.isCheckTimeout == null) {
            if (that.isCheckTimeout == null) {
                that.isCheckTimeout = true;
            }
        } else {
            that.isCheckTimeout = postObj.isCheckTimeout;
        }

        if (that.isCheckTimeout) {
            var isIntfTimeoutCallBackSet = false;
            // 当需要超时处理时，必须传入超时登陆后跳转的回调方法timeoutForwardCallbak或者重定义intfTimeoutCallBack
            if (postObj.intfTimeoutCallBack != null) {
                if (typeof postObj.intfTimeoutCallBack == 'function') {
                    that._intfTimeoutCallBack = postObj.intfTimeoutCallBack;
                    isIntfTimeoutCallBackSet = true;
                } else {
                    alert("传入的接口调用返回超时后的处理回调方法错误，不是一个可执行的方法！");
                    Utils.hideLoading(true);
                    return false;
                }
            } else if (that._intfTimeoutCallBack != null && (typeof that._intfTimeoutCallBack == 'function')) {
                isIntfTimeoutCallBackSet = true;
            }
            if (!isIntfTimeoutCallBackSet) {
                // 在没有设置过intfTimeoutCallBack时，验证必须传入timeoutForwardCallback的方法
                if (postObj.timeoutForwardCallback != null) {
                    if (typeof postObj.timeoutForwardCallback == 'function') {
                        that._timeoutForwardCallback = postObj.timeoutForwardCallback;
                    } else {
                        alert("传入的超时登陆后跳转的回调方法错误，不是一个可执行的方法！");
                        Utils.hideLoading(true);
                        return false;
                    }
                } else {
                    if (that._timeoutForwardCallback == null) {
                        // alert("超时登陆后跳转的回调方法没有设置！");
                        // Utils.hideLoading(true);
                        // return false;
                    } else if (typeof that._timeoutForwardCallback != 'function') {
                        alert("超时登陆后跳转的回调方法错误，不是一个可执行的方法！");
                        Utils.hideLoading(true);
                        return false;
                    }
                }
                that._timeoutForwardArgObj = postObj.timeoutForwardArgObj;
            }
        }

        if (typeof postObj.intfSuccessCallBack == 'function') {
            that._intfSuccessCallBack = postObj.intfSuccessCallBack;
        }

        if (typeof postObj.intfFailureCallBack == 'function') {
            that._intfFailureCallBack = postObj.intfFailureCallBack;
        }

        if (typeof postObj.httpFailureCallBack == 'function') {
            that._httpFailureCallBack = postObj.httpFailureCallBack;
        }

        if (typeof postObj.showIntfSuccessMsg != 'undefined') {
            this._showIntfSuccessMsg = postObj.showIntfSuccessMsg;
        }
        if (typeof postObj.showIntfFailureMsg != 'undefined') {
            this._showIntfFailureMsg = postObj.showIntfFailureMsg;
        }
        if (typeof postObj.showIntfTimeoutMsg != 'undefined') {
            this._showIntfTimeoutMsg = postObj.showIntfTimeoutMsg;
        }
        if (typeof postObj.showHttpFailureMsg != 'undefined') {
            this._showHttpFailureMsg = postObj.showHttpFailureMsg;
        }

        function postCallBack(data, status) {
            console.log('postCallBack() data:' + data + ', status:' + status);
            if (status == "success") {
                // 成功
                that.httpSuccess.call(that, $.parseJSON(data));
            } else {
                // 失败
                that.httpFailure();
            }
            if (typeof (postObj.waitPicId) != 'undefined') {
                $("#" + postObj.waitPicId).remove();
            }
            Utils.hideLoading();
        }

        $.post(postObj.url, postObj.params, postCallBack);

        return true;
    }
};
