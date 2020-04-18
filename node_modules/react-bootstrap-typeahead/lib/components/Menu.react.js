"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _MenuItem = require("./MenuItem.react");

var _propTypes2 = require("../propTypes");

var MenuDivider = function MenuDivider(props) {
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "divider dropdown-divider",
    role: "separator"
  });
};

var MenuHeader = function MenuHeader(props) {
  return /*#__PURE__*/_react["default"].createElement("li", (0, _extends2["default"])({}, props, {
    className: "dropdown-header"
  }));
};

var propTypes = {
  'aria-label': _propTypes["default"].string,

  /**
   * Message to display in the menu if there are no valid results.
   */
  emptyLabel: _propTypes["default"].node,

  /**
   * Needed for accessibility.
   */
  id: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]), _propTypes2.isRequiredForA11y),

  /**
   * Maximum height of the dropdown menu.
   */
  maxHeight: _propTypes["default"].string
};
var defaultProps = {
  'aria-label': 'menu-options',
  emptyLabel: 'No matches found.',
  maxHeight: '300px'
};

/**
 * Menu component that handles empty state when passed a set of results.
 */
var Menu = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Menu, _React$Component);

  function Menu() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Menu.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        inputHeight = _this$props.inputHeight,
        scheduleUpdate = _this$props.scheduleUpdate; // Update the menu position if the height of the input changes.

    if (inputHeight !== prevProps.inputHeight) {
      scheduleUpdate();
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        emptyLabel = _this$props2.emptyLabel,
        id = _this$props2.id,
        innerRef = _this$props2.innerRef,
        maxHeight = _this$props2.maxHeight,
        style = _this$props2.style,
        text = _this$props2.text;
    var contents = _react.Children.count(children) === 0 ? /*#__PURE__*/_react["default"].createElement(_MenuItem.BaseMenuItem, {
      disabled: true,
      role: "option"
    }, emptyLabel) : children;
    return /*#__PURE__*/_react["default"].createElement("ul", {
      "aria-label": this.props['aria-label'],
      className: (0, _classnames["default"])('rbt-menu', 'dropdown-menu', 'show', className),
      id: id,
      key: // Force a re-render if the text changes to ensure that menu
      // positioning updates correctly.
      text,
      ref: innerRef,
      role: "listbox",
      style: (0, _extends2["default"])({}, style, {
        display: 'block',
        maxHeight: maxHeight,
        overflow: 'auto'
      })
    }, contents);
  };

  return Menu;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Menu, "propTypes", propTypes);
(0, _defineProperty2["default"])(Menu, "defaultProps", defaultProps);
(0, _defineProperty2["default"])(Menu, "Divider", MenuDivider);
(0, _defineProperty2["default"])(Menu, "Header", MenuHeader);
var _default = Menu;
exports["default"] = _default;