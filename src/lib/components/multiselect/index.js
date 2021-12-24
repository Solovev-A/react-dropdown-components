import React, { useState, useCallback } from 'react';

import useElementBounds from '../../hooks/useElementBounds';
import useOuterClick from '../../hooks/useOuterClick';
import useDropdownPosition from '../../hooks/useDropdownPosition'
import useInput from '../../hooks/useInput';
import useDropdown from '../../hooks/useDropdown';
import Container from '../container';
import Content from './content';
import Dropdown from '../dropdown';
import Input from '../input';
import { filterOptions } from '../../utils';


const Multiselect = ({
    options = [],
    value = [], // состояние выбранных элементов должно управляться родительским компонентом
    onChange = () => undefined,
    getOptionKey = (option) => option.id ?? option,
    renderOptionText = (option) => option,
    renderValueText = (option) => renderOptionText(option),
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска',
    disabled = false,
    getSearchValue = (option) => renderOptionText(option),
    ...props
}) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(options);

    const { inputRef, focus, blur } = useInput();

    const updateSearch = useCallback((value) => {
        setSearch(value);
        const newSearchResults = value === ''
            ? options
            : filterOptions(options, value, getSearchValue);
        setSearchResults(newSearchResults);
    }, [options, getSearchValue])

    const handleChange = useCallback((newValue) => {
        onChange(newValue);
        updateSearch('');
        focus();
    }, [focus, onChange, updateSearch])

    const handleOptionSelect = useCallback((option) => {
        const selectedOptionIndex = value.findIndex(item => getOptionKey(item) === getOptionKey(option))
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
    }, [value, getOptionKey, handleChange])

    const handleItemSelectionRemove = useCallback((item) => {
        const newValue = value.filter(selected => getOptionKey(selected) !== getOptionKey(item));
        handleChange(newValue);
    }, [value, getOptionKey, handleChange])

    const { dropdown, pointer, handleKeyDown } = useDropdown({
        onEscape: () => {
            blur();
            updateSearch('');
        },
        onOptionSelect: handleOptionSelect,
        options: searchResults,
        search,
        value
    });

    const onOuterClick = useCallback(() => {
        dropdown.escape();
    }, [dropdown])

    const onClick = useCallback(() => {
        dropdown.toggle();
        focus();
    }, [dropdown, focus])


    const innerRef = useOuterClick(onOuterClick);
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
            {...props}
        >
            <Content
                selected={value}
                getOptionKey={getOptionKey}
                renderValueText={renderValueText}
                onItemRemove={handleItemSelectionRemove}
                input={SearchInput}
            />
            {
                dropdown.isOpen && !disabled
                    ? <Dropdown
                        options={searchResults}
                        getOptionKey={getOptionKey}
                        renderOptionText={renderOptionText}
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