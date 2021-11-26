import React from 'react';
import { render } from "@testing-library/react";
import 'jest-styled-components';

import Container from './../lib/components/container';

describe('Container component', () => {
    describe('renders correctly', () => {
        test('without props passed', () => {
            const { container } = render(<Container />);
            expect(container.firstChild).toMatchSnapshot();
        });

        test('when disabled', () => {
            const { container } = render(<Container disabled={true} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        test('when dropdown is open at top', () => {
            const { container } = render(<Container dropdownPosition="top" isDropdownOpen={true} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        test('when dropdown is open at bottom', () => {
            const { container } = render(<Container dropdownPosition="bottom" isDropdownOpen={true} />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});