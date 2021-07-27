import React from 'react';
import styled from 'styled-components';
import Option from './option';
import NoResults from './noResults';


const DropdownView = styled.div`
position: absolute;
left: -1px;
padding: 0px;
max-height: ${({ maxHeight }) => maxHeight}px;
width: ${({ parentBounds }) => parentBounds.width}px;
display: flex;
flex-direction: column;
border-radius: 0;
background-color: white;
border: 1px solid #ced4da;
box-sizing: border-box;
z-index: 19;
${({ parentBounds, dropdownPosition }) =>
        dropdownPosition === 'top'
            ? `bottom: ${parentBounds.height}px;
               border-bottom: none;
               border-top-right-radius: .25rem;
               border-top-left-radius: .25rem;`
            : `top: ${parentBounds.height - 1}px;
               border-top: none;
               border-bottom-right-radius: .25rem;
               border-bottom-left-radius: .25rem;`
    }
`;


const Dropdown = ({
    options,
    getOptionKey = (option) => option,
    renderOptionText = (option) => option,
    onSelectOption,
    selectedItems,
    pointer,
    onUpdatePointer,
    parentBounds,
    maxHeight,
    position
}) => {
    return (
        <DropdownView
            dropdownPosition={position}
            maxHeight={maxHeight}
            parentBounds={parentBounds}
        >
            {
                options.length
                    ? options.map((option, index) => {
                        const key = getOptionKey(option);
                        const isPointerOver = index === pointer;
                        const isSelected = !!selectedItems.find(item => getOptionKey(item) === key);
                        const onClick = (event) => {
                            event.stopPropagation();
                            onSelectOption(option);
                        }

                        return (
                            <Option key={key}
                                isPointerOver={isPointerOver}
                                isSelected={isSelected}
                                onMouseEnter={() => onUpdatePointer(index)}
                                onClick={onClick}
                            >
                                {renderOptionText(option)}
                            </Option>
                        )
                    })
                    : <NoResults />
            }
        </DropdownView>
    );
}

export default Dropdown;