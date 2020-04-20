"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClearButton = _interopRequireDefault(require("./ClearButton.react"));

var _tokenContainer = _interopRequireDefault(require("../containers/tokenContainer"));

var _utils = require("../utils");

var propTypes = {
  active: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,

  /**
   * Handler for removing/deleting the token. If not defined, the token will
   * be rendered in a read-only state.
   */
  onRemove: _propTypes["default"].func,

  /**
   * Explicitly force a read-only state on the token.
   */
  readOnly: _propTypes["default"].bool,
  tabIndex: _propTypes["default"].number
};
var defaultProps = {
  active: false,
  disabled: false,
  tabIndex: 0
};

/**
 * Token
 *
 * Individual token component, generally displayed within the TokenizerInput
 * component, but can also be rendered on its own.
 */
var Token = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Token, _React$Component);

  function Token() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderRemoveableToken", function () {
      var _this$props = _this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          onRemove = _this$props.onRemove,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["active", "children", "className", "onRemove"]);
      return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, props, {
        className: (0, _classnames["default"])('rbt-token', 'rbt-token-removeable', {
          'rbt-token-active': active
        }, className)
      }), children, /*#__PURE__*/_react["default"].createElement(_ClearButton["default"], {
        className: "rbt-token-remove-button",
        label: "Remove",
        onClick: onRemove,
        tabIndex: -1
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderToken", function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          href = _this$props2.href;
      var classnames = (0, _classnames["default"])('rbt-token', {
        'rbt-token-disabled': disabled
      }, className);

      if (href && !disabled) {
        return /*#__PURE__*/_react["default"].createElement("a", {
          className: classnames,
          href: href
        }, children);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classnames
      }, children);
    });
    return _this;
  }

  var _proto = Token.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        disabled = _this$props3.disabled,
        onRemove = _this$props3.onRemove,
        readOnly = _this$props3.readOnly;
    return !disabled && !readOnly && (0, _utils.isFunction)(onRemove) ? this._renderRemoveableToken() : this._renderToken();
  };

  return Token;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Token, "propTypes", propTypes);
(0, _defineProperty2["default"])(Token, "defaultProps", defaultProps);

var _default = (0, _tokenContainer["default"])(Token);

exports["default"] = _default;