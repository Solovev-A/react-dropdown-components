const getDropdownPosition = (parentBounds, dropdownMaxHeight) => {
    const dropdownBottom = parentBounds.bottom + dropdownMaxHeight;
    return window.innerHeight > dropdownBottom
        ? 'bottom'
        : 'top';
}

export { getDropdownPosition };