'use strict';

var ads = require('ad-utils/lib/helper'),
    dim = require('ad-utils/lib/dimensions');

window.AdOps = window.AdOps || {};


function closeOverlay() {
    try {
        window.parent.postMessage({overlay: {action: 'CLOSE'}}, '*');
    } catch (e) {
        console.log(e);
    }
}

function clickOverlay() {
    try {
        window.parent.postMessage({overlay: {action: 'CLICK'}}, '*');
    } catch (e) {}
}

function parentStyles(obj) {
    try {
        window.parent.postMessage({overlay: {action: 'APPLY_STYLES', payload: obj}}, '*');
    } catch (e) {}
}





window.AdOps.overlay = function(options) {

    var config = {
        stage: '#Overlay_Stage'
    };

    var adReady = document.createEvent('Event'),
        adClosed = document.createEvent('Event'),
        adOpened = document.createEvent('Event'),
        adResized = document.createEvent('Event');

    adReady.initEvent('ADOPS_OVERLAY_READY', true, true);
    adClosed.initEvent('ADOPS_OVERLAY_CLOSED', true, true);
    adOpened.initEvent('ADOPS_OVERLAY_OPENED', true, true);
    adResized.initEvent('ADOPS_OVERLAY_RESIZED', true, true);

    function handleMessage(e) {

        if (!e.data || !e.data.overlay || !e.data.overlay.events) {
            return;
        }

        if (e.data.overlay.events === 'OPENED') {
            document.dispatchEvent(adOpened);
        }

        if (e.data.overlay.events === 'RESIZED') {
            document.dispatchEvent(adResized);
        }

        if (e.data.overlay.events === 'CLOSED') {
            document.dispatchEvent(adClosed);
        }
    }

    function setConfiguration() {

        for (var key in options) {

            if (config.hasOwnProperty(key)) {

                config[key] = options[key];
            }
        }
    }

    if (options) {

        setConfiguration(options);
    }

    return {

        query: ads.query.bind(ads),

        parseQueryString: ads.qsToObject.bind(ads),

        createElement: ads.createElement.bind(ads),

        addEvent: ads.addEvent.bind(ads),

        windowSize: dim.windowSize.bind(dim),

        docHeight: dim.docHeight.bind(dim),

        calculateCenter: dim.calculateCenter.bind(dim),

        close: closeOverlay,

        click: clickOverlay,

        setStyles: parentStyles,

        init: function() {

            var self = this;

            self.query('.ad-click', function(el) {

    			self.addEvent('click', function(e) {
    				e.preventDefault();
    				self.click();
    			}, el);
    		});

    		self.query('.ad-close', function(el) {

    			self.addEvent('click', function(e) {
    				e.preventDefault();
    				self.close();
    			}, el);
    		});

            self.addEvent('message', handleMessage, window);
            document.dispatchEvent(adReady);

        }
    };
};
