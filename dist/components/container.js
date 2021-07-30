"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Container = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nposition: relative;\nmin-height: calc(1.5em + .75rem + 2px) !important;\nwidth: 100%;\nmargin: 0;\npadding-left: .375rem;\npadding-right: .375rem;\npadding-bottom: .375rem;\nbox-sizing: border-box;\ndisplay: flex;\nbackground-color: #fff;\nborder: 1px solid #ced4da;\nborder-radius: .25rem;\ncursor: pointer;\n", "\n", "\n\n&:focus-within {\n    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);\n}\n"])), _ref => {
  let {
    dropdownPosition,
    isDropdownOpen
  } = _ref;
  return isDropdownOpen && "border-".concat(dropdownPosition, "-right-radius: 0;\n         border-").concat(dropdownPosition, "-left-radius: 0;\n         border-").concat(dropdownPosition, "-color: #fff;");
}, _ref2 => {
  let {
    disabled
  } = _ref2;
  return disabled ? "pointer-events: none;\n           background-color: #e9ecef;" : '';
});

var _default = Container;
exports.default = _default;