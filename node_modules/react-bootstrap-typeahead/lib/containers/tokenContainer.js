"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _RootCloseWrapper = _interopRequireDefault(require("react-overlays/RootCloseWrapper"));

var _utils = require("../utils");

var _constants = require("../constants");

var _propTypes2 = require("../propTypes");

var propTypes = {
  onBlur: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onRemove: _propTypes["default"].func,
  option: _propTypes2.optionType.isRequired
};
var defaultProps = {
  onBlur: _utils.noop,
  onClick: _utils.noop,
  onFocus: _utils.noop
};
/**
 * Higher-order component to encapsulate Token behaviors.
 */

var tokenContainer = function tokenContainer(Component) {
  var WrappedComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(WrappedComponent, _React$Component);

    function WrappedComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        active: false
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleActiveChange", function (e, active, callback) {
        // e.persist() isn't always present.
        e.persist && e.persist();
        e.stopPropagation();

        _this.setState({
          active: active
        }, function () {
          return callback(e);
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleBlur", function (e) {
        _this._handleActiveChange(e, false, _this.props.onBlur);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleClick", function (e) {
        _this._handleActiveChange(e, true, _this.props.onClick);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFocus", function (e) {
        _this._handleActiveChange(e, true, _this.props.onFocus);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyDown", function (e) {
        switch (e.keyCode) {
          case _constants.BACKSPACE:
            if (_this.state.active) {
              // Prevent backspace keypress from triggering the browser "back"
              // action.
              e.preventDefault();

              _this._handleRemove();
            }

            break;

          default:
            break;
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleRemove", function () {
        var _this$props = _this.props,
            onRemove = _this$props.onRemove,
            option = _this$props.option; // Flow having trouble with `isFunction` here for some reason...

        if (typeof onRemove === 'function') {
          onRemove(option);
        }
      });
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.render = function render() {
      var onRemove = this.props.onRemove;
      var active = this.state.active;
      return /*#__PURE__*/_react["default"].createElement(_RootCloseWrapper["default"], {
        disabled: !active,
        onRootClose: this._handleBlur
      }, /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, this.props, {
        active: active,
        onBlur: this._handleBlur,
        onClick: this._handleClick,
        onFocus: this._handleFocus,
        onKeyDown: this._handleKeyDown,
        onRemove: (0, _utils.isFunction)(onRemove) ? this._handleRemove : undefined
      })));
    };

    return WrappedComponent;
  }(_react["default"].Component);

  (0, _defineProperty2["default"])(WrappedComponent, "displayName", "tokenContainer(" + (0, _utils.getDisplayName)(Component) + ")");
  (0, _defineProperty2["default"])(WrappedComponent, "propTypes", propTypes);
  (0, _defineProperty2["default"])(WrappedComponent, "defaultProps", defaultProps);
  return WrappedComponent;
};

var _default = tokenContainer;
exports["default"] = _default;