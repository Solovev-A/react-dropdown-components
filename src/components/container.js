//import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
${({ disabled }) => disabled
        ? `pointer-events: none;
           background-color: #e9ecef;`
        : ''
    }

&:focus-within {
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
}
`;

export default Container;