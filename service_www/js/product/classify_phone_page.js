var productClassifyPhonePage = {
	_queryType : {
		BRAND_TYPE : 0,
		PRICE_TYPE : 1,
		SCREEN_TYPE : 2,
		NET_TYPE : 3,
		OS_TYPE : 4
	},
	initialize : function(tabIndex) {
		Utils.bindFooterTabEvent("product_classify_phone_page", tabIndex);
		this.loadPnoneBrand();
		$("#select-submit").off("click").on("click", this.selectButtonClick);
	},
	initData : function() {
		console.log("productClassifyPhonePage");
	},
	selectButtonClick : function() {
		Utils.changePageHref({
			pageId : "product_productlist_page",
			pageJsCallback : function() {
				var submitObj = {
					listTitle : "手机",
					params : {
						typeId : 1, // 1是手机
						brand : $('#select-brand').val(),
						minAdvicePrice : $('#select-price').val() == "" ? "" : $('#select-price').val().split('-')[0],
						maxAdvicePrice : $('#select-price').val() == "" ? "" : $('#select-price').val().split('-')[1],
						minScreenSize : $('#select-screen').val() == "" ? "" : $('#select-screen').val().split('-')[0],
						maxScreenSize : $('#select-screen').val() == "" ? "" : $('#select-screen').val().split('-')[1],
						netType : $('#select-nettype').val(),
						os : $('#select-os').val()
					}
				};

				productListPage.initialize(Constants.tabIndex.PRODUCT, submitObj);
			}
		});
	},

	// 加载品牌
	loadPnoneBrand : function() {
		// 品牌
		var productBrandDataStr = sessionStorage.getItem(Constants.argName.session.productBrandData);
		if (productBrandDataStr == null || productBrandDataStr == '') {
			var brandhttpClient = new HttpClient();
			brandhttpClient.post({
				url : Constants.url.LOAD_BRAND_015,
				isCheckTimeout : false,
				showIntfSuccessMsg : false,
				intfSuccessCallBack : function(dataObj, msg) {
					sessionStorage.removeItem(Constants.argName.session.productBrandData);
					sessionStorage.setItem(Constants.argName.session.productBrandData, JSON.stringify(dataObj));
					// 填充数据
					productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.BRAND_TYPE, dataObj);
				}
			});
		} else {
			productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.BRAND_TYPE, $
					.parseJSON(productBrandDataStr));
		}

		// 价格区间
		var productPriceDataStr = sessionStorage.getItem(Constants.argName.session.productPriceData);
		if (productPriceDataStr == null || productPriceDataStr == '') {
			var pricehttpClient = new HttpClient();
			pricehttpClient.post({
				url : Constants.url.LOAD_ADVICE_PRICE_RANGE_019,
				isCheckTimeout : false,
				showIntfSuccessMsg : false,
				intfSuccessCallBack : function(dataObj, msg) {
					sessionStorage.removeItem(Constants.argName.session.productPriceData);
					sessionStorage.setItem(Constants.argName.session.productPriceData, JSON.stringify(dataObj));
					// 填充数据
					productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.PRICE_TYPE, dataObj);
				}
			});
		} else {
			productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.PRICE_TYPE, $
					.parseJSON(productPriceDataStr));
		}

		// 主显示屏
		var productScreenDataStr = sessionStorage.getItem(Constants.argName.session.productScreenData);
		if (productScreenDataStr == null || productScreenDataStr == '') {
			var screenhttpClient = new HttpClient();
			screenhttpClient.post({
				url : Constants.url.LOAD_SCREEN_SIZE_RANGE_018,
				isCheckTimeout : false,
				showIntfSuccessMsg : false,
				intfSuccessCallBack : function(dataObj, msg) {
					sessionStorage.removeItem(Constants.argName.session.productScreenData);
					sessionStorage.setItem(Constants.argName.session.productScreenData, JSON.stringify(dataObj));
					// 填充数据
					productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.SCREEN_TYPE, dataObj);
				}
			});
		} else {
			productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.SCREEN_TYPE, $
					.parseJSON(productScreenDataStr));
		}

		// 网络制式
		var productNetTypeDataStr = sessionStorage.getItem(Constants.argName.session.productNetTypeData);
		if (productNetTypeDataStr == null || productNetTypeDataStr == '') {
			var nethttpClient = new HttpClient();
			nethttpClient.post({
				url : Constants.url.LOAD_NET_TYPE_017,
				isCheckTimeout : false,
				showIntfSuccessMsg : false,
				intfSuccessCallBack : function(dataObj, msg) {
					sessionStorage.removeItem(Constants.argName.session.productNetTypeData);
					sessionStorage.setItem(Constants.argName.session.productNetTypeData, JSON.stringify(dataObj));
					// 填充数据
					productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.NET_TYPE, dataObj);
				}
			});
		} else {
			productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.NET_TYPE, $
					.parseJSON(productNetTypeDataStr));
		}

		// 操作系统
		var productOSDataStr = sessionStorage.getItem(Constants.argName.session.productOSData);
		if (productOSDataStr == null || productOSDataStr == '') {
			var oshttpClient = new HttpClient();
			oshttpClient.post({
				url : Constants.url.LOAD_OPERATING_SYTEM_016,
				isCheckTimeout : false,
				showIntfSuccessMsg : false,
				intfSuccessCallBack : function(dataObj, msg) {
					sessionStorage.removeItem(Constants.argName.session.productOSData);
					sessionStorage.setItem(Constants.argName.session.productOSData, JSON.stringify(dataObj));
					// 填充数据
					productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.OS_TYPE, dataObj);
				}
			});
		} else {
			productClassifyPhonePage._successCallback(productClassifyPhonePage._queryType.OS_TYPE, $
					.parseJSON(productOSDataStr));
		}
	},

	_successCallback : function(type, dataObj) {
		var i = 0;
		// 设置品牌列表
		switch (type) {
		case productClassifyPhonePage._queryType.BRAND_TYPE:
			for (i = 0; i < dataObj.length; i++) {
				$('#select-brand').append(
						'<option value="' + dataObj[i].brandId + '" >' + dataObj[i].brandName + '</option>');
			}
			break;
		case productClassifyPhonePage._queryType.PRICE_TYPE:
			for (i = 0; i < dataObj.length; i++) {
				$('#select-price').append(
						'<option value="' + dataObj[i].minAdvicePrice + '-' + dataObj[i].maxAdvicePrice + '" >'
								+ dataObj[i].advicePriceRangeName + '</option>');
			}
			break;
		case productClassifyPhonePage._queryType.SCREEN_TYPE:
			for (i = 0; i < dataObj.length; i++) {
				$('#select-screen').append(
						'<option value="' + dataObj[i].minScreenSize + '-' + dataObj[i].maxScreenSize + '" >'
								+ dataObj[i].screenSizeRangeName + '</option>');
			}
			break;
		case productClassifyPhonePage._queryType.NET_TYPE:
			for (i = 0; i < dataObj.length; i++) {
				$('#select-nettype').append(
						'<option value="' + dataObj[i].mobileNetTypeId + '" >' + dataObj[i].mobileNetTypeName + '</option>');
			}
			break;
		case productClassifyPhonePage._queryType.OS_TYPE:
			for (i = 0; i < dataObj.length; i++) {
				$('#select-os').append(
						'<option value="' + dataObj[i].operatingSystemId + '" >' + dataObj[i].operatingSystemName
								+ '</option>');
			}
			break;
		default:
			break;
		}
	}

};
