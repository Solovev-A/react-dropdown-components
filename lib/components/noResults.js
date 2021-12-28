import React from 'react';
import { OptionView } from './option';
import styled from 'styled-components';

const NoResultsView = styled(OptionView)`
cursor: default;
`;

const NoResults = () => {
    return (
        <NoResultsView>
            Совпадений не найдено
        </NoResultsView>
    );
}

export default NoResults;