var shopcartOrdersuccessPage = {
    // 订单生成结果对象
    _orderResultObj : {},
    /**
     * 初始化界面
     * @param tabIndex 当前的Tab索引
     * @param orderResultObj 订单生成结果对象
     */
    initialize : function(tabIndex, orderResultObj) {
        Utils.bindFooterTabEvent("shopcart_ordersuccess_page", tabIndex);

        shopcartOrdersuccessPage._orderResultObj = orderResultObj;
        shopcartOrdersuccessPage.initData();
    },
    /**
     * 初始化界面数据
     */
    initData : function() {
        console.log("shopcartOrdersuccessPage");

        shopcartOrdersuccessPage._fillOrderListDiv(shopcartOrdersuccessPage._orderResultObj);
    },
    /**
     * 填充订单列表块
     *
     * @param orderResultObj
     *             购物车结果的订单列表数据对象
     * @private
     */
    _fillOrderListDiv : function(orderResultObj) {
        var orderSuccessInfoDiv = $("#shopcart_ordersuccess_info_div");
        orderSuccessInfoDiv.empty();
        if (orderResultObj == null || orderResultObj.length == 0) {
            return;
        }
        var orderListObj = orderResultObj.orderInfoList;
        var orderCount = orderListObj.length;
        for (var i = 0; i < orderCount; i++) {
            shopcartOrdersuccessPage._appendOrderItemToList(orderSuccessInfoDiv, orderListObj[i], i);
        }
        orderSuccessInfoDiv.trigger("create");
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
        var orderInfoDivId = 'shopcart_ordersuccess_order_' + index;
        var orderInfoDiv = $('<div></div>').attr('id', orderInfoDivId);
        orderInfoDiv.append($('<h2></h2>').html(orderInfoObj.orderTitle));
        if (orderInfoObj.isSucceed == 1) {
            // 订单生成成功
            // 订单编号
            var orderNoP = $('<p>订单编号：</p>');
            var orderNoSpan = $('<span></span>').html(orderInfoObj.orderNo);
            orderNoP.append(orderNoSpan);
            // 订单状态
            var orderPayStatusP = $('<p>订单状态：</p>');
            var orderPayStatusSpan = $('<span></span>').html(orderInfoObj.orderPayStatus);
            orderPayStatusP.append(orderPayStatusSpan);
            // 应付金额
            var totalOrderAmountP = $('<p>应付金额：</p>');
            var totalOrderAmountSpan = $('<span></span>').html(Utils.formatMoneyStr(orderInfoObj.totalOrderAmount));
            totalOrderAmountP.append(totalOrderAmountSpan);

            var orderOperDiv = $('<div class="ui-grid-a"></div>');
            // 在线支付块
            var orderOperLeftDiv = $('<div class="ui-block-a"></div>');
            var orderOperLeftPayId = orderInfoDivId + '_pay_a-' + orderInfoObj.orderId;
            var orderOperLeftPay = $('<a href="#" data-role="button">在线支付</a>').attr('id',
                orderOperLeftPayId);
            orderOperLeftDiv.append(orderOperLeftPay);
            // 查看订单块
            var orderOperRightDiv = $('<div class="ui-block-b"></div>');
            var orderOperRightDetailId = orderInfoDivId + '_detail_a-' + orderInfoObj.orderId;
            var orderOperRightDetail = $('<a href="#" data-role="button">查看订单</a>').attr('id',
                orderOperRightDetailId);
            orderOperRightDiv.append(orderOperRightDetail);

            orderOperDiv.append(orderOperLeftDiv, orderOperRightDiv);

            orderInfoDiv.append(orderNoP, orderPayStatusP, totalOrderAmountP, orderOperDiv);

            orderListDiv.append(orderInfoDiv);

            // 在线支付的事件
            orderOperLeftPay.off("click").on("click", function() {
                bestpayUtil.payOrder("shopcart_ordersuccess_page", orderInfoObj.orderId);
            });

            // 查看订单的事件
            orderOperRightDetail.off("click").on("click", function() {
                Utils.changePageHref({
                    pageId : "workbench_orderdetail_page",
                    pageJsCallback : function() {
                        workbenchOrderdetailPage.initialize(Constants.tabIndex.SHOPCART, orderInfoObj.orderId);
                    }
                });
            });
        } else {
            // 订单生成失败
            var failedMsgP = $('<p></p>');
            var failedMsgSpan = $('<span></span>').html(orderInfoObj.failedMsg);
            failedMsgP.append(failedMsgSpan);

            orderInfoDiv.append(failedMsgP);

            orderListDiv.append(orderInfoDiv);
        }
    }

};
