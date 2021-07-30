"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _selectedItem = _interopRequireDefault(require("./selectedItem"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const MultiselectContentView = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\ndisplay: flex;\nflex-wrap: wrap;\nflex: 1;\n"])));

const MultiselectContent = _ref => {
  let {
    selected,
    getOptionKey,
    renderValueText,
    onItemRemove,
    input
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(MultiselectContentView, null, selected.map(option => {
    const handleRemoveItem = () => onItemRemove(option);

    return /*#__PURE__*/_react.default.createElement(_selectedItem.default, {
      key: getOptionKey(option),
      onItemRemove: handleRemoveItem
    }, renderValueText(option));
  }), input);
};

var _default = MultiselectContent;
exports.default = _default;