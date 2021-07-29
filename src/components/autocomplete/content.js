import React from 'react';
import styled from 'styled-components';
import Clear from '../clear';

const AutoCompleteContentView = styled.div`
display: flex;
flex: 1;
align-items: flex-end;
`

const ValueView = styled.span`
flex: 1;
color: #495057;
`

const Content = ({ value, renderValueText, input, onClear }) => {
    return (
        <AutoCompleteContentView>
            {
                value
                    ? <>
                        <ValueView>
                            {renderValueText(value)}
                        </ValueView>
                        <Clear onClick={onClear} />
                    </>
                    : input
            }
        </AutoCompleteContentView>
    );
}

export default Content;