var gsap = require('gsap');
var _ = require('lodash');

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function Loader(opts) {

  this.DOM = { container: opts.container || document.querySelector("body") };

  var _defaultOptions = {
    direction: 1,
    markup: '<span>the sorrows of pain and regret are left to the dead and the dying. </span>',
    speed: 15,
    styles: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 90
    },
    markupStyles: {
    }
  };

  this.opts = _.merge(_defaultOptions, opts);
  this.init();
}

Loader.prototype.init = function() {
  this.buildMarkup();
};

Loader.prototype.buildMarkup = function() {
  this.DOM.el = document.createElement("div");
  this.DOM.el.classList.add("xpr-loader");

  TweenLite.set(this.DOM.el, {
    position: 'fixed',
    height: '100%'
  });
};

module.exports = Loader;
