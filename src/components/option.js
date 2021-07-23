import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const OptionView = styled.span`
padding: .375rem .75rem;
display: block; 
overflow: hidden; 
white-space: nowrap;
cursor: pointer;

${({ isPointerOver, isSelected }) => {
        if (isPointerOver) {
            return `
            color: #fff;
            background-color: #007bff;`
        }

        if (isSelected) {
            return `
            color: #212529;
            background-color: #f2f2f2;`
        }
    }}
`;


const Option = ({ isPointerOver, isSelected, children, ...props }) => {
    const optionRef = useRef();

    useEffect(() => {
        if (isPointerOver && optionRef.current) {
            optionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    }, [isPointerOver])

    return (
        <OptionView
            ref={optionRef}
            role='option'
            aria-selected={isSelected}
            title={children}
            isPointerOver={isPointerOver}
            isSelected={isSelected}
            {...props}
        >
            {children}
        </OptionView>
    );
}

export default Option;
export { OptionView };