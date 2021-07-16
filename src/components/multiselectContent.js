import React from 'react';
import styled from 'styled-components';
import Input from './input';
import SelectedItem from './selectedItem';

const MultiselectContentView = styled.div`
display: flex;
flex-wrap: wrap;
flex: 1;
padding-left: .375rem;
`;

const MultiselectContent = ({ selected, renderSelectedItem, onItemRemove, placeholder }) => {
    return (
        <MultiselectContentView>
            {
                selected.map((item, index) => {
                    const handleRemoveItem = () => onItemRemove(item);

                    return (
                        <SelectedItem key={item.id ?? index} onItemRemove={handleRemoveItem}>
                            {renderSelectedItem ? renderSelectedItem(item) : item}
                        </SelectedItem>
                    )
                })
            }
            <Input placeholder={selected.length ? null : placeholder} />
        </MultiselectContentView>
    );
}

export default MultiselectContent;