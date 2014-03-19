var moreIndexPage = {
    initialize : function(tabIndex) {
        Utils.bindFooterTabEvent("more_index_page", tabIndex);

        moreIndexPage.initData();

        $("#more_menu_search").off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "more_search_page",
                pageJsCallback : function() {
                    moreSearchPage.initialize(Constants.tabIndex.MORE);
                }
            });
        });
        $("#more_menu_recentbrowse").off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "more_recentbrowse_page",
                pageJsCallback : function() {
                    moreRecentbrowsePage.initialize(Constants.tabIndex.MORE);
                }
            });
        });
        $("#more_menu_hotline").off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "more_hotline_page",
                pageJsCallback : function() {
                    moreHotlinePage.initialize(Constants.tabIndex.MORE);
                }
            });
        });
        $("#more_menu_feedback").off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "more_feedback_page",
                pageJsCallback : function() {
                    moreFeedbackPage.initialize(Constants.tabIndex.MORE);
                }
            });
        });
        $("#more_menu_about").off("click").on("click", function() {
            Utils.changePageHref({
                pageId : "more_about_page",
                pageJsCallback : function() {
                    moreAboutPage.initialize(Constants.tabIndex.MORE);
                }
            });
        });
    },

    initData : function() {
        console.log("moreIndexPage");
        var more_index_menulist = $("#more_index_menulist");
        if (Utils.isLogin()) {
            if ($("#more_menu_logout_li").length == 0) {
                more_index_menulist.append('<li id="more_menu_logout_li">' + '<a href="#" id="more_menu_logout">' +
                    '<img src="img/more/logout.png" class="ui-li-icon ui-list-menu-item">注销</a></li>');
                more_index_menulist.trigger("refresh");
                $("#more_menu_logout").off("click").on("click", function() {
                    Utils.logout(Utils.changeToHomeIndex);
                });
            }
        } else {
            if ($("#more_menu_logout_li").length != 0) {
                $("#more_menu_logout_li").remove();
                more_index_menulist.trigger("refresh");
            }
        }
    }

};
