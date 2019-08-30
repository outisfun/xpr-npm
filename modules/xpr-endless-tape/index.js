var gsap = require('gsap');
var _ = require('lodash');

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function EndlessTape(opts) {

  this.DOM = { container: (opts.container || document.querySelector("body")) };
  console.log(opts);
  var _defaultOptions = {
    direction: 1,
    markup: '<span>the sorrows of pain and regret are left to the dead and the dying. </span>',
    speed: 15,
    styles: {
      position: 'fixed',
      bottom: '0px',
      width: '100%',
      height: '90px'
    },
    markupStyles: {
    }
  };

  this.animations = [];
  this.position = 0;
  this.opts = _.merge(_defaultOptions, opts);
  console.log("the sorrows");
  this.init();
}

EndlessTape.prototype.init = function() {
  this.buildMarkup();
};

EndlessTape.prototype.buildMarkup = function() {

  var self = this;

  this.DOM.el = document.createElement('div');
  this.DOM.el.classList.add('xpr-tape');
  var _styles = {};
  _.forOwn(this.opts.styles, function(value, styleAttr) { _styles[styleAttr] = value; });
  TweenLite.set(self.DOM.el, _styles);

  this.DOM.inner = document.createElement('div');
  this.DOM.inner.classList.add('xpr-tape__inner'); // wrapper to allow for positioning

  var _roller = document.createElement('div');
  _roller.classList.add('xpr-tape__roller');
  TweenLite.set(_roller, {
    display: 'flex',
    whiteSpace: 'nowrap',
    position: 'absolute'
  });

  var _markup = createElementFromHTML(this.opts.markup);
  _roller.appendChild(_markup);

  var _markupStyles = {};
  _.forOwn(this.opts.markupStyles, function(value, styleAttr) { _markupStyles[styleAttr] = value; });
  TweenLite.set(_markup, _markupStyles);

  this.DOM.inner.appendChild(_roller);
  this.DOM.el.appendChild(this.DOM.inner);
  this.DOM.container.appendChild(this.DOM.el);

  setTimeout(function() {
    // set height to allow for centering etc
    TweenLite.set(self.DOM.inner, { height: _markup.offsetHeight, width: '100%' });
    console.log(_markup, _markup.offsetHeight);
    var _count = Math.ceil(window.innerWidth/_markup.offsetWidth*2);
    for (var i = 0; i < _count; i++) {
      _roller.appendChild(_markup.cloneNode(true));
    }
    self.roll();
  }, 200);
};

EndlessTape.prototype.tweenSpeed = function(newSpeed) {
  TweenLite.to(this.opts, 10, {speed: "+=20", roundProps:"speed", onUpdate:updateHandler.bind(this), ease:Linear.easeNone});
  function updateHandler() {
    console.log(this.opts.speed);
  }
};

EndlessTape.prototype.roll = function() {

  var self = this;

  // create a copy of element and position it exactly
  var roll = this.DOM.el.querySelector('.xpr-tape__roller');
  var _roll = roll.cloneNode(true);

  this.DOM.inner.appendChild(_roll);
  TweenLite.set(_roll, {
    x: (self.position + self.opts.direction*roll.offsetWidth)
  }, 200);

  TweenLite.to(roll, this.opts.speed, {
    x: -roll.offsetWidth*self.opts.direction,
    ease: Power0.easeNone
  });

  TweenLite.to(_roll, this.opts.speed, {
    x: 0,
    ease: Power0.easeNone,
    onComplete: function() {
      roll.remove();
      self.roll();
    }
  });
};

module.exports = EndlessTape;
