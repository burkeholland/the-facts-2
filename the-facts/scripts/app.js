(function (global) {
    var application,
        mobileSkin = "",
        defaultChartTheme = 'silver',
        app = global.app = global.app || {};
    
    app.chartsTheme = defaultChartTheme;    

    document.addEventListener("deviceready", function () {
        application = new kendo.mobile.Application(document.body, { transition: "", layout: "mobile-tabstrip" });
    }, false);

    //Skin change function is for the demo. On real project only one theme should be chosen.
    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            global.app.chartsTheme = 'flat';
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            global.app.chartsTheme = defaultChartTheme;
            mobileSkin = "";
        }

        application.skin(mobileSkin);
        application.view().show();
    }; 
})(window);