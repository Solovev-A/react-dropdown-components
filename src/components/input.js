import React from 'react';
import styled from 'styled-components';

const InputView = styled.input`
flex-grow: 1;
margin-top: calc(.375rem - 2px);
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

const Input = ({ placeholder, value, onSearchChange }) => {
    const onChange = (event) => onSearchChange(event.target.value);

    return (
        <InputView
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export default Input;