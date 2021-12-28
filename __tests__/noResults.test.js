import React from 'react';
import { render, screen } from "@testing-library/react";
import 'jest-styled-components';

import NoResults from './../lib/components/noResults';

describe('NoResults component', () => {
    it('renders correctly', () => {
        render(<NoResults />);
        expect(screen.getByText(/совпадений не найдено/i)).toMatchSnapshot();
    });
});