"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContext = exports.TypeaheadContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var TypeaheadContext = (0, _react.createContext)({});
exports.TypeaheadContext = TypeaheadContext;

var withContext = function withContext(Component, values) {
  // Note: Use a class instead of function component to support refs.

  /* eslint-disable-next-line react/prefer-stateless-function */
  return /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement(TypeaheadContext.Consumer, null, function (context) {
        return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, _this.props, (0, _utils.pick)(context, values)));
      });
    };

    return _class;
  }(_react["default"].Component);
};

exports.withContext = withContext;