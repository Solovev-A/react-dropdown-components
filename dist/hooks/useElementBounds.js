"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useResizeObserver = _interopRequireDefault(require("./useResizeObserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useElementBounds = elementRef => {
  const [elementBounds, setElementBounds] = (0, _react.useState)();
  const updateElementBounds = (0, _react.useCallback)(() => {
    if (elementRef && elementRef.current) {
      setElementBounds(elementRef.current.getBoundingClientRect());
    }
  }, [elementRef]);
  (0, _useResizeObserver.default)(updateElementBounds, elementRef);
  (0, _react.useEffect)(() => {
    updateElementBounds();
    window.addEventListener('resize', updateElementBounds);
    window.addEventListener('scroll', updateElementBounds);
    return () => {
      window.removeEventListener('resize', updateElementBounds);
      window.removeEventListener('scroll', updateElementBounds);
    };
  }, [updateElementBounds]);
  return elementBounds;
};

var _default = useElementBounds;
exports.default = _default;