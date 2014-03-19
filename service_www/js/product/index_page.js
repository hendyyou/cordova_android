var productIndexPage = {
	initialize : function(tabIndex) {
		Utils.bindFooterTabEvent("product_index_page", tabIndex);

		this.initData();

		$("#product_mobile").off("click").on("click", function() {
			Utils.changePageHref({
				pageId : "product_classify_phone_page",
				pageJsCallback : function() {
					productClassifyPhonePage.initialize(Constants.tabIndex.PRODUCT);
				},
			});
		});
		$("#product_accessory").off("click").on("click", function() {

			Utils.changePageHref({
				pageId : "product_accessorylist_page",
				pageJsCallback : function() {
					accessorylistPage.initialize(Constants.tabIndex.PRODUCT, {
						listTitle : "终端配件",
						params : {
							typeId : 2, // 
						}
					});
				}
			});
		});
		$("#product_surfingcard").off("click").on("click", function() {
			Utils.changePageHref({
				pageId : "product_accessorylist_page",
				pageJsCallback : function() {
					accessorylistPage.initialize(Constants.tabIndex.PRODUCT, {
						listTitle : "天翼云卡",
						params : {
							typeId : 7, // 
						}
					});
				},
			});
		});
	},

	initData : function() {
		console.log("productIndexPage");
	},

};
