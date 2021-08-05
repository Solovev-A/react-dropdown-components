import React, { useState, useCallback } from 'react';

import useElementBounds from '../../hooks/useElementBounds';
import useOuterClick from '../../hooks/useOuterClick';
import useDropdownPosition from '../../hooks/useDropdownPosition'
import useInput from '../../hooks/useInput';
import useDropdown from '../../hooks/useDropdown';
import Container from '../container';
import Dropdown from '../dropdown';
import Input from '../input';
import Content from './content';
import Threshold from './threshold';
import Loading from './loading';


const Autocomplete = ({
    options = [],
    value = null,
    onChange = () => undefined,
    onSearchChange = () => undefined,
    threshold = 3,
    isLoading = false,
    getOptionKey = (option) => option.id ?? option,
    renderOptionText = (option) => option,
    renderValueText = (option) => renderOptionText(option),
    dropdownHeight = 300,
    placeholder = 'Начните ввод для поиска',
    disabled = false,
    ...props
}) => {
    const [search, setSearch] = useState('');
    const { inputRef, focus, blur } = useInput();

    const thresholdContent = search.length <= threshold ? <Threshold /> : null;
    const loadingContent = isLoading ? <Loading /> : null;

    const updateSearch = useCallback((value) => {
        setSearch(value);
        onSearchChange(value);
    }, [onSearchChange])

    const { dropdown, pointer, handleKeyDown } = useDropdown({
        onCloseWithEscape: blur,
        onOptionSelect: onChange,
        options: options,
        search,
        value
    });

    const onOuterClick = useCallback(() => {
        dropdown.close();
        blur();
    }, [dropdown, blur])

    const onClick = useCallback(() => {
        if (options.length && search.length > threshold) {
            dropdown.toggle();
        }
        focus();
    }, [focus, dropdown, options, search, threshold])

    const handleClear = useCallback(() => {
        updateSearch('');
        onChange(null);
    }, [updateSearch, onChange])


    const innerRef = useOuterClick(onOuterClick);
    const controlBounds = useElementBounds(innerRef);
    const dropdownPosition = useDropdownPosition(controlBounds, dropdownHeight);


    const SearchInput = <Input
        inputRef={inputRef}
        placeholder={value ? null : placeholder}
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
                value={value}
                renderValueText={renderValueText}
                input={SearchInput}
                onClear={handleClear}
            />
            {
                dropdown.isOpen && !disabled
                    ? <Dropdown
                        content={thresholdContent || loadingContent || null}
                        options={options}
                        getOptionKey={getOptionKey}
                        renderOptionText={renderOptionText}
                        onSelectOption={onChange}
                        pointer={pointer.position}
                        onUpdatePointer={pointer.setPosition}
                        parentBounds={controlBounds}
                        maxHeight={300}
                        position={dropdownPosition}
                    />
                    : null
            }
        </Container>
    )
}

export default Autocomplete;