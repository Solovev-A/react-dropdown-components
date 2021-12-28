import React from 'react';
import { OptionView } from '../option';
import styled from 'styled-components';

const LoadingView = styled(OptionView)`
cursor: default;
text-align: center;
`;

const Spinner = styled.span`
@keyframes spinner-border {
  to { transform: rotate(360deg); }
}
display: inline-block;
width: 1rem;
height: 1rem;
vertical-align: text-bottom;
border: .25em solid currentColor;
border-right-color: transparent;
border-radius: 50%;
border-width: .2em;
animation: spinner-border .75s linear infinite;
color: #6c757d!important;
`;

const Loading = () => {
    return (
        <LoadingView>
            <Spinner />
        </LoadingView>
    );
}

export default Loading;