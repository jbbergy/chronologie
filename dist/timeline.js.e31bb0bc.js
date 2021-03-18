// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/chronologiejs/enums.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_UNIT_TEXT = exports.TIME_UNIT_VALUE = exports.TIME_UNIT = void 0;
var TIME_UNIT = {
  MILLISECOND: 'MILLISECOND',
  SECOND: 'SECOND',
  MINUT: 'MINUT',
  HOUR: 'HOUR'
};
exports.TIME_UNIT = TIME_UNIT;
var TIME_UNIT_VALUE = {
  MILLISECOND: 1,
  SECOND: 1000,
  MINUT: 60000,
  HOUR: 3600000
};
exports.TIME_UNIT_VALUE = TIME_UNIT_VALUE;
var TIME_UNIT_TEXT = {
  MILLISECOND: 'ms',
  SECOND: 's',
  MINUT: 'mn',
  HOUR: 'h'
};
exports.TIME_UNIT_TEXT = TIME_UNIT_TEXT;
},{}],"js/chronologiejs/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("./enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chronologie = /*#__PURE__*/function () {
  function Chronologie() {
    var verbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Chronologie);

    this.intervalId = null;
    this.intervalTime = 40;
    this.elapsedTime = 0;
    this.events = [];
    this.verbose = verbose;
    this.timestampStart = null;
    this.timestampEnd = null;
  }

  _createClass(Chronologie, [{
    key: "addEvent",
    value: function addEvent(event) {
      if (!(event !== null && event !== void 0 && event.timeTrigger)) {
        throw Error('Event format unvalid. Missing \'timeTrigger\' attribute.');
        return;
      }

      if (!(event !== null && event !== void 0 && event.callback)) {
        throw Error('Event format unvalid. Missing \'callback\' function.');
        return;
      }

      this.events.push(event);
    }
  }, {
    key: "start",
    value: function start() {
      var _this$events,
          _this = this;

      this.timestampStart = Date.now();
      console.log('START', this.timestampStart, 'ms');

      if (this.intervalId) {
        throw Error('You already start the chronologie.');
        return;
      }

      if (((_this$events = this.events) === null || _this$events === void 0 ? void 0 : _this$events.length) === 0) {
        throw Error('You have no events set. Use the addEvent() method.');
        return;
      }

      this.events.forEach(function (evt) {
        return evt.triggered = false;
      });
      this.elapsedTime = 0;
      this.intervalId = setInterval(function () {
        _this.elapsedTime++;
        if (_this.verbose) console.log('Elapsed Time', _this.elapsedTime, ' ms');

        var eventIdx = _this.events.findIndex(function (evt) {
          return _this.convertToMillisecondes(evt.timeTrigger, evt.timeUnit) <= _this.elapsedTime && evt.triggered === false;
        });

        var event = _this.events[eventIdx];

        if (event) {
          var _this$events2;

          event.callback();
          event.triggered = true;
          var eventElement = document.querySelector('#events');
          eventElement.innerHTML = '';
          var idx = 0;
          (_this$events2 = _this.events) === null || _this$events2 === void 0 ? void 0 : _this$events2.forEach(function (evt) {
            var newElement = document.createElement('p');
            newElement.innerHTML = "".concat(idx, " : ").concat(evt.timeTrigger, " ").concat(evt.timeUnit, " => ").concat(evt.triggered);
            eventElement.appendChild(newElement);
            idx++;
          });
        }
      }, 1);
    }
  }, {
    key: "convertToMillisecondes",
    value: function convertToMillisecondes(value, unit) {
      var result = value;

      switch (unit) {
        case _enums.TIME_UNIT.SECOND:
          result = value * _enums.TIME_UNIT_VALUE.SECOND;
          break;

        case _enums.TIME_UNIT.MINUT:
          result = value * 60 * _enums.TIME_UNIT_VALUE.SECOND;
          break;

        case _enums.TIME_UNIT.HOUR:
          result = value * 60 * 60 * _enums.TIME_UNIT_VALUE.SECOND;
          break;
      }

      return result;
    }
  }, {
    key: "isStarted",
    value: function isStarted() {
      return !!this.intervalId;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.timestampEnd = Date.now();
      console.log('STOP', this.timestampEnd - this.timestampStart, 'ms');

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stop();
      this.start();
    }
  }]);

  return Chronologie;
}();

exports.default = Chronologie;
},{"./enums":"js/chronologiejs/enums.js"}],"js/chronologiejs/event.class.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("./enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(timeTrigger, callback, timeUnit) {
  _classCallCheck(this, Event);

  this.timeTrigger = timeTrigger;
  this.timeUnit = timeUnit || _enums.TIME_UNIT.SECOND;
  this.callback = callback;
  this.triggered = false;
};

exports.default = Event;
},{"./enums":"js/chronologiejs/enums.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./js/chronologiejs/index"));

var _event = _interopRequireDefault(require("./js/chronologiejs/event.class"));

var _enums = require("./js/chronologiejs/enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  var _chronologie$events;

  var startBtn = document.querySelector('#start');
  var stopBtn = document.querySelector('#stop');
  var restartBtn = document.querySelector('#restart');
  var chronologie = new _index.default();
  chronologie.addEvent(new _event.default(2, function () {
    console.log('2 Secondes', Date.now());
  }, _enums.TIME_UNIT.SECOND));
  chronologie.addEvent(new _event.default(4, function () {
    console.log('4 Secondes', Date.now());
  }));
  chronologie.addEvent(new _event.default(100, function () {
    console.log('100 Millisecondes', Date.now());
  }, _enums.TIME_UNIT.MILLISECOND));
  chronologie.addEvent(new _event.default(2.3, function () {
    console.log('2.3 Secondes', Date.now());
  }, _enums.TIME_UNIT.SECOND));
  chronologie.addEvent(new _event.default(1, function () {
    console.log('1 Minutes');
  }, _enums.TIME_UNIT.MINUT));
  chronologie.addEvent(new _event.default(1.2, function () {
    console.log('1.2 Minutes');
  }, _enums.TIME_UNIT.MINUT));
  var eventElement = document.querySelector('#events');
  var eventIdx = 0;
  (_chronologie$events = chronologie.events) === null || _chronologie$events === void 0 ? void 0 : _chronologie$events.forEach(function (evt) {
    var newElement = document.createElement('p');
    newElement.innerHTML = "".concat(eventIdx, " : ").concat(evt.timeTrigger, " ").concat(evt.timeUnit, " => ").concat(evt.triggered);
    eventElement.appendChild(newElement);
    eventIdx++;
  });
  startBtn.addEventListener('click', function () {
    try {
      chronologie.start();
    } catch (e) {
      console.error('start', e);
    }
  });
  stopBtn.addEventListener('click', function () {
    try {
      chronologie.stop();
    } catch (e) {
      console.error('stop', e);
    }
  });
  restartBtn.addEventListener('click', function () {
    try {
      chronologie.restart();
    } catch (e) {
      console.error('stop', e);
    }
  });
};
},{"./js/chronologiejs/index":"js/chronologiejs/index.js","./js/chronologiejs/event.class":"js/chronologiejs/event.class.js","./js/chronologiejs/enums":"js/chronologiejs/enums.js"}],"C:/Users/Jibhey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63380" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Jibhey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/timeline.js.e31bb0bc.js.map