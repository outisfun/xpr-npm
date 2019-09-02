var _ = require('lodash');
var ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
var gsap = require('gsap');

// TweenLite.to(this.DOM.navProgressBar, 0.2, {
//     width: scrollPercent
//   });

function ProgressBar(container, opts) {

  this.DOM = { container : (container || document.querySelector("body")) };

  var _defaultOpts = {
    updateOn: 'windowScroll',
    progressBarStyles: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: 'transparent'
    },
    progressBarIndicatorStyles: {
      position: 'absolute',
      width: '0%',
      height: '100%',
      backgroundColor: 'black'
    }
  };
  this.opts = _.merge(_defaultOpts, opts);

  this.init();
}

ProgressBar.prototype.init = function() {
  this.buildMarkup();
  this.setStyles();
  this.initEvents();
};

ProgressBar.prototype.buildMarkup = function() {
  this.DOM.progressBar = document.createElement("div");
  this.DOM.progressBar.classList.add("xpr-progress-bar");

  this.DOM.progressBarIndicator = document.createElement("div");
  this.DOM.progressBarIndicator.classList.add("xpr-progress-bar__indicator");

  this.DOM.progressBar.appendChild(this.DOM.progressBarIndicator);

  this.DOM.container.appendChild(this.DOM.progressBar);
};

ProgressBar.prototype.setStyles = function() {
  TweenLite.set(this.DOM.progressBar, this.opts.progressBarStyles);
  TweenLite.set(this.DOM.progressBarIndicator, this.opts.progressBarIndicatorStyles);
};

ProgressBar.prototype.updateIndicator = function(scrollPercent) {
  TweenLite.to(this.DOM.progressBarIndicator, 0.2, {
    width: scrollPercent
  });
};

ProgressBar.prototype.initEvents = function() {
  var self = this;

  if (this.opts.updateOn === 'windowScroll') {
    window.addEventListener('scroll', function(e) {
      var pos = window.scrollY;
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var scrollBottom =
        (document.documentElement.scrollHeight ||
          document.body.scrollHeight) - document.documentElement.clientHeight;
      scrollPercent = (scrollBottom !== 0) ? ((scrollTop / scrollBottom * 100) + "%") : "100%";
      self.updateIndicator(scrollPercent);
    });
  } else {
    // this.tl = TweenLite()
    //   .to(this.DOM.progressBarIndicator, 1, {
    //     width: '100%'
    //   });
    // this.opts.updateOn.setTween(_tl);
  }

};

module.exports = ProgressBar;
