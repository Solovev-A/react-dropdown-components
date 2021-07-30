"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

const useResizeObserver = (callback, element) => {
  const observer = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const current = element && element.current;

    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    observer.current = new ResizeObserver(callback);

    if (current) {
      observer.current.observe(current);
    }

    return () => {
      if (observer && observer.current && current) {
        observer.current.unobserve(current);
      }
    };
  }, [callback, element]);
};

var _default = useResizeObserver;
exports.default = _default;