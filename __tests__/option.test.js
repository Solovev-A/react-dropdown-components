import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import 'jest-styled-components';
import userEvent from "@testing-library/user-event";

import Option from './../lib/components/option';

describe('Option component', () => {
    describe('renders correctly', () => {
        test('without props passed', () => {
            render(<Option />);
            expect(screen.getByRole('option')).toMatchSnapshot();
        });

        test('when pointed', () => {
            window.HTMLElement.prototype.scrollIntoView = jest.fn()
            render(<Option isPointerOver={true} />);

            expect(screen.getByRole('option')).toMatchSnapshot();
        });

        test('when selected', () => {
            render(<Option isSelected={true} />);
            expect(screen.getByRole('option')).toMatchSnapshot();
        });
    });

    it('renders children', () => {
        render(<Option><span>Test</span></Option>);
        expect(screen.getByText(/test/i)).toBeInTheDocument();
    });

    describe('behavior', () => {
        it('use callback on click', () => {
            const onClick = jest.fn();
            const { container } = render(<Option onClick={onClick} />);
            userEvent.click(container.firstChild);
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('use callback on mouse enter', () => {
            const onMouseEnter = jest.fn();
            render(<Option onMouseEnter={onMouseEnter} />);
            userEvent.hover(screen.getByRole('option'));
            expect(onMouseEnter).toHaveBeenCalledTimes(1);
        });
    });
});