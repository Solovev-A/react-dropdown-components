import React from 'react';
import styled from 'styled-components';

const InputView = styled.input`
flex-grow: 1;
padding: 0;
box-sizing: border-box;
border: none;
font-family: inherit;
font-size: inherit;
line-height: inherit;
color: #495057;

&:focus {
    outline: 0;
}
`;

const Input = ({ placeholder, search, onSearchChange }) => {
    const onChange = (event) => onSearchChange(event.target.value);

    return (
        <InputView
            placeholder={placeholder}
            value={search}
            onChange={onChange}
        />
    );
}

export default Input;