import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useElementBounds from '../hooks/useElementBounds';
import useOuterClick from './../hooks/useOuterClick';
import useDropdownPosition from './../hooks/useDropdownPosition'
import useInput from '../hooks/useInput';
import useDropdown from '../hooks/useDropdown';
import Dropdown from './dropdown';
import MultiselectContent from './multiselectContent';
import Input from './input';
import { filterOptions } from '../utils';


const MultiselectView = styled.div`
position: relative;
min-height: calc(1.5em + .75rem + 2px) !important;
width: 100%;
margin: 0;
padding-bottom: 6px;
box-sizing: border-box;
display: flex;
background-color: #fff;
border: 1px solid #ced4da;
border-radius: .25rem;
cursor: pointer;
${({ dropdownPosition, isDropdownOpen }) =>
        isDropdownOpen &&
        `border-${dropdownPosition}-right-radius: 0;
         border-${dropdownPosition}-left-radius: 0;
         border-${dropdownPosition}-color: #fff;`
    }

&:focus-within {
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
}
`;


const Multiselect = ({
    options = [],
    value, // состояние выбранных элементов должно управляться родительским компонентом
    onChange,
    getOptionText = (item) => item,
    getSelectedText = (item) => item,
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска'
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
        dropdown.close(withBlur)
        updateSearch('');
    }, [updateSearch, dropdown])

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
    />

    return (
        <MultiselectView
            ref={innerRef}
            dropdownPosition={dropdownPosition}
            isDropdownOpen={dropdown.isOpen}
            onKeyDown={handleKeyDown}
            onClick={onClick}
        >
            <MultiselectContent
                selected={value}
                getSelectedText={getSelectedText}
                onItemRemove={handleItemSelectionRemove}
                input={SearchInput}
            />
            {
                dropdown.isOpen
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
        </MultiselectView>
    )
}

export default Multiselect;