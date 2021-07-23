import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import useElementBounds from '../hooks/useElementBounds';
import useOuterClick from './../hooks/useOuterClick';
import useDropdownPosition from './../hooks/useDropdownPosition'
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
    // State

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(options);
    const [pointer, setPointer] = useState(null);


    // Functions

    const updateSearch = useCallback((value) => {
        setSearch(value);
        const newSearchResults = filterOptions(options, value, getOptionText);
        setPointer(newSearchResults.length ? 0 : null);
        setSearchResults(newSearchResults);
    }, [options, getOptionText])

    const openDropdown = useCallback(() => {
        if (pointer === null && searchResults.length) {
            setPointer(0);
        }
        setIsDropdownOpen(true);
    }, [pointer, searchResults])

    const closeDropdown = useCallback(() => {
        updateSearch('');
        setIsDropdownOpen(false);
    }, [updateSearch])

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

        onChange(newValue);
    }, [value, getOptionText, onChange])

    const handleItemSelectionRemove = useCallback((item) => {
        const newSelectedItems = value.filter(selected => getSelectedText(selected) !== getSelectedText(item));
        onChange(newSelectedItems);
    }, [value, getSelectedText, onChange])

    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (!isDropdownOpen) {
                    setPointer(searchResults.length - 1);
                    openDropdown();
                } else {
                    if (!searchResults.length) return;
                    if (pointer - 1 < 0) {
                        setPointer(searchResults.length - 1);
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
                    if (!searchResults.length) return;
                    if (pointer + 1 >= searchResults.length) {
                        setPointer(0);
                    } else {
                        setPointer(pointer + 1);
                    }
                }
                break;
            case 'Enter':
                const option = searchResults[pointer];
                handleOptionSelect(option);
                break;
            case 'Escape':
                closeDropdown();
                break;
            default:
                break;
        }
    }, [closeDropdown, isDropdownOpen, handleOptionSelect, openDropdown, pointer, searchResults])


    // Work with DOM

    const innerRef = useOuterClick(closeDropdown);
    const selectBounds = useElementBounds(innerRef);
    const dropdownPosition = useDropdownPosition(selectBounds, dropdownHeight);


    // Components

    const SearchInput = <Input
        placeholder={value.length ? null : placeholder}
        value={search}
        onSearchChange={updateSearch}
    />

    return (
        <MultiselectView
            ref={innerRef}
            dropdownPosition={dropdownPosition}
            isDropdownOpen={isDropdownOpen}
            onClick={openDropdown}
            onKeyDown={handleKeyDown}
        >
            <MultiselectContent
                selected={value}
                getSelectedText={getSelectedText}
                onItemRemove={handleItemSelectionRemove}
                input={SearchInput}
            />
            {
                isDropdownOpen
                    ? <Dropdown
                        options={searchResults}
                        getOptionText={getOptionText}
                        onSelectOption={handleOptionSelect}
                        pointer={pointer}
                        onUpdatePointer={setPointer}
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