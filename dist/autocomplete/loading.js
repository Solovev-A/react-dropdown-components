"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _option = require("../option");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const LoadingView = (0, _styledComponents.default)(_option.OptionView)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\ncursor: default;\ntext-align: center;\n"])));

const Spinner = _styledComponents.default.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n@keyframes spinner-border {\n  to { transform: rotate(360deg); }\n}\ndisplay: inline-block;\nwidth: 1rem;\nheight: 1rem;\nvertical-align: text-bottom;\nborder: .25em solid currentColor;\nborder-right-color: transparent;\nborder-radius: 50%;\nborder-width: .2em;\nanimation: spinner-border .75s linear infinite;\ncolor: #6c757d!important;\n"])));

const Loading = () => {
  return /*#__PURE__*/_react.default.createElement(LoadingView, null, /*#__PURE__*/_react.default.createElement(Spinner, null));
};

var _default = Loading;
exports.default = _default;