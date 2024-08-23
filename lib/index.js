"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = multipleSelectors;

var _fastLoops = require("fast-loops");

var _isobject = _interopRequireDefault(require("isobject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function multipleSelectorsPlugin(style) {
  (0, _fastLoops.objectEach)(style, function (value, property) {
    if ((0, _isobject["default"])(value)) {
      var resolvedValue = multipleSelectorsPlugin(value);
      // split on commas, but not within a relative selector list
      //   e.g. ":hover, :focus", but not ":where(:hover, :focus)"
      const selectors = property.split(/(?<!\([^)]*),(?![^(]*\))/);

      if (selectors.length > 1) {
        (0, _fastLoops.arrayEach)(selectors, function (selector) {
          var key = selector.trim(); // merge styles with base styles

          var baseStyle = style[key] || {};
          style[key] = _objectSpread(_objectSpread({}, baseStyle), resolvedValue);
        });
        delete style[property];
      }
    } else {
      style[property] = value;
    }
  });
  return style;
}

function multipleSelectors() {
  return multipleSelectorsPlugin;
}