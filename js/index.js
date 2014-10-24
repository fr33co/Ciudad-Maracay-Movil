var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready',app.mostrarFeed,false)
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    mostrarFeed: function(){
        $('#news').FeedEk({
            FeedUrl: 'http://ciudadmcy.info.ve/?format=feed&type=rss',
            MaxCount: news
        });
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
