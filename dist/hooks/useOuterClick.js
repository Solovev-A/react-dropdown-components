"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

// Позаимствовано из: https://stackoverflow.com/a/54292872/13467303
const useOuterClick = callback => {
  const callbackRef = (0, _react.useRef)(); // initialize mutable callback ref

  const innerRef = (0, _react.useRef)(); // returned to client, who sets the "border" element
  // update callback on each render, so second useEffect has most recent callback

  (0, _react.useEffect)(() => {
    callbackRef.current = callback;
  });
  (0, _react.useEffect)(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
        callbackRef.current(e);
      }
    }
  }, []);
  return innerRef;
};

var _default = useOuterClick;
exports.default = _default;