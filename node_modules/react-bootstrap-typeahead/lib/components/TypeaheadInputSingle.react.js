"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("./Input.react"));

var _hintContainer = _interopRequireDefault(require("../containers/hintContainer"));

var _withClassNames = _interopRequireDefault(require("../containers/withClassNames"));

var HintedInput = (0, _hintContainer["default"])(_Input["default"]);

var _default = (0, _withClassNames["default"])(function (_ref) {
  var inputRef = _ref.inputRef,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["inputRef"]);
  return /*#__PURE__*/_react["default"].createElement(HintedInput, (0, _extends2["default"])({}, props, {
    ref: inputRef
  }));
});

exports["default"] = _default;