var shopcartIndexPage = {
    _isNeedInputChannelId : false,
    _selectedConsId : -1,
    initialize : function(tabIndex) {
        Utils.bindFooterTabEvent("shopcart_index_page", tabIndex);

      
        shopcartIndexPage._isNeedInputChannelId = false;
        shopcartIndexPage._selectedConsId = -1;
     
       

    }
};
