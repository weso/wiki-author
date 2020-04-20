"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asyncContainer = _interopRequireDefault(require("../containers/asyncContainer"));

var _Typeahead = _interopRequireDefault(require("./Typeahead.react"));

var _default = (0, _asyncContainer["default"])(_Typeahead["default"]);

exports["default"] = _default;