var _ = require('lodash');
var ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
var gsap = require('gsap');

function XPRAnimateOnPageEnter(el, opts) {
  this.DOM = {el: el};

  var _defaultOpts = {
    animValues: {
      from: {
        opacity: 0, y: 20
      },
      to: {
        opacity: 1, y: 0
      },
      speed: 0.5,
      delay: 0
    },
    eventListeners: true
  };
  this.isAnimated = false;
  this.opts = _.merge(_defaultOpts, opts);
  this.init();
}

XPRAnimateOnPageEnter.prototype.init = function() {
  this.setInitialAnimationValues();
  if (this.opts.eventListeners === true) {
    this.initEventListeners();
  }
};

XPRAnimateOnPageEnter.prototype.initEventListeners = function() {
  var self = this;
  window.addEventListener('scroll', function(e) {
    if (self.isInViewport() && !self.isAnimated) {
      self.isAnimated = true;
      self.animate();
    }
  });
};

XPRAnimateOnPageEnter.prototype.isInViewport = function() {
  var bounding = this.DOM.el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

XPRAnimateOnPageEnter.prototype.setInitialAnimationValues = function() {
  TweenLite.set(this.DOM.el, this.opts.animValues.from);
};

XPRAnimateOnPageEnter.prototype.animate = function() {
  TweenLite.to(this.DOM.el, this.opts.animValues.speed, this.opts.animValues.to);
};


module.exports = XPRAnimateOnPageEnter;
