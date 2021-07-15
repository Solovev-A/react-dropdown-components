import React from 'react';
import styled from 'styled-components';

const DropdownView = styled.div`
position: absolute;
top: ${(props) => props.contentHeight}px;
left: -1px;
padding: 0px;
max-height: 240px;
width: ${(props) => props.contentWidth}px;
display: flex;
flex-direction: column;
border-radius: 0;
background-color: white;
border: 1px solid #ced4da;
box-sizing: border-box;
z-index: 19;
`;

const Dropdown = ({ contentHeight, contentWidth }) => {
    return (
        <DropdownView contentHeight={contentHeight} contentWidth={contentWidth}>
            Выпадающий список
        </DropdownView>
    );
}

export default Dropdown;