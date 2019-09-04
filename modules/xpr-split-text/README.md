# XPR Split Text Module

### What it does:

The XPR.SplitText module creates a GSAP Split Text element out of a heading with the option to animate it on page enter, or programmatically.

!!! Important: 
The GSAP SplitText Module is premium, so it doesn't come with the npm package.
You have to add it manually and require it before requiring the XPR module:

```
var gsap = require('gsap');
require("gsap/umd/SplitText.js");
var XPR = require('@outisfun/xpr-npm');
```

### How to use:

Init by specifying a parent container (mandatory), markup (mandatory), and options as follows:
```
var headingEl = document.querySelector("h1"); // select a heading element
var splitTextEl = new XPR.SplitText(headingEl);

```

The module comes with default settings for animations and events, but you can override them like this:
```
var headingEl = document.querySelector("h1"); // select a heading element
var opts = {
	animation: {
		from: {
			y: 20,
			opacity: 0
		},
		to: {
			y: 0,
			opacity: 1,
			ease: Power2.easeOut
		}
	},
	speed: 0.55,
	staggerSpeed: 0.002,
	animateOnPageEnter: false 
}
var splitTextEl = new XPR.SplitText(headingEl, opts);

// if you set animateOnPageEnter to false, you have to trigger the animation manually, like this:
splitTextEl.animate();
```