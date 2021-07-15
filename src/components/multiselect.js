import React, { useState } from 'react';
import styled from 'styled-components';

import useOuterClick from './../hooks/useOuterClick';
import Dropdown from './dropdown';
import MultiselectContent from './multiselectContent';

const MultiselectView = styled.div`
position: relative;
min-height: calc(1.5em + .75rem + 2px) !important;
width: 100%;
margin: 0;
box-sizing: border-box;
display: flex;
align-items: center;
background-color: #fff;
border: 1px solid #ced4da;
border-radius: .25rem;
cursor: pointer;

&:focus-within {
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
}
`;

const Multiselect = ({ options, selected, onInputChange, onSelectedChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const innerRef = useOuterClick(() => setIsDropdownOpen(false));

    return (
        <MultiselectView ref={innerRef}>
            <MultiselectContent selected={selected} />
            <Dropdown contentHeight='35' contentWidth='600' />
        </MultiselectView>
    )
}

export default Multiselect;