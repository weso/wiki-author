"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

var _propTypes = require("../propTypes");

var Loader = function Loader(_ref) {
  var size = _ref.size;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('rbt-loader', {
      'rbt-loader-lg': (0, _utils.isSizeLarge)(size),
      'rbt-loader-sm': (0, _utils.isSizeSmall)(size)
    })
  });
};

Loader.propTypes = {
  size: _propTypes.sizeType
};
var _default = Loader;
exports["default"] = _default;