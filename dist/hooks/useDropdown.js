"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

const useDropdown = _ref => {
  let {
    options,
    value,
    onOptionSelect,
    onCloseWithEscape,
    search
  } = _ref;
  // State
  const [isDropdownOpen, setIsDropdownOpen] = (0, _react.useState)(false);
  const [pointer, setPointer] = (0, _react.useState)(null); // Functions

  const openDropdown = (0, _react.useCallback)(() => {
    if (pointer === null && options.length) {
      setPointer(0);
    }

    setIsDropdownOpen(true);
  }, [pointer, options]);
  const closeDropdown = (0, _react.useCallback)(() => {
    setIsDropdownOpen(false);
    setPointer(null);
  }, []);
  const handleKeyDown = (0, _react.useCallback)(event => {
    switch (event.key) {
      case 'ArrowUp':
        if (!isDropdownOpen) {
          setPointer(options.length - 1);
          openDropdown();
        } else {
          if (!options.length) return;

          if (pointer - 1 < 0) {
            setPointer(options.length - 1);
          } else {
            setPointer(pointer - 1);
          }
        }

        break;

      case 'ArrowDown':
        if (!isDropdownOpen) {
          setPointer(0);
          openDropdown();
        } else {
          if (!options.length) return;

          if (pointer + 1 >= options.length) {
            setPointer(0);
          } else {
            setPointer(pointer + 1);
          }
        }

        break;

      case 'Enter':
        if (pointer === null) return;
        const option = options[pointer];
        onOptionSelect(option);
        break;

      case 'Escape':
        closeDropdown();
        onCloseWithEscape();
        break;

      default:
        if (!isDropdownOpen) {
          openDropdown();
        }

        break;
    }
  }, [closeDropdown, isDropdownOpen, openDropdown, onCloseWithEscape, onOptionSelect, pointer, options]);
  const toggle = (0, _react.useCallback)(() => {
    if (isDropdownOpen && search.length) return;

    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [closeDropdown, isDropdownOpen, openDropdown, search]); // Effects

  (0, _react.useEffect)(() => {
    setPointer(options.length ? 0 : null);
  }, [options]);
  (0, _react.useEffect)(() => {
    closeDropdown();
  }, [value, closeDropdown]);
  return {
    dropdown: {
      isOpen: isDropdownOpen,
      open: openDropdown,
      close: closeDropdown,
      toggle
    },
    pointer: {
      position: pointer,
      setPosition: setPointer
    },
    handleKeyDown
  };
};

var _default = useDropdown;
exports.default = _default;