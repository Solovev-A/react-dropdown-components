"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const SelectedItemView = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\ndisplay: flex;\nalign-items: center;\npadding: 0;\npadding-right: .75rem;\nmargin-top: calc(.375rem - 2px);\nmargin-right: .375rem;\ncolor: #495057;\nfont-size: 1rem;\ncursor: pointer;\nborder: 1px solid #bdc6d0;\nborder-radius: .2rem;\n"])));

const RemoveItem = _styledComponents.default.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\npadding-right: 3px;\npadding-left: 3px;\nmargin-right: 1px;\nmargin-left: 3px;\nfont-weight: 700;\ncolor: #bdc6d0;\n\n&:hover {\n    color: #343a40;\n}\n"])));

const SelectedItem = _ref => {
  let {
    onItemRemove,
    children
  } = _ref;

  const onClick = event => {
    event.stopPropagation();
    onItemRemove();
  };

  return /*#__PURE__*/_react.default.createElement(SelectedItemView, null, /*#__PURE__*/_react.default.createElement(RemoveItem, {
    onClick: onClick
  }, "\xD7"), children);
};

var _default = SelectedItem;
exports.default = _default;