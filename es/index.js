function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { objectEach, arrayEach } from 'fast-loops';
import isPlainObject from 'isobject';

function multipleSelectorsPlugin(style) {
  objectEach(style, function (value, property) {
    if (isPlainObject(value)) {
      var resolvedValue = multipleSelectorsPlugin(value);
      
      // split on commas, but not within a relative selector list
      //   e.g. ":hover, :focus", but not ":where(:hover, :focus)"
      const selectors = property.split(/(?<!\([^)]*),(?![^(]*\))/)

      if (selectors.length > 1) {
        arrayEach(selectors, function (selector) {
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

export default function multipleSelectors() {
  return multipleSelectorsPlugin;
}