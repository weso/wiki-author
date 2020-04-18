"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlacement = getPlacement;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPopper = require("react-popper");

var _utils = require("../utils");

var _constants = require("../constants");

/* eslint-disable react/no-unused-prop-types */
// `Element` is not defined during server-side rendering, so shim it here.

/* istanbul ignore next */
var SafeElement = typeof Element === 'undefined' ? function () {} : Element;
var propTypes = {
  /**
   * Specify menu alignment. The default value is `justify`, which makes the
   * menu as wide as the input and truncates long values. Specifying `left`
   * or `right` will align the menu to that side and the width will be
   * determined by the length of menu item values.
   */
  align: _propTypes["default"].oneOf((0, _utils.values)(_constants.ALIGN)),
  children: _propTypes["default"].func.isRequired,

  /**
   * Specify whether the menu should appear above the input.
   */
  dropup: _propTypes["default"].bool,

  /**
   * Whether or not to automatically adjust the position of the menu when it
   * reaches the viewport boundaries.
   */
  flip: _propTypes["default"].bool,
  isMenuShown: _propTypes["default"].bool,
  positionFixed: _propTypes["default"].bool,
  referenceElement: _propTypes["default"].instanceOf(SafeElement)
};
var defaultProps = {
  align: _constants.ALIGN.JUSTIFY,
  dropup: false,
  flip: false,
  isMenuShown: false,
  positionFixed: false
};

function getModifiers(_ref) {
  var align = _ref.align,
      flip = _ref.flip;
  return {
    computeStyles: {
      enabled: true,
      fn: function fn(_ref2) {
        var styles = _ref2.styles,
            data = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["styles"]);
        return (0, _extends2["default"])({}, data, {
          styles: (0, _extends2["default"])({}, styles, {
            // Use the following condition instead of `align === 'justify'`
            // since it allows the component to fall back to justifying the
            // menu width if `align` is undefined.
            width: align !== _constants.ALIGN.RIGHT && align !== _constants.ALIGN.LEFT ? // Set the popper width to match the target width.
            data.offsets.reference.width : styles.width
          })
        });
      }
    },
    flip: {
      enabled: flip
    },
    preventOverflow: {
      escapeWithReference: true
    }
  };
} // Flow expects a string literal value for `placement`.


var PLACEMENT = {
  bottom: {
    end: 'bottom-end',
    start: 'bottom-start'
  },
  top: {
    end: 'top-end',
    start: 'top-start'
  }
};

function getPlacement(_ref3) {
  var align = _ref3.align,
      dropup = _ref3.dropup;
  var x = align === _constants.ALIGN.RIGHT ? 'end' : 'start';
  var y = dropup ? 'top' : 'bottom';
  return PLACEMENT[y][x];
}

var Overlay = function Overlay(props) {
  var children = props.children,
      isMenuShown = props.isMenuShown,
      positionFixed = props.positionFixed,
      referenceElement = props.referenceElement;

  if (!isMenuShown) {
    return null;
  }

  return /*#__PURE__*/React.createElement(_reactPopper.Popper, {
    modifiers: getModifiers(props),
    placement: getPlacement(props),
    positionFixed: positionFixed,
    referenceElement: referenceElement
  }, function (_ref4) {
    var ref = _ref4.ref,
        popperProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref4, ["ref"]);
    return children((0, _extends2["default"])({}, popperProps, {
      innerRef: ref,
      inputHeight: referenceElement ? referenceElement.offsetHeight : 0
    }));
  });
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
var _default = Overlay;
exports["default"] = _default;