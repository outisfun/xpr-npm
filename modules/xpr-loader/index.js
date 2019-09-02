var gsap = require('gsap');
var _ = require('lodash');

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function createDivWithClass(classname) {
  var el = document.createElement("div");
  el.classList.add(classname);
  return el;
}

function XPRLoader(opts) {

  this.DOM = { container: opts.container || document.querySelector("body") };

  var _defaultOptions = {
    markup: '<span>the sorrows of pain and regret are left to the dead and the dying. </span>',
    speed: 15,
    styles: {
      position: 'fixed',
      height: '100%',
      width: '100%',
      left: '0',
      top: '0',
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none"
    },
    markupStyles: {
      zIndex: 20,
      opacity: 0
    },
    layers: [
      '#000', '#f00', '#ff0'
    ],
    dir: 'vertical'
  };

  this.opts = _.merge(_defaultOptions, opts);
  console.log(this.opts.layers);
  this.init();
}

XPRLoader.prototype.init = function() {
  this.buildMarkup();
  this.buildTimeline();
  this.initEvents();
};

XPRLoader.prototype.buildMarkup = function() {

  var self = this;

  // build main el
  this.DOM.el = createDivWithClass("xpr-loader");
  TweenLite.set(this.DOM.el, this.opts.styles);
  this.DOM.container.appendChild(this.DOM.el);

  // build logo
  this.DOM.logo = createDivWithClass("xpr-loader__logo");
  this.DOM.logo.innerHTML = this.opts.markup;
  TweenLite.set(this.DOM.logo, this.opts.markupStyles);
  this.DOM.el.appendChild(this.DOM.logo);

  // build color layers
  this.buildLayers();
};

XPRLoader.prototype.initEvents = function() {
  // ideally, also set those through css to avoid glitch
  TweenLite.to(this.DOM.container, 0.1, {
    opacity: 1,
    pointerEvents: "all"
  });

  var self = this;
  setTimeout(function() {
    self.animate();
  }, 1000);
};

XPRLoader.prototype.buildTimeline = function() {

  this.tl = new TimelineLite({
    paused: true
  })
    .to(this.DOM.logo, 0.1, {
      opacity: 1,
      ease: Power2.easeOut
    })
    .to(this.DOM.logo, 0.3, {
      opacity: 0,
      ease: Power2.easeOut
    }, "+=1");

  var self = this;
  var _styles = (this.opts.dir === 'horizontal') ? { maxWidth: '0' } : { maxHeight: '0' };
  _styles.ease = Power2.easeOut;

  _.forEach(this.DOM.layers, function(layer, index) {
    self.tl.to(layer, 0.35, _styles, ("-=" + (index === 0 ? 0 : 1)*0.25));
  });

  if (this.opts.callback !== undefined) {
    this.tl.eventCallback("onComplete", this.opts.callback);
  }

};

XPRLoader.prototype.buildLayers = function() {
  var self = this;
  this.DOM.layers = [];

  _.forEach(this.opts.layers, function(layerColor, layerIndex) {
    var _layer = document.createElement("div");
    _layer.classList.add("xpr-loader__layer");

    TweenLite.set(_layer, {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      maxHeight: (window.innerHeight + "px"),
      maxWidth: (window.innerWidth + "px"),
      backgroundColor: layerColor,
      zIndex: (self.opts.layers.length - layerIndex)
    });

    self.DOM.layers.push(_layer);
    self.DOM.el.appendChild(_layer);
  });
};


XPRLoader.prototype.animate = function() {
  this.tl.play();
};

module.exports = XPRLoader;
