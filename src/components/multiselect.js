import React, { useState, useCallback } from 'react';

import useElementBounds from '../hooks/useElementBounds';
import useOuterClick from './../hooks/useOuterClick';
import useDropdownPosition from './../hooks/useDropdownPosition'
import useInput from '../hooks/useInput';
import useDropdown from '../hooks/useDropdown';
import Container from './container';
import MultiselectContent from './multiselectContent';
import Dropdown from './dropdown';
import Input from './input';
import { filterOptions } from '../utils';


const Multiselect = ({
    options = [],
    value, // состояние выбранных элементов должно управляться родительским компонентом
    onChange,
    getOptionText = (item) => item,
    getSelectedText = (item) => item,
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска',
    disabled = false
}) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(options);

    const { inputRef, focus, blur } = useInput();

    const handleChange = useCallback((newValue) => {
        onChange(newValue);
        focus();
    }, [focus, onChange])

    const handleOptionSelect = useCallback((option) => {
        const selectedOptionIndex = value.findIndex(item => getOptionText(item) === getOptionText(option))
        let newValue;

        if (selectedOptionIndex !== -1) {
            // если выбираемая опция уже была выбрана ранее, исключаем ее из выбора
            newValue = [
                ...value.slice(0, selectedOptionIndex),
                ...value.slice(selectedOptionIndex + 1)
            ]
        } else {
            newValue = [...value, option];
        }
        handleChange(newValue);
    }, [value, getOptionText, handleChange])

    const handleItemSelectionRemove = useCallback((item) => {
        const newValue = value.filter(selected => getSelectedText(selected) !== getSelectedText(item));
        handleChange(newValue);
    }, [value, getSelectedText, handleChange])

    const { dropdown, pointer, handleKeyDown, handleClick } = useDropdown({
        onCloseWithEscape: blur,
        onOptionSelect: handleOptionSelect,
        options: searchResults,
        search,
        value
    });

    const updateSearch = useCallback((value) => {
        setSearch(value);
        const newSearchResults = value === ''
            ? options
            : filterOptions(options, value, getOptionText);
        setSearchResults(newSearchResults);
    }, [options, getOptionText])

    const closeDropdown = useCallback((withBlur) => {
        dropdown.close();
        withBlur && blur();
        updateSearch('');
    }, [updateSearch, dropdown, blur])

    const onClick = useCallback(() => {
        handleClick();
        focus();
    }, [handleClick, focus])


    const innerRef = useOuterClick(() => closeDropdown(true));
    const selectBounds = useElementBounds(innerRef);
    const dropdownPosition = useDropdownPosition(selectBounds, dropdownHeight);


    const SearchInput = <Input
        inputRef={inputRef}
        placeholder={value.length ? null : placeholder}
        value={search}
        onSearchChange={updateSearch}
        disabled={disabled}
    />

    return (
        <Container
            ref={innerRef}
            dropdownPosition={dropdownPosition}
            isDropdownOpen={dropdown.isOpen}
            onKeyDown={handleKeyDown}
            onClick={onClick}
            disabled={disabled}
        >
            <MultiselectContent
                selected={value}
                getSelectedText={getSelectedText}
                onItemRemove={handleItemSelectionRemove}
                input={SearchInput}
            />
            {
                dropdown.isOpen && !disabled
                    ? <Dropdown
                        options={searchResults}
                        getOptionText={getOptionText}
                        onSelectOption={handleOptionSelect}
                        pointer={pointer.position}
                        onUpdatePointer={pointer.setPosition}
                        selectedItems={value}
                        parentBounds={selectBounds}
                        maxHeight={300}
                        position={dropdownPosition}
                    />
                    : null
            }
        </Container>
    )
}

export default Multiselect;