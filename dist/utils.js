"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterOptions = exports.getDropdownPosition = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

const getDropdownPosition = (parentBounds, dropdownMaxHeight) => {
  const dropdownBottom = parentBounds.bottom + dropdownMaxHeight;
  return window.innerHeight > dropdownBottom ? 'bottom' : 'top';
};

exports.getDropdownPosition = getDropdownPosition;

const filterOptions = function filterOptions(options, search) {
  let getOptionValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : item => item;
  const regExpSafeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reg = new RegExp(regExpSafeSearch, 'i');
  return options.filter(item => reg.test(getOptionValue(item)));
};

exports.filterOptions = filterOptions;