"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const ClearView = _styledComponents.default.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\npadding-right: 3px;\npadding-left: 3px;\nfont-weight: 700;\nfont-size: 1.25rem;\ncolor: #bdc6d0;\nalign-self: center;\n\n&:hover {\n    color: #343a40;\n}\n"])));

const Clear = _ref => {
  let {
    onClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(ClearView, {
    onClick: onClick,
    title: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"
  }, "\xD7");
};

var _default = Clear;
exports.default = _default;