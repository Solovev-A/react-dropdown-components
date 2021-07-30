"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _utils = require("../utils");

const useDropdownPosition = (parentBounds, dropdownMaxHeight) => {
  const [dropdownPosition, setDropdownPosition] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    // при изменении позиции родительского элемента, определяем направление появления выпадающего списка
    parentBounds && setDropdownPosition((0, _utils.getDropdownPosition)(parentBounds, dropdownMaxHeight));
  }, [parentBounds, dropdownMaxHeight]);
  return dropdownPosition;
};

var _default = useDropdownPosition;
exports.default = _default;