// global error handling
var showAlert = function(message, title, callback) {
    navigator.notification.alert(message, callback || function () {
    }, title, 'OK');
};

window.addEventListener('error', function (e) {
    e.preventDefault();
    var message = e.message + "' from " + e.filename + ":" + e.lineno;
    showAlert(message, 'Error occured');
    return true;
});

(function (global) {
    var application,
        api = "http://chuckfacts.azurewebsites.net/";
    
    global.app = {};
    
    var randomJoke = function(explicit) {
        var dfrd = $.Deferred();
        
        $.get(api + "joke/" +  (explicit ? "explicit" : "clean"), function(data) {
            dfrd.resolve(data.JokeText);
        });
        
        return dfrd;
    }
    
    global.app.cleanModel = (function() {
        
        var viewModel = kendo.observable({
            joke: ""
        });
        
        var refresh = function() {
            randomJoke(false).then(function(joke) {
                viewModel.set("joke", joke);    
            });
        };
        
        return {
            viewModel: viewModel,
            refresh: refresh
        }
        
    }());
    
    global.app.dashboardModel = (function() {
        
        var init = function() {
            $("#categoriesPie").kendoChart({
                theme: "flat",
                dataSource: {
                    transport: {
                        read: api + "dashboard/categories"
                    }
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #: #= value #%"
                    }
                },
                series: [{
                    type: "pie",
                    field: "Jokes",
                    categoryField: "Description",
                    startAngle: 150,
                    
                }]
            });
        }
        
        return {
            init: init
        }
        
    }());

    
    global.app.jokesVIew = kendo.observable({
        jokes: new kendo.data.DataSource({
            transport: { 
                read: "api" + "jokes"
            }
    	})
    });
    
    global.app.share = function() {
        window.plugins.social.available(function(avail) {
            if (avail) {
                alert("SWEET!");
            } else {
                alert("DAMMIT");
            }
        });
       	window.plugins.social.share('This is the message you want to share', null, null);
    };
    
    document.addEventListener("deviceready", function () {
        application = new kendo.mobile.Application(document.body, { transition: "slide", skin: "flat" });
        
    }, false);
    
    
})(window);