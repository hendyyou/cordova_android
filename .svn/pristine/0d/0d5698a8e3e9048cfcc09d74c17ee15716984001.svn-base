var shopcartChannelPage = {
    _selectedConsId : -1,
    initialize : function(tabIndex, selectedConsId) {
        Utils.bindFooterTabEvent("shopcart_channel_page", tabIndex);

        shopcartIndexPage._selectedConsId = selectedConsId;

        shopcartChannelPage.initData();

        $("#shopcart_channel_commit").off("click").on("click", function() {
            var confirmInfo = "";
            var shopcart_channel_id = $.trim($("#shopcart_channel_id").val());
            var shopcart_channel_remark = $.trim($("#shopcart_channel_remark").val());
            if (shopcart_channel_id == "" && shopcart_channel_remark == "") {
                $("#shopcart_channel_id").focus();
                Utils.drawToast("请输入渠道编码");
                return;
            } else if (shopcart_channel_id != "" && shopcart_channel_remark == "") {
                confirmInfo = "渠道编码：" + shopcart_channel_id + "\n确认提交后，信息不再允许修改！";
            } else if (shopcart_channel_id == "" && shopcart_channel_remark != "") {
                confirmInfo = "备注信息：" + shopcart_channel_remark + "\n确认提交后，信息不再允许修改！";
            } else if (shopcart_channel_id != "" && shopcart_channel_remark != "") {
                confirmInfo = "渠道编码：" + shopcart_channel_id + "备注信息：" + shopcart_channel_remark + "\n确认提交后，信息不再允许修改！";
            }
            if (confirm(confirmInfo)) {
                // 保存渠道信息
                var httpClient = new HttpClient();
                httpClient.post({
                    url : Constants.url.SHOP_CART_CHANNEL_038,
                    params : {
                        channelId : shopcart_channel_id,
                        channelRemark : shopcart_channel_remark
                    },
                    timeoutForwardCallback : shopcartChannelPage.initData,
                    intfSuccessCallBack : function(dataObj, msg) {
                        if (shopcart_channel_id != "") {
                            // 返回上一个页面
                            navigator.app.backHistory();
                        }
                        var intervalCounter = setInterval(function() {
                            clearInterval(intervalCounter);
                            // 切换到购物车确认页面
                            shopcartChannelPage._changeToConfirmPage(shopcartIndexPage._selectedConsId);
                        }, 500);
                    }
                });
            }
        });

        $("#shopcart_channel_skip").off("click").on("click", function() {
            if (confirm("\t\t为了更好的为您结算酬金，请提供门店相对应的渠道编码，若不清楚渠道编码请咨询门店服务经理！\n\t\t若不提供渠道编码可能会导致无法结算酬金！")) {
                // 切换到购物车确认页面
                shopcartChannelPage._changeToConfirmPage(shopcartIndexPage._selectedConsId);
            }
        });
    },

    initData : function(selectedConsId) {
        console.log("shopcartChannelPage");

    },

    _changeToConfirmPage : function(selectedConsId) {
        Utils.changePageHref({
            pageId : "shopcart_confirm_page",
            pageJsCallback : function() {
                shopcartConfirmPage.initialize(Constants.tabIndex.SHOPCART, selectedConsId);
            }
        });
    }
};
