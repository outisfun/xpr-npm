var _ = require('lodash');
var ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
var gsap = require('gsap');

function XPR_SplitText(el, opts) {
  this.DOM = {el: el};
  this.splitText = new SplitText(this.DOM.el, { type: ['lines', 'words', 'chars'] });

  var defaultOptions = {
    animation: {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1,
        ease: Power2.easeOut
      }
    },
    speed: 0.55,
    staggerSpeed: 0.003,
    animateOnPageEnter: true
  };
  this.isAnimated = false;
  this.opts = _.merge(defaultOptions, opts);
  this.init();
}

XPR_SplitText.prototype.init = function() {
  this.setInitialValues();
  this.setTimeline();

  if (this.opts.animateOnPageEnter === true) {
    this.initEventListeners();
  }
};

XPR_SplitText.prototype.initEventListeners = function() {
  var self = this;
  var _elOnScroll = function(e) {
    if (self.isInViewport() && !self.isAnimated) {
      self.animate();
    }
  };
  this.elOnScroll = _elOnScroll.bind(this);
  window.addEventListener('scroll', this.elOnScroll);
};

XPR_SplitText.prototype.removeEventListeners = function() {
  window.removeEventListener('scroll', this.elOnScroll);
};

XPR_SplitText.prototype.setTimeline = function() {
  this._tl = new TimelineMax({ paused: true })
    .staggerTo(this.splitText.chars, this.opts.speed, this.opts.animation.to, this.opts.staggerSpeed);
};

XPR_SplitText.prototype.setInitialValues = function() {
  var self = this;
  _.forEach (this.splitText.lines, function(l, ind) {
    TweenLite.set(l, {overflow: 'hidden'});
  });
  _.forEach (this.splitText.words, function(l, ind) {
    TweenLite.set(l, {lineHeight: '1em'});
  });
  _.forEach (this.splitText.chars, function(c, ind) {
    TweenLite.set(c, self.opts.animation.from );
  });
};

XPR_SplitText.prototype.animate = function() {
  this.isAnimated = true;
  this._tl.play();
  this.removeEventListeners();
};

XPR_SplitText.prototype.isInViewport = function() {
  var bounding = this.DOM.el.getBoundingClientRect();
  return (
    (bounding.top >= 0) && (bounding.top <= window.innerHeight) &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );

  // alternative bounds calculation?
  // return (
  //   (bounding.top >= 0) && (bounding.top <= window.innerHeight) &&
  //   bounding.left >= 0 &&
  //   bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //   bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  // );
};


module.exports = XPR_SplitText;
