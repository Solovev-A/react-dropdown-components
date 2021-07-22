import React from 'react';
import styled from 'styled-components';
import SelectedItem from './selectedItem';

const MultiselectContentView = styled.div`
display: flex;
flex-wrap: wrap;
flex: 1;
padding-left: .375rem;
`;

const MultiselectContent = ({ selected, getSelectedText, onItemRemove, input }) => {
    return (
        <MultiselectContentView>
            {
                selected.map((item) => {
                    const handleRemoveItem = () => onItemRemove(item);

                    return (
                        <SelectedItem key={getSelectedText(item)} onItemRemove={handleRemoveItem}>
                            {getSelectedText(item)}
                        </SelectedItem>
                    )
                })
            }
            {input}
        </MultiselectContentView>
    );
}

export default MultiselectContent;