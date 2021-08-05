"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _useElementBounds = _interopRequireDefault(require("../../hooks/useElementBounds"));

var _useOuterClick = _interopRequireDefault(require("../../hooks/useOuterClick"));

var _useDropdownPosition = _interopRequireDefault(require("../../hooks/useDropdownPosition"));

var _useInput = _interopRequireDefault(require("../../hooks/useInput"));

var _useDropdown = _interopRequireDefault(require("../../hooks/useDropdown"));

var _container = _interopRequireDefault(require("../container"));

var _content = _interopRequireDefault(require("./content"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _input = _interopRequireDefault(require("../input"));

var _utils = require("../../utils");

const _excluded = ["options", "value", "onChange", "getOptionKey", "renderOptionText", "renderValueText", "dropdownHeight", "placeholder", "disabled", "getSearchValue"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Multiselect = _ref => {
  let {
    options = [],
    value = [],
    // состояние выбранных элементов должно управляться родительским компонентом
    onChange = () => undefined,
    getOptionKey = option => {
      var _option$id;

      return (_option$id = option.id) !== null && _option$id !== void 0 ? _option$id : option;
    },
    renderOptionText = option => option,
    renderValueText = option => renderOptionText(option),
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска',
    disabled = false,
    getSearchValue = option => renderOptionText(option)
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [search, setSearch] = (0, _react.useState)('');
  const [searchResults, setSearchResults] = (0, _react.useState)(options);
  const {
    inputRef,
    focus,
    blur
  } = (0, _useInput.default)();
  const updateSearch = (0, _react.useCallback)(value => {
    setSearch(value);
    const newSearchResults = value === '' ? options : (0, _utils.filterOptions)(options, value, getSearchValue);
    setSearchResults(newSearchResults);
  }, [options, getSearchValue]);
  const handleChange = (0, _react.useCallback)(newValue => {
    onChange(newValue);
    updateSearch('');
    focus();
  }, [focus, onChange, updateSearch]);
  const handleOptionSelect = (0, _react.useCallback)(option => {
    const selectedOptionIndex = value.findIndex(item => getOptionKey(item) === getOptionKey(option));
    let newValue;

    if (selectedOptionIndex !== -1) {
      // если выбираемая опция уже была выбрана ранее, исключаем ее из выбора
      newValue = [...value.slice(0, selectedOptionIndex), ...value.slice(selectedOptionIndex + 1)];
    } else {
      newValue = [...value, option];
    }

    handleChange(newValue);
  }, [value, getOptionKey, handleChange]);
  const handleItemSelectionRemove = (0, _react.useCallback)(item => {
    const newValue = value.filter(selected => getOptionKey(selected) !== getOptionKey(item));
    handleChange(newValue);
  }, [value, getOptionKey, handleChange]);
  const {
    dropdown,
    pointer,
    handleKeyDown
  } = (0, _useDropdown.default)({
    onCloseWithEscape: blur,
    onOptionSelect: handleOptionSelect,
    options: searchResults,
    search,
    value
  });
  const onOuterClick = (0, _react.useCallback)(() => {
    dropdown.close();
    blur();
    updateSearch('');
  }, [dropdown, blur, updateSearch]);
  const onClick = (0, _react.useCallback)(() => {
    dropdown.toggle();
    focus();
  }, [dropdown, focus]);
  const innerRef = (0, _useOuterClick.default)(onOuterClick);
  const selectBounds = (0, _useElementBounds.default)(innerRef);
  const dropdownPosition = (0, _useDropdownPosition.default)(selectBounds, dropdownHeight);

  const SearchInput = /*#__PURE__*/_react.default.createElement(_input.default, {
    inputRef: inputRef,
    placeholder: value.length ? null : placeholder,
    value: search,
    onSearchChange: updateSearch,
    disabled: disabled
  });

  return /*#__PURE__*/_react.default.createElement(_container.default, _extends({
    ref: innerRef,
    dropdownPosition: dropdownPosition,
    isDropdownOpen: dropdown.isOpen,
    onKeyDown: handleKeyDown,
    onClick: onClick,
    disabled: disabled
  }, props), /*#__PURE__*/_react.default.createElement(_content.default, {
    selected: value,
    getOptionKey: getOptionKey,
    renderValueText: renderValueText,
    onItemRemove: handleItemSelectionRemove,
    input: SearchInput
  }), dropdown.isOpen && !disabled ? /*#__PURE__*/_react.default.createElement(_dropdown.default, {
    options: searchResults,
    getOptionKey: getOptionKey,
    renderOptionText: renderOptionText,
    onSelectOption: handleOptionSelect,
    pointer: pointer.position,
    onUpdatePointer: pointer.setPosition,
    selectedItems: value,
    parentBounds: selectBounds,
    maxHeight: 300,
    position: dropdownPosition
  }) : null);
};

var _default = Multiselect;
exports.default = _default;