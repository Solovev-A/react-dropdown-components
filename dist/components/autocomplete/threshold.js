"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _option = require("../option");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const ThresholdView = (0, _styledComponents.default)(_option.OptionView)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\ncursor: default;\n"])));

const Threshold = () => {
  return /*#__PURE__*/_react.default.createElement(ThresholdView, null, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0432\u0432\u043E\u0434, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u043B\u0441\u044F \u043F\u043E\u0438\u0441\u043A");
};

var _default = Threshold;
exports.default = _default;