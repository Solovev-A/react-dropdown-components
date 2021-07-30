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

const InputView = _styledComponents.default.input(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nflex-grow: 1;\nmargin-top: calc(.375rem - 2px);\npadding: 0;\nbox-sizing: border-box;\nborder: none;\nfont-family: inherit;\nfont-size: inherit;\nbackground-color: inherit;\nline-height: inherit;\ncolor: #495057;\n\n&:focus {\n    outline: 0;\n}\n"])));

const Input = _ref => {
  let {
    inputRef,
    placeholder,
    value,
    onSearchChange,
    disabled
  } = _ref;

  const onChange = event => onSearchChange(event.target.value);

  return /*#__PURE__*/_react.default.createElement(InputView, {
    ref: inputRef,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled
  });
};

var _default = Input;
exports.default = _default;