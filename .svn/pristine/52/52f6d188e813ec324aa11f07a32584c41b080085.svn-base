var shopcartConfirmPage = {
    _selectedConsId : -1,
    initialize : function(tabIndex, selectedConsId) {
        Utils.bindFooterTabEvent("shopcart_confirm_page", tabIndex);

        shopcartConfirmPage._selectedConsId = selectedConsId;
        shopcartConfirmPage.initData();
    },

    initData : function() {
        console.log("shopcartConfirmPage");

        shopcartConfirmPage._fillOrderListDiv(null);
        shopcartConfirmPage._fillOrderOperDiv(true);

        var httpClient = new HttpClient();
        httpClient.post({
            url : Constants.url.SHOP_CART_COMFIRM_043,
            params : {
                consId : shopcartConfirmPage._selectedConsId
            },
            timeoutForwardCallback : shopcartConfirmPage.initData,
            showIntfSuccessMsg : false,
            intfSuccessCallBack : function(dataObj, msg) {
                // 填充订单列表数据
                shopcartConfirmPage._fillOrderListDiv(dataObj.orderList);
                shopcartConfirmPage._fillOrderOperDiv(false);
            }
        });
    },
    /**
     * 填充订单列表块
     *
     * @param orderListObj
     *             购物车首页的订单列表数据对象
     * @private
     */
    _fillOrderListDiv : function(orderListObj) {
        var orderListDiv = $("#shopcart_confirm_order_list_div");
        orderListDiv.empty();
        if (orderListObj == null) {
            return;
        }
        var orderCount = orderListObj.length;
        for (var i = 0; i < orderCount; i++) {
            shopcartConfirmPage._appendOrderItemToList(orderListDiv, orderListObj[i], i);
        }
        orderListDiv.trigger("create");
    },
    /**
     * 添加订单项到订单列表块
     *
     * @param orderListDiv
     *             订单列表块
     * @param orderInfoObj
     *             订单信息数据对象
     * @param index
     *             订单信息数据索引
     * @private
     */
    _appendOrderItemToList : function(orderListDiv, orderInfoObj, index) {
        var orderInfoDivId = 'shopcart_confirm_order_' + index;
        var orderInfoDiv = $('<div></div>').attr('id', orderInfoDivId);
        orderInfoDiv.append($('<h2></h2>').html(orderInfoObj.orderTitle));
        orderListDiv.append(orderInfoDiv);

        var i = 0;
        // 发货单信息块
        var sendInfoListObj = orderInfoObj.sendList;
        var provideCount = sendInfoListObj.length;
        for (i = 0; i < provideCount; i++) {
            shopcartConfirmPage._appendSendItemToOrder(orderInfoDiv, sendInfoListObj[i], i, orderInfoDivId);
        }
        // 分割线块
        var orderSplitLineDiv = $('<div></div>');
        // 赠送信息块
        var orderActGiftInfoDiv = $('<div></div>');
        var orderActGiftInfoListObj = orderInfoObj.actGiftInfoList;
        if (orderActGiftInfoListObj != null) {
            var orderActGiftInfoCount = orderActGiftInfoListObj.length;
            for (i = 0; i < orderActGiftInfoCount; i++) {
                orderActGiftInfoDiv.append('<p>' + orderActGiftInfoListObj[i].actInfo + '</p>');
            }
        }
        // 订单费用块
        var orderPriceInfoDiv = $('<div></div>');
        orderPriceInfoDiv.append('<p>+产品费用：' + Utils.formatMoneyStr(orderInfoObj.orderPriceInfo.totalProductPrice) + '</p>');
        orderPriceInfoDiv.append('<p>-优惠：' + Utils.formatMoneyStr(orderInfoObj.orderPriceInfo.totalActPrice) + '</p>');
        orderPriceInfoDiv.append('<p>+运费：' + Utils.formatMoneyStr(orderInfoObj.orderPriceInfo.totalTransCost) + '</p>');
        orderPriceInfoDiv.append('<p>应付金额：' + Utils.formatMoneyStr(orderInfoObj.orderPriceInfo.totalOrderAmount) + '</p>');

        orderListDiv.append(orderSplitLineDiv, orderActGiftInfoDiv, orderPriceInfoDiv);
    },
    /**
     * 添加发货单项到订单项
     *
     * @param orderInfoDiv
     *             订单项块
     * @param sendInfoObj
     *             发货单信息数据对象
     * @param index
     *             发货单信息数据索引
     * @param orderInfoDivId
     *             订单项块ID
     * @private
     */
    _appendSendItemToOrder : function(orderInfoDiv, sendInfoObj, index, orderInfoDivId) {
        var sendInfoDivId = orderInfoDivId + '_' + index;
        var sendInfoDiv = $('<div></div>').attr('id', sendInfoDivId);
        sendInfoDiv.append($('<p></p>').html(sendInfoObj.sendTitle));
        orderInfoDiv.append(sendInfoDiv);

        var provideInfoListObj = sendInfoObj.list;
        var provideCount = provideInfoListObj.length;
        for (var i = 0; i < provideCount; i++) {
            shopcartConfirmPage._appendProvideItemToSend(sendInfoDiv, provideInfoListObj[i], i, sendInfoDivId);
        }
    },
    /**
     * 添加供应商项到发货单项
     *
     * @param sendInfoDiv
     *             发货单块
     * @param provideInfoObj
     *             供应商信息数据对象
     * @param index
     *             供应商信息数据索引
     * @param sendInfoDivId
     *             发货单块ID
     * @private
     */
    _appendProvideItemToSend : function(sendInfoDiv, provideInfoObj, index, sendInfoDivId) {
        var provideInfoDivId = sendInfoDivId + '_' + index;
        var provideInfoDiv = $('<div></div>').attr('id', provideInfoDivId);
        provideInfoDiv.append($('<p></p>').html('供应商：' + provideInfoObj.provName));
        sendInfoDiv.append(provideInfoDiv);

        var productInfoListObj = provideInfoObj.list;
        var productCount = productInfoListObj.length;
        for (var i = 0; i < productCount; i++) {
            shopcartConfirmPage._appendProductItemToProvide(provideInfoDiv, productInfoListObj[i], i, provideInfoDivId);
        }
    },
    /**
     * 添加产品项到供应商项
     *
     * @param provideInfoDiv
     *             供应商项块
     * @param productInfoObj
     *             产品信息数据对象
     * @param index
     *             产品信息数据索引
     * @param provideInfoDivId
     *             供应商项块ID
     * @private
     */
    _appendProductItemToProvide : function(provideInfoDiv, productInfoObj, index, provideInfoDivId) {
        var productInfoDivId = provideInfoDivId + '_' + index;
        var productInfoDiv = $('<div></div>').attr('id', productInfoDivId);

        // 产品描述块
        var productBriefInfoDivId = productInfoDivId + '_brief_';
        var productBriefInfoDiv = $('<div data-role="fieldcontain"></div>').attr('id', productBriefInfoDivId);
        var productBriefInfoFieldset = $('<fieldset data-role="controlgroup"></fieldset>');
        // 产品图片
        productBriefInfoFieldset.append('<legend><img alt="" src="' + productInfoObj.picPath5Url +
            '" onerror="Utils.showNoneImage(this)"></legend>');
        // 产品长名称
        var productBriefNameStr = productInfoObj.brandName + '&nbsp' + productInfoObj.pattern + '&nbsp' +
            productInfoObj.colorSpec;
        if (productInfoObj.isGift == 1) {
            productBriefNameStr += "（赠品）";
        }
        productBriefInfoFieldset.append('<p><strong>' + productBriefNameStr + '</strong></p>');
        // 产品数量
        var productBriefInfoQuantityP = $('<p>数量：</p>');
        var productBriefInfoQuantitySpan = $('<span></span>').html(productInfoObj.quantity);
        productBriefInfoQuantityP.append(productBriefInfoQuantitySpan);
        // 产品单价
        var productBriefInfoCurrentPriceP = $('<p>单价：</p>');
        var productBriefInfoCurrentPriceSpan = $('<span></span>').html(Utils.formatMoneyStr(productInfoObj.currentPrice));
        productBriefInfoCurrentPriceP.append(productBriefInfoCurrentPriceSpan);
        // 产品优惠
        var productBriefInfoActPriceP = $('<p>优惠：</p>');
        var productBriefInfoActPriceSpan = $('<span></span>').html(Utils.formatMoneyStr(productInfoObj.actPrice));
        productBriefInfoActPriceP.append(productBriefInfoActPriceSpan);

        productBriefInfoFieldset.append(productBriefInfoQuantityP, productBriefInfoCurrentPriceP, productBriefInfoActPriceP);

        productBriefInfoDiv.append(productBriefInfoFieldset);

        // 产品级活动信息块
        var productActInfoDiv = $('<div></div>');
        if (productInfoObj.isGift == 1) {
            productActInfoDiv.append('<p>' + productInfoObj.activityDesc + '</p>');
        }

        productInfoDiv.append(productBriefInfoDiv, productActInfoDiv);

        provideInfoDiv.append(productInfoDiv);

        // 产品点击跳转到产品详情页面的事件
        productBriefInfoDiv.off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "product_detail_page",
                pageJsCallback : function() {
                    productDetailPage.initialize(Constants.tabIndex.SHOPCART, productInfoObj.productId);
                }
            });
        });
    },
    /**
     * 购物车订单生成
     *
     * @private
     */
    _shopcartOrder : function() {
        var httpClient = new HttpClient();
        httpClient.post({
            url : Constants.url.SHOP_CART_ORDER_044,
            timeoutForwardCallback : shopcartConfirmPage._shopcartOrder,
            intfSuccessCallBack : function(dataObj, msg) {
                shopcartUtil.clearCart();
                // 切换页面到购物车订单生成结果页面
                Utils.changePageHref({
                    pageId : "shopcart_ordersuccess_page",
                    pageJsCallback : function() {
                        shopcartOrdersuccessPage.initialize(Constants.tabIndex.SHOPCART, dataObj);
                    }
                });
            }
        });
    },
    /**
     * 填充订单列表块
     *
     * @param orderListObj
     *             购物车首页的订单列表数据对象
     * @private
     */
    _fillOrderOperDiv : function(isClear) {
        var orderOperDiv = $("#shopcart_confirm_order_oper_div");
        orderOperDiv.empty();
        if (isClear) {
            return;
        }

        var nbspP = $('<p>&nbsp</p>');
        var orderOperP = $('<p></p>');
        var orderOperCreate = $('<a href="#" id="shopcart_confirm_order" data-role="button" data-icon="check" data-iconpos="left">提交订单</a>');

        orderOperP.append(orderOperCreate);
        orderOperDiv.append(nbspP, orderOperP);

        orderOperCreate.off("click").on("click", shopcartConfirmPage._shopcartOrder);

        orderOperDiv.trigger("create");
    }

};
