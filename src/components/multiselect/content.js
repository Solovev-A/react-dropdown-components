import React from 'react';
import styled from 'styled-components';
import SelectedItem from './selectedItem';

const MultiselectContentView = styled.div`
display: flex;
flex-wrap: wrap;
flex: 1;
`;

const MultiselectContent = ({ selected, getOptionKey, renderValueText, onItemRemove, input }) => {
    return (
        <MultiselectContentView>
            {
                selected.map((option) => {
                    const handleRemoveItem = () => onItemRemove(option);

                    return (
                        <SelectedItem key={getOptionKey(option)} onItemRemove={handleRemoveItem}>
                            {renderValueText(option)}
                        </SelectedItem>
                    )
                })
            }
            {input}
        </MultiselectContentView>
    );
}

export default MultiselectContent;