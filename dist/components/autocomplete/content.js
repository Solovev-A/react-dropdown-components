"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _clear = _interopRequireDefault(require("../clear"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const AutoCompleteContentView = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\ndisplay: flex;\nflex: 1;\nalign-items: flex-end;\n"])));

const ValueView = _styledComponents.default.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\nflex: 1;\ncolor: #495057;\n"])));

const Content = _ref => {
  let {
    value,
    renderValueText,
    input,
    onClear
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(AutoCompleteContentView, null, value ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ValueView, null, renderValueText(value)), /*#__PURE__*/_react.default.createElement(_clear.default, {
    onClick: onClear
  })) : input);
};

var _default = Content;
exports.default = _default;