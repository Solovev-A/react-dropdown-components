import { useCallback, useEffect, useState } from "react";

const useDropdown = ({ options, value, onOptionSelect, onEscape, search }) => {
    // State

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [pointer, setPointer] = useState(null);


    // Functions

    const openDropdown = useCallback(() => {
        if (pointer === null && options.length) {
            setPointer(0);
        }
        setIsDropdownOpen(true);
    }, [pointer, options]);

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false);
        setPointer(null);
    }, []);

    const escapeFromDropdown = useCallback(() => {
        closeDropdown();
        onEscape();
    }, [closeDropdown, onEscape]);

    const handleKeyDown = useCallback((event) => {
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
                escapeFromDropdown();
                break;
            case 'Tab':
                escapeFromDropdown();
                break;
            default:
                if (!isDropdownOpen) {
                    openDropdown();
                }
                break;
        }
    }, [isDropdownOpen, openDropdown, escapeFromDropdown, onOptionSelect, pointer, options]);

    const toggle = useCallback(() => {
        if (isDropdownOpen && search.length) return;

        if (isDropdownOpen) {
            closeDropdown()
        } else {
            openDropdown()
        }
    }, [closeDropdown, isDropdownOpen, openDropdown, search]);


    // Effects

    useEffect(() => {
        setPointer(options.length ? 0 : null);
    }, [options]);

    useEffect(() => {
        closeDropdown();
    }, [value, closeDropdown]);


    return {
        dropdown: {
            isOpen: isDropdownOpen,
            open: openDropdown,
            close: closeDropdown,
            toggle,
            escape: escapeFromDropdown,
        },
        pointer: {
            position: pointer,
            setPosition: setPointer
        },
        handleKeyDown
    }
}

export default useDropdown;