"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _option = _interopRequireDefault(require("./option"));

var _noResults = _interopRequireDefault(require("./noResults"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const DropdownView = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nposition: absolute;\nleft: -1px;\npadding: 0px;\nmax-height: ", "px;\nwidth: ", "px;\ndisplay: flex;\nflex-direction: column;\noverflow-x: hidden;\nborder-radius: 0;\nbackground-color: white;\nborder: 1px solid #ced4da;\nbox-sizing: border-box;\nz-index: 19;\n", "\n"])), _ref => {
  let {
    maxHeight
  } = _ref;
  return maxHeight;
}, _ref2 => {
  let {
    parentBounds
  } = _ref2;
  return parentBounds.width;
}, _ref3 => {
  let {
    parentBounds,
    dropdownPosition
  } = _ref3;
  return dropdownPosition === 'top' ? "bottom: ".concat(parentBounds.height, "px;\n               border-bottom: none;\n               border-top-right-radius: .25rem;\n               border-top-left-radius: .25rem;") : "top: ".concat(parentBounds.height - 1, "px;\n               border-top: none;\n               border-bottom-right-radius: .25rem;\n               border-bottom-left-radius: .25rem;");
});

const Dropdown = _ref4 => {
  let {
    options,
    content,
    getOptionKey = option => option,
    renderOptionText = option => option,
    onSelectOption,
    selectedItems,
    pointer,
    onUpdatePointer,
    parentBounds,
    maxHeight,
    position
  } = _ref4;
  return /*#__PURE__*/_react.default.createElement(DropdownView, {
    dropdownPosition: position,
    maxHeight: maxHeight,
    parentBounds: parentBounds
  }, content ? content : options.length ? options.map((option, index) => {
    const key = getOptionKey(option);
    const isPointerOver = index === pointer;
    const isSelected = !!(selectedItems && selectedItems.find(item => getOptionKey(item) === key));

    const onClick = event => {
      event.stopPropagation();
      onSelectOption(option);
    };

    return /*#__PURE__*/_react.default.createElement(_option.default, {
      key: key,
      isPointerOver: isPointerOver,
      isSelected: isSelected,
      onMouseEnter: () => onUpdatePointer(index),
      onClick: onClick
    }, renderOptionText(option));
  }) : /*#__PURE__*/_react.default.createElement(_noResults.default, null));
};

var _default = Dropdown;
exports.default = _default;