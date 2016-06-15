### HTML5 overlay development kit

We have supplied a basic overlay example using our overlay SDK. All ads on our websites are served into friendly iframes, this can make things challenging when working with formats like the overlays. Our SDK leverages messaging between the overlay iframe and the parent window and provides several API methods to simplify initialization, positioning, click-through and closing the ad.

The ad can be fully customized with video, css/svg animations or any other HTML elements. You must ensure that the script main.min.js is always included in index.html so the ad functions as intended. Within our sample index.html file we have an #Overlay_Stage div, all ad content should be placed inside this element.

Our overlay SDK can be set to a pre-determined size and will be automatically centered. Alternatively it can operate in full screen mode where it will expand to cover the entire viewport. In full screen mode the ad designer must ensure their design is responsive and will display as intended across various screen sizes.

## Interaction event handling

The overlay SDK when initialized sets event listeners for two convenience class names, allowing you to easily set buttons or links to open the landing page or close the ad. The following class names are used.

> .ad-click

Any elements with the class .ad-click will open the landing page. No further code is required. You will see in our example that the .ad-click class has been applied to an anchor element and styled with a simple close button, this can be styled anyway you like but the class name should not be altered.

> .ad-close

Any elements with the class .ad-close will cause the ad to close. Again, no further code is required and the element can be styled accordingly but the class name should not be changed.

## Configuration & initialization

As shown in our sample ad you must instantiate and initialize the overlay SDK. You must configure the width and height of your overlay here. You can either set dimensions in pixels for a fixed size unit or you can set both width and height to undefined (or omit) for full screen.

```
!#JavaScript
//Create a new overlay instance
var overlay = AdOps.overlay({
	width: 900, //set to undefined for full screen
	height: 600 //set to undefined for full screen
});

//Initialize the overlay
overlay.init();
```

## Advanced
The SDK dispatches several events during the lifecycle of the ad which enable the designed/developer to trigger visual effects or external tracking pixels.

* ADOPS_OVERLAY_READY - Dispatched after ad initializes
* ADOPS_OVERLAY_OPENED - Dispatched when ad enters opened state
* ADOPS_OVERLAY_RESIZED - Dispatched when ad is resize or re-centered
* ADOPS_OVERLAY_CLOSED - Dispatched when ad is closed

A convenience method is exposed via the overlay SDK to handle setting event listeners.

```
!#JavaScript
//Before calling overlay.init();
overlay.addEvent('ADOPS_OVERLAY_READY', function() {

    //Custom code goes here for ready event
    console.log('OVERLAY READY');
});
```
The API also exposes functions to close the ad or trigger the click-through if it is not desirable to use the built in class-name event listeners.

To close the ad call overlay.close() on an initialized overlay object.

To trigger the click though you can call overlay.click() on an initialized overlay object.

## Trafficking code using enabler
```
!#JavaScript
<!--nosandbox-->
<script src="http://some-cdn.com/html5-overlay/enabler.min.js"></script>
<script>
	var overlay = AdOps.overlay({
        src: 'http://some-cdn.com/html5-overlay-ad/index.html',
        clickUrl: '#{click("defaultClick")}'
	});
	overlay.init();
</script>

```
