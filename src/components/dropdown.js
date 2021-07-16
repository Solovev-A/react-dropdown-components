import React from 'react';
import styled from 'styled-components';

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

const Dropdown = ({ parentBounds, maxHeight, position }) => {
    return (
        <DropdownView
            dropdownPosition={position}
            maxHeight={maxHeight}
            parentBounds={parentBounds}
        >
            Выпадающий список
        </DropdownView>
    );
}

export default Dropdown;