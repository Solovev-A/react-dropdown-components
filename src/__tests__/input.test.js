import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import 'jest-styled-components';

import Input from '../lib/components/input';

describe('Input component', () => {
    it('renders correctly', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toMatchSnapshot();
    });

    describe('behavior', () => {
        it('use callback on search change', () => {
            const onChange = jest.fn();
            render(<Input onSearchChange={onChange} />);

            userEvent.type(screen.getByRole('textbox'), 'test');

            expect(onChange).toHaveBeenCalledTimes(4);
            expect(onChange).toBeCalledWith('test');
        });

        it('use value prop', () => {
            render(<Input value="test" />);
            expect(screen.getByRole('textbox')).toHaveValue('test');
        });
    });
});