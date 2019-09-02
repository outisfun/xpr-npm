const CustomCursor = require('./modules/xpr-custom-cursor');
const SplitText = require('./modules/xpr-split-text');
const ProgressBar = require('./modules/xpr-progress-bar');
const EndlessTape = require('./modules/xpr-endless-tape');
const AnimateOnPageEnter = require('./modules/xpr-animate-on-page-enter');
const Loader = require('./modules/xpr-loader');

var XPR = {
  CustomCursor: CustomCursor,
  SplitText: SplitText,
  ProgressBar: ProgressBar,
  EndlessTape: EndlessTape,
  AnimateOnPageEnter: AnimateOnPageEnter,
  Loader: Loader
};

module.exports = XPR;
