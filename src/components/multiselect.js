import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useElementBounds from '../hooks/useElementBounds';
import useOuterClick from './../hooks/useOuterClick';
import useDropdownPosition from './../hooks/useDropdownPosition'
import Dropdown from './dropdown';
import MultiselectContent from './multiselectContent';

const MultiselectView = styled.div`
position: relative;
min-height: calc(1.5em + .75rem + 2px) !important;
width: 100%;import useDropdownPosition from './../hooks/useDropdownPosition';

margin: 0;
box-sizing: border-box;
display: flex;
align-items: center;
background-color: #fff;
border: 1px solid #ced4da;
border-radius: .25rem;
cursor: pointer;
${({ dropdownPosition, isDropdownOpen }) =>
        isDropdownOpen &&
        `border-${dropdownPosition}-right-radius: 0;
         border-${dropdownPosition}-left-radius: 0;
         border-${dropdownPosition}: none;`
    }

&:focus-within {
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
}
`;

const Multiselect = ({ options, selected, onInputChange, onSelectedChange, dropdownHeight = 300 }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const innerRef = useOuterClick(() => setIsDropdownOpen(!isDropdownOpen));
    const selectBounds = useElementBounds(innerRef);
    const dropdownPosition = useDropdownPosition(selectBounds, dropdownHeight);


    return (
        <MultiselectView
            ref={innerRef}
            dropdownPosition={dropdownPosition}
            isDropdownOpen={isDropdownOpen}
        >
            <MultiselectContent selected={selected} />
            {isDropdownOpen ? <Dropdown parentBounds={selectBounds} maxHeight={300} position={dropdownPosition} /> : null}
        </MultiselectView>
    )
}

export default Multiselect;