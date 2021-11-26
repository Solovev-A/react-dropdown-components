import React from 'react';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import 'jest-styled-components'

import Clear from '../lib/components/clear';

describe('Clear component', () => {
    it('renders correctly', () => {
        const { container } = render(<Clear />);
        expect(container.firstChild).toMatchSnapshot();
    });

    describe('behavior', () => {
        it('use callback on click', () => {
            const onClick = jest.fn();
            const { container } = render(<Clear onClick={onClick} />);
            userEvent.click(container.firstChild);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
});