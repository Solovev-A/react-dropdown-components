"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

const useInput = () => {
  const inputRef = (0, _react.useRef)(null);
  const focus = (0, _react.useCallback)(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const blur = (0, _react.useCallback)(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.blur();
    }
  }, []);
  return {
    inputRef,
    focus,
    blur
  };
};

var _default = useInput;
exports.default = _default;