# XPR Endless Tape

## How to use:

Install & require:

```
$ npm i xpr-endless-tape --save
var EndlessTape = require('xpr-endless-tape');
```

Init by specifying a parent container (mandatory), markup (mandatory), and options as follows:
```
var container = document.querySelector(...);
var markup = '<span>hello world<span>';

var myEndlessTape = new EndlessTape({
  container: container,
  speed: 20, // play around with this depending on the effect
  styles: { // styles for the tape element itself
    height: 90,
    display: 'flex',
    alignItems: 'center'
    position: 'fixed',
    bottom: 0
  },
  markup: markup,
  markupStyles: {
    fontSize: '24px'
  }
})
```
