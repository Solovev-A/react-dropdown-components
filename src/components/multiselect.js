import React, { useEffect, useState } from 'react';
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
    selected = [],
    onSelectedChange = () => undefined,
    getOptionText = (item) => item,
    getSelectedText = (item) => item,
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска'
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(options);
    const [selectedItems, setSelectedItems] = useState(selected);
    const [pointer, setPointer] = useState(null);

    const updateSearch = (value) => {
        setSearch(value);
        const newSearchResults = filterOptions(options, value, getOptionText);
        setPointer(newSearchResults.length ? 0 : null);
        setSearchResults(newSearchResults);
    }

    const openDropdown = () => {
        if (pointer === null && searchResults.length) {
            setPointer(0);
        }
        setIsDropdownOpen(true);
    }

    const closeDropdown = () => {
        updateSearch('');
        setIsDropdownOpen(false);
    }

    const innerRef = useOuterClick(closeDropdown);
    const selectBounds = useElementBounds(innerRef);
    const dropdownPosition = useDropdownPosition(selectBounds, dropdownHeight);

    const SearchInput = <Input
        placeholder={selected.length ? null : placeholder}
        value={search}
        onSearchChange={updateSearch}
    />

    const isEqual = (item, another) => {
        return getOptionText(item) === getOptionText(another);
    }

    const handleOptionSelect = (option) => {
        const selectedOptionIndex = selectedItems.findIndex(item => isEqual(item, option))
        let newSelectedItems;

        if (selectedOptionIndex !== -1) {
            // если выбираемая опция уже была выбрана ранее, исключаем ее из выбора
            newSelectedItems = [
                ...selectedItems.slice(0, selectedOptionIndex),
                ...selectedItems.slice(selectedOptionIndex + 1)
            ]
        } else {
            newSelectedItems = [...selectedItems, option];
        }

        onSelectedChange(newSelectedItems);
        setSelectedItems(newSelectedItems);
    }

    const handleItemSelectionRemove = (item) => {
        const newSelectedItems = selectedItems.filter(selected => getSelectedText(selected) !== getSelectedText(item));
        setSelectedItems(newSelectedItems);
    }

    const handleUpdatePointer = (newPointer) => {
        setPointer(newPointer);
    }

    const handleKeyDown = (event) => {
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
    }

    return (
        <MultiselectView
            ref={innerRef}
            dropdownPosition={dropdownPosition}
            isDropdownOpen={isDropdownOpen}
            onClick={openDropdown}
            onKeyDown={handleKeyDown}
        >
            <MultiselectContent
                selected={selectedItems}
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
                        onUpdatePointer={handleUpdatePointer}
                        selectedItems={selectedItems}
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