"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMenuItemId;

function getMenuItemId(id, position) {
  return (id || '') + "-item-" + position;
}