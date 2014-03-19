//=========================== 公用常量定义部分 ===========================
var Constants = {
    // HTML的根目录（配置为HTML文件所在的apache服务器地址）如果配置为asset_www下的路径，则可将html打包到手机。
    local_url_prefix : "http://192.168.2.38/",
	// 远程后台URL前缀（配置为HTML文件所在的apache服务器地址）
	remote_url_prefix : "http://jstest.189b2b.com",
    // 远程后台URL前缀(apache映射地址)
    remote_url_prefix_apache : "http://192.168.2.38/server",
	
	
    // 接口URL常量定义
    url : {
        // 3.1 用户登录接口URL：json/android/user/userlogin/0/login
        LOGIN_001 : "json/android/user/userlogin/0/login",
        // 3.2 用户登出接口URL：json/android/user/userlogin/0/logout
        LOGOUT_002 : "json/android/user/userlogin/0/logout",
        // 3.3 用户心跳接口URL：json/android/user/userlogin/0/heartbeat
        HEART_BEAT_003 : "json/android/user/userlogin/0/heartbeat",
        // 3.4 用户密码修改接口URL：json/android/user/custpass/1/updatePassword
        PASSWORD_UP_004 : "json/android/user/custpass/1/updatePassword",
        // 3.5 获取用户信息接口URL：json/android/user/userinfo/0/getUserInfo
        USER_INFO_005 : "json/android/user/userinfo/0/getUserInfo",
        // 3.6 获取首页轮播广告接口URL：json/android/index/imagerotate/0/getImageRotate
        HOME_GUANGGAO_IMG_006 : "json/android/index/imagerotate/0/getImageRotate",
        // 3.7 获取推荐产品接口URL：json/android/index/productcote/0/getAssignProduct
        HOME_TUIJIAN_IMG_007 : "json/android/index/productcote/0/getAssignProduct",
        // 3.8 获取收藏商品列表接口URL：json/android/user/favorite/0/index
        MY_FAVORITES_008 : "json/android/user/favorite/0/index",
        // 3.9 添加收藏商品接口URL：json/android/user/favorite/${id}/create
        ADD_FAVORITE_009 : "json/android/user/favorite/${id}/create",
        // 3.10 删除收藏商品接口URL：json/android/user/favorite/${id}/remove
        REMOVE_FAVORITE_010 : "json/android/user/favorite/${id}/remove",
        // 3.11 清空收藏商品接口URL：json/android/user/favorite/0/destroy
        CLEAR_FAVORITE_011 : "json/android/user/favorite/0/destroy",
        // 3.12 获取公告详情接口URL：json/android/content/diginews/${id}/detail
        DIGINEWS_DETAIL_012 : "json/android/content/diginews/${id}/detail",
        // 3.13 加载省份数据接口URL：json/android/common/common/0/loadProvince
        LOAD_PROVINCE_013 : "json/android/common/common/0/loadProvince",
        // 3.14 加载地区数据接口URL：json/android/common/common/${id}/loadArea
        LOAD_AREA_014 : "json/android/common/common/${id}/loadArea",
        // 3.15 加载品牌数据接口URL：json/android/common/common/0/loadBrand
        LOAD_BRAND_015 : "json/android/common/common/0/loadBrand",
        // 3.16 加载操作系统数据接口URL：json/android/common/common/0/loadOperatingSystem
        LOAD_OPERATING_SYTEM_016 : "json/android/common/common/0/loadOperatingSystem",
        // 3.17 加载网络制式数据接口URL：json/android/common/common/0/loadMobileNetType
        LOAD_NET_TYPE_017 : "json/android/common/common/0/loadMobileNetType",
        // 3.18 加载屏幕尺寸区间数据接口URL：json/android/common/common/0/loadScreenSizeRange
        LOAD_SCREEN_SIZE_RANGE_018 : "json/android/common/common/0/loadScreenSizeRange",
        // 3.19 加载零售价格区间数据接口URL：json/android/common/common/0/loadAdvicePriceRange
        LOAD_ADVICE_PRICE_RANGE_019 : "json/android/common/common/0/loadAdvicePriceRange",
        // 3.20 搜索产品接口URL：json/android/product/productfind/0/search
        PRODUCT_SEARCH_020 : "json/android/product/productfind/0/search",
        // 3.21 加载物流商数据接口URL：json/android/common/common/0/loadLogistics
        LOAD_LOGISTICS_021 : "json/android/common/common/0/loadLogistics",
        // 3.22 获取有效的收货地址列表接口URL：json/android/user/custconsignee/0/index
        DELIVERY_ADDR_LIST_022 : "json/android/user/custconsignee/0/index",
        // 3.23 获取收货地址信息接口URL：json/android/user/custconsignee/${id}/getConsignee
        DELIVERY_ADDR_INFO_023 : "json/android/user/custconsignee/${id}/getConsignee",
        // 3.24 新增收货地址接口URL：json/android/user/custconsignee/0/addConsignee
        ADD_DELIVERY_024 : "json/android/user/custconsignee/0/addConsignee",
        // 3.25 修改收货地址接口URL：json/android/user/custconsignee/0/modifyConsignee
        UPDATE_DELIVERY_025 : "json/android/user/custconsignee/0/modifyConsignee",
        // 3.26 查询订单列表接口URL：json/android/sale/order/${id}/index
        ORDER_LIST_026 : "json/android/sale/order/${id}/index",
        // 3.27 新增反馈意见接口URL：json/android/user/feedback/0/create
        ADD_FREEBACK_027 : "json/android/user/feedback/0/create",
        // 3.28 获取订单详情接口URL：json/android/sale/order/${id}/detail
        ORDER_DETAIL_028 : "json/android/sale/order/${id}/detail",
        // 3.29 获取热门专区接口URL：json/android/index/productcote/0/getHotZone
        HOME_HOTZONE_IMG_029 : "json/android/index/productcote/0/getHotZone",
        // 3.30 取消订单接口接口URL：json/android/sale/order/${id}/cancel
        ORDER_CANCEL_030 : "json/android/sale/order/${id}/cancel",
        // 3.31 加载热门搜索数据接口URL：json/android/common/common/0/loadHotSearch
        SEARCH_HOT_031 : "json/android/common/common/0/loadHotSearch",
        // 3.32 获取咨询列表接口URL：json/android/product/consulting/${id}/index
        COUSULTING_INDEX_032 : "json/android/product/consulting/${id}/index",
        // 3.33 创建咨询接口URL：json/android/product/consulting/${id}/create
        COUSULTING_CREATE_033 : "json/android/product/consulting/${id}/create",
        // 3.34 获取产品详情接口URL：json/android/product/productfind/${id}/detail
        PRODUCT_DETAIL_034 : "json/android/product/productfind/${id}/detail",
        // 3.35 获取产品规格接口URL：json/android/product/productfind/${id}/loadSpec
        PRODUCT_SPEC_035 : "json/android/product/productfind/${id}/loadSpec",
        // 3.36 搜索专区产品接口URL：json/android/product/productfind/0/listcote
        PRODUCT_LISTCOTE_036 : "json/android/product/productfind/0/listcote",
        // 3.37 搜索专区产品接口URL：json/android/product/productfind/0/listcoteforjs
        PRODUCT_LISTCOTEFORJS_037 : "json/android/product/productfind/0/listcoteforjs",
        // 3.38 保存渠道编码信息接口URL：json/android/user/userinfo/0/saveChannelInfo
        SHOP_CART_CHANNEL_038 : "json/android/user/userinfo/0/saveChannelInfo",
        // 3.39 添加购物车接口URL：json/android/sale/cart/0/addCart
        ADD_SHOP_CART_039 : "json/android/sale/cart/0/addCart",
        // 3.40 编辑购物车接口URL：json/android/sale/cart/0/editCart
        UPDATE_SHOP_CART_040 : "json/android/sale/cart/0/editCart",
        // 3.41 删除购物车接口URL：json/android/sale/cart/0/removeCart
        REMOVE_SHOP_CART_041 : "json/android/sale/cart/0/removeCart",
        // 3.42 购物车首页接口URL：json/android/sale/cart/0/cartIndex
        SHOP_CART_INDEX_042 : "json/android/sale/cart/0/cartIndex",
        // 3.43 购物车确认接口URL：json/android/sale/cart/0/cartComfirm
        SHOP_CART_COMFIRM_043 : "json/android/sale/cart/0/cartComfirm",
        // 3.44 购物车订单生成接口URL：json/android/sale/cart/0/cartOrder
        SHOP_CART_ORDER_044 : "json/android/sale/cart/0/cartOrder",
        // 3.45 编辑参与售后标识接口URL：json/android/sale/cart/0/editIsAfterser
        EDIT_AFTERSER_SHOP_CART_045 : "json/android/sale/cart/0/editIsAfterser",
        // 3.46 重填购物车接口URL：json/android/sale/cart/0/refillCart
        REFILL_SHOP_CART_046 : "json/android/sale/cart/0/refillCart",
        // 3.47 手机翼支付订单生成接口URL：json/android/payment/bestpay/${id}/makeBestpayOrder
        MAKE_BESTPAY_ORDER_047 : "json/android/payment/bestpay/${id}/makeBestpayOrder",
        // 3.48 保存客户端未捕捉异常信息接口URL：json/android/common/common/0/saveUncatchException
        SAVE_UNCATCH_EXCEPTION_048 : "json/android/common/common/0/saveUncatchException",
        // 3.49 获取客户消息列表接口URL：json/android/user/usermsg/${id}/index
        GET_USERMSG_LIST_049 : "json/android/user/usermsg/${id}/index",
        // 3.50 标记读取客户消息接口URL：json/android/user/usermsg/${id}/readMsg
        READ_USERMSG_050 : "json/android/user/usermsg/${id}/readMsg",
        // 3.51 删除客户消息接口URL：json/android/user/usermsg/${id}/deleteMsg
        DELETE_USERMSG_051 : "json/android/user/usermsg/${id}/deleteMsg"
    },
    // Tab的Index常量定义
    tabIndex : {
        HOME : 0,
        PRODUCT : 1,
        SHOPCART : 2,
        WORKBENCH : 3,
        MORE : 4
    },
    // 接口返回编码的常量定义
    msgCode : {
        Success : 1,
        Failure : 2,
        Timeout : 3
    },
    // 参数名称常量定义
    argName : {
        // session级别的常量定义
        session : {
            userInfo : "session.userInfo",
            homeAdvertData : "session.homeAdvertData",
            homeRecommendData : "session.homeRecommendData",
            homeHotZoneData : "session.homeHotZoneData",
            productBrandData : "session.productBrandData",
            productNetTypeData : "session.productNetTypeData",
            productOSData : "session.productOSData",
            productPriceData : "session.productPriceData",
            productScreenData : "session.productScreenData"
        },
        // 本地存储级别的常量定义
        local : {
            shopcartInfo : "local.shopcartInfo",
            searchKeyword : "local.searchKeyword",
            recentBrowseProduct : "local.recentBrowseProduct",
            bestpayOrderId : "local.bestpayOrderId"
        }
    },
    // 手机翼支付发起的PageID的定义
    bestpayPageIdFlag : {
        // 订单生成结果页面ID：101
        orderSuccessPage : 101,
        // 订单列表页面ID：102
        orderListPage : 102,
        // 订单详情页面ID：103
        orderDetailPage : 103
    },
    // 订单查询类型常量定义
    orderSelectType : {
        // 查询近一个月的订单：1
        currentMonthOrder : 1,
        // 查询一个月前的订单：2
        previousMonthOrder : 2,
        // 查询待付款的订单：3
        pendingPayOrder : 3
    }
};
