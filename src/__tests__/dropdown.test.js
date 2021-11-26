import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import 'jest-styled-components';
import userEvent from "@testing-library/user-event";

import Dropdown from './../lib/components/dropdown';

const requiredProps = {
    parentBounds: { width: 5, height: 5 }
};

const options = ['Apple', 'Google'];

describe('Dropdown component', () => {
    describe('renders correctly', () => {
        test('with required props only', () => {
            const { container } = render(<Dropdown {...requiredProps} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        test('at top position', () => {
            const { container } = render(<Dropdown {...requiredProps} position="top" />);
            expect(container.firstChild).toMatchSnapshot();
        });

        test('at bottom position', () => {
            const { container } = render(<Dropdown {...requiredProps} position="bottom" />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('use maxHeight prop', () => {
        const { container } = render(<Dropdown {...requiredProps} maxHeight={500} />);
        expect(container.firstChild).toHaveStyleRule('max-height', '500px');
    });

    it('width equal parent\'s width', () => {
        const { container } = render(<Dropdown {...requiredProps} />);
        expect(container.firstChild).toHaveStyleRule('width', `${requiredProps.parentBounds.width}px`);
    });

    it('renders content instead of options', () => {
        const props = {
            content: <span>Test</span>,
            options
        };
        render(<Dropdown {...requiredProps} {...props} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.queryAllByRole('option').length).toBe(0);
    });

    it('renders options', () => {
        render(<Dropdown {...requiredProps} options={options} />);
        expect(screen.getByText(/google/i)).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(2);
    });

    describe('behavior', () => {
        it('use callback on select option', () => {
            const onSelectOption = jest.fn();
            render(<Dropdown {...requiredProps} options={options} onSelectOption={onSelectOption} />);

            fireEvent(screen.getAllByRole('option')[0], new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }));

            expect(onSelectOption).toHaveBeenCalledTimes(1);
            expect(onSelectOption).toHaveBeenCalledWith('Apple');
        });

        it('use callback on update pointer', () => {
            const onUpdatePointer = jest.fn();
            render(<Dropdown {...requiredProps} options={options} onUpdatePointer={onUpdatePointer} />);

            const optionElements = screen.getAllByRole('option');

            userEvent.hover(optionElements[1]);

            expect(onUpdatePointer).toHaveBeenCalledTimes(1);
            expect(onUpdatePointer).toHaveBeenCalledWith(1);

            userEvent.hover(optionElements[0]);

            expect(onUpdatePointer).toHaveBeenCalledTimes(2);
            expect(onUpdatePointer).toHaveBeenCalledWith(0);
        });
    });
});