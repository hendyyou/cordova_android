var indexApp = {
    // Application Constructor
    initialize : function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents : function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady : function() {
		document.addEventListener("backbutton", Utils.eventBackButton, true);
        $.mobile.fixedtoolbar.prototype.options.tapToggleBlacklist = "div, a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed";
        $.mobile.fixedtoolbar.prototype.options.tapToggle = false;
        $.mobile.fixedtoolbar.prototype.options.hideDuringFocus = "";

        indexApp.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent : function(id) {
        console.log('Received Event: ' + id);
        Utils.changeToHomeIndex();
    }
};
