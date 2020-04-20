"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

var _propTypes2 = require("../propTypes");

var propTypes = {
  label: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  size: _propTypes2.sizeType
};
var defaultProps = {
  label: 'Clear',
  onClick: _utils.noop
};

/**
 * ClearButton
 *
 * http://getbootstrap.com/css/#helper-classes-close
 */
var ClearButton = function ClearButton(_ref) {
  var className = _ref.className,
      label = _ref.label,
      _onClick = _ref.onClick,
      size = _ref.size,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["className", "label", "onClick", "size"]);
  return /*#__PURE__*/_react["default"].createElement("button", (0, _extends2["default"])({}, props, {
    "aria-label": label,
    className: (0, _classnames["default"])('close', 'rbt-close', {
      'rbt-close-lg': (0, _utils.isSizeLarge)(size)
    }, className),
    onClick: function onClick(e) {
      e.stopPropagation();

      _onClick(e);
    },
    type: "button"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, label));
};

ClearButton.propTypes = propTypes;
ClearButton.defaultProps = defaultProps;
var _default = ClearButton;
exports["default"] = _default;