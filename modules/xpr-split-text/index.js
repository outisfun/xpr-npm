var _ = require('lodash');
var ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
var gsap = require('gsap');

function XPR_SplitText(el, opts) {
  console.log(el, opts);
  this.DOM = {el: el};
  this.splitText = new SplitText(this.DOM.el, { type: ['chars', 'lines'] });

  var defaultOptions = {
    animation: {
      from: {
        x: 20,
        opacity: 0.5
      },
      to: {
        x: 0,
        opacity: 1
      }
    },
    speed: 0.35,
    staggerSpeed: 0.05
  };

  this.opts = _.merge(defaultOptions, opts);
  this.init();
}

XPR_SplitText.prototype.init = function() {
  this.setInitialValues();
  this.setTimeline();
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
  _.forEach (this.splitText.chars, function(c, ind) {
    TweenLite.set(c, self.opts.animation.from );
  });
};

XPR_SplitText.prototype.animate = function(direction, callback) {
  if (callback && (typeof callback === 'function')) { this._tl.addCallback(callback); }
  this._tl[ (direction !== -1) ? 'play' : 'reverse']();
};

XPR_SplitText.prototype.animateOnScroll = function(opts) {
  var self = this;
  this.controller = new ScrollMagic.Controller();
  var _opts = {
    triggerElement: this.DOM.el,
    triggerHook: 0.7
  };
  var scrollSceneOpts = _.merge(_opts, opts);

  this.scrollScene = new ScrollMagic.Scene(scrollSceneOpts)
    .on('enter', function() {
      self.animate();
    })
    .addTo(this.controller);
};

module.exports = XPR_SplitText;
