import React from 'react';
import { OptionView } from './../option';
import styled from 'styled-components';

const ThresholdView = styled(OptionView)`
cursor: default;
`;

const Threshold = () => {
    return (
        <ThresholdView>
            Продолжайте ввод, чтобы начался поиск
        </ThresholdView>
    );
}

export default Threshold;