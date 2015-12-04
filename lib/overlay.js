var ads = require('ad-utils');

window.AdOps = window.AdOps || {};

window.AdOps.overlay = (function (options) {

    var viewport = ads.dimensions.windowSize(),
        config = {
            stage: '#stage',
            close: '.ad-close',
            mute: '.ad-mute',
            unmute: '.ad-unmute',
            base: '/',
            click: '.ad-click',
            clickUrl: 'http://www.example.com',
            width: viewport.width,
            height: viewport.height,
            delay: 15
        };

    var adReady = document.createEvent('Event'),
        adClosed = document.createEvent('Event'),
        adOpened = document.createEvent('Event'),
        adResized = document.createEvent('Event');

    adReady.initEvent('ADOPS_OVERLAY_READY', true, true);
    adClosed.initEvent('ADOPS_OVERLAY_CLOSED', true, true);
    adOpened.initEvent('ADOPS_OVERLAY_OPENED', true, true);
    adResized.initEvent('ADOPS_OVERLAY_OPENED', true, true);

    function setConfiguration() {

        for (var key in options) {

            if (config.hasOwnProperty(key)) {

                config[key] = options[key];
            }
        }
    }

    function getStage() {

        return document.getElementById(config.stage.replace('#', ''));
    }

    function setStageSize(width, height) {

        var stage = getStage();

        if (stage) {

            if (width && !isNaN(width)) {

                stage.style.width = width + 'px';
            }

            if (height && !isNaN(height)) {

                stage.style.height = height + 'px';
            }
        }
    }

    function setupAdFrame() {

        var frame = ads.frame.adFrame();
        frame.setAttribute('style', 'border: none; position: fixed; z-index: 9999998; box-shadow: 0 0 12px #333');
        frame.setAttribute('width', config.width);
        frame.setAttribute('height', config.height);
    }

    function positionFrame() {

        var frame = ads.frame.adFrame();
        var sz = ads.dimensions.windowSize();

        frame.style.top = (sz.height - config.height) / 2 + 'px';
        frame.style.left = (sz.width - config.width) / 2 + 'px';

        document.dispatchEvent(adResized);
    }

    function closeAd() {

        var frame = ads.frame.adFrame(),
            win = ads.frame.topWindow();

        win.removeEventListener('resize', positionFrame);
        win.removeEventListener('scroll', positionFrame);
        frame.parentNode.removeChild(frame);
    }

    if (options) {

        setConfiguration(options);
    }

    return {

        init: function () {

            var base = document.createElement('base'),
                win = ads.frame.topWindow();

            base.href = config.base;
            document.head.appendChild(base);

            ads.helper.query(config.close, function (el) {

                ads.helper.addEvent('click', function (e) {

                    e.preventDefault();
                    e.stopPropagation();
                    closeAd();
                }, el);
            });

            ads.helper.query(config.click, function (el) {

                ads.helper.addEvent('click', function (e) {

                    e.preventDefault();
                    e.stopPropagation();
                    window.open(config.clickUrl);
                }, el);
            });

            setupAdFrame();
            positionFrame();
            win.addEventListener('resize', positionFrame);
            win.addEventListener('scroll', positionFrame);
            document.dispatchEvent(adReady);

            setStageSize(config.width, config.height);
            document.dispatchEvent(adOpened);

            //close the window
            setTimeout(function() {

                closeAd();
            }, config.delay * 1000);
        },

        close: closeAd,

        reposition: positionFrame,
        
        addEvent: ads.helper.addEvent

    };
});
