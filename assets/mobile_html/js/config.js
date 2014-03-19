$(document).bind("mobileinit", function(){
	$.mobile.loadingMessage = "加载中...";
	$.mobile.pageLoadErrorMessage = '页面加载失败！';
	$.mobile.defaultPageTransition = "none";
	$.mobile.defaultDialogTransition = "none";
	//在当手机弹出键盘，工具栏固定，不隐藏
	$.mobile.fixedtoolbar.prototype.options.hideDuringFocus = "";
	$.mobile.fixedtoolbar.prototype.options.tapToggle = false;
});
var stHistoryList = [];
var stHistoryClear = {login_login:1,index:1,product_productIndex:1,order_cartIndex:1,account_accountIndex:1};
var config_headerHTML = '<div data-role="header" style="display:none" data-position="fixed" class="header"><a onclick="historyBack()"><em class="icon icon-back"></em></a></div>';
var config_footerHTML = '<div data-role="footer" data-position="fixed" data-id="myFooter" class="footer"><div data-role="navbar" data-iconpos="top"><ul><li footer-focus="index"><a data-icon="home" onclick="locationHref(\'/index.html\')">首页</a></li><li footer-focus="product_productIndex"><a data-icon="product" onclick="locationHref(\'/product/product-index.html\')">产品中心</a></li><li footer-focus="order_cartIndex"><a data-icon="shop" onclick="locationHref(\'/order/cart-index.html\')">购物车</a></li><li footer-focus="account_accountIndex"><a data-icon="user" onclick="locationHref(\'/account/account-index.html\')">信息中心</a></li></ul></div></div>';

function loadPageFinish(){
	var sUrl = "/login/login.html";
	locationHref(sUrl);
}