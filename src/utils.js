const getDropdownPosition = (parentBounds, dropdownMaxHeight) => {
    const dropdownBottom = parentBounds.bottom + dropdownMaxHeight;
    return window.innerHeight > dropdownBottom
        ? 'bottom'
        : 'top';
}

const filterOptions = (options, search, getOptionValue = (item) => item) => {
    const regExpSafeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(regExpSafeSearch, 'i');
    return options.filter(item => reg.test(getOptionValue(item)));
}

export { getDropdownPosition, filterOptions };