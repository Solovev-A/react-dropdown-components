import React from 'react';
import styled from 'styled-components';

const SelectedItemView = styled.div`
display: flex;
align-items: center;
padding: 0;
padding-right: .75rem;
margin-top: calc(.375rem - 2px);
margin-right: .375rem;
margin-bottom: 6px;
color: #495057;
font-size: 1rem;
cursor: pointer;
border: 1px solid #bdc6d0;
border-radius: .2rem;
`;

const RemoveItem = styled.span`
padding-right: 3px;
padding-left: 3px;
margin-right: 1px;
margin-left: 3px;
font-weight: 700;
color: #bdc6d0;

&:hover {
    color: #343a40;
}
`;

const SelectedItem = ({ onItemRemove, children }) => {
    return (
        <SelectedItemView>
            <RemoveItem onClick={(e) => onItemRemove()}>
                &times;
            </RemoveItem>
            {children}
        </SelectedItemView>
    );
}

export default SelectedItem;