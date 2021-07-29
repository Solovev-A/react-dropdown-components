import React from 'react';
import styled from "styled-components";

const ClearView = styled.span`
padding-right: 3px;
padding-left: 3px;
font-weight: 700;
font-size: 1.25rem;
color: #bdc6d0;
align-self: center;

&:hover {
    color: #343a40;
}
`;

const Clear = ({ onClick }) => {
    return (
        <ClearView onClick={onClick} title="Очистить">
            &times;
        </ClearView>
    );
}

export default Clear;