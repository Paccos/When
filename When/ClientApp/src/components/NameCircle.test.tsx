import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { NameCircle } from './NameCircle';

describe('<NameCircle />', () => {
	it('Should display correct initials', async () => {
		const circle = render(<NameCircle name="John Doe" />);

		expect(circle.container.firstElementChild?.innerHTML).toEqual('JD');
	});

	it('Should not have maybe class when not in Maybe state', async () => {
		const circle = render(<NameCircle name="John Doe" />);

		expect(circle.container.firstChild).toHaveClass('nameCircle');
		expect(circle.container.firstChild).not.toHaveClass('maybe');
	});

	it('Should have maybe class in Maybe state', async () => {
		const circle = render(<NameCircle name="John Doe" maybe={true} />);

		expect(circle.container.firstChild).toHaveClass('nameCircle');
		expect(circle.container.firstChild).toHaveClass('maybe');
	});

	it('Should not have stacked class when not in stacked state', async () => {
		const circle = render(<NameCircle name="John Doe" />);

		expect(circle.container.firstChild).toHaveClass('nameCircle');
		expect(circle.container.firstChild).not.toHaveClass('stackedCircle');
	});

	it('Should have stacked class when in stacked state', async () => {
		const circle = render(<NameCircle name="John Doe" stacked={true} />);

		expect(circle.container.firstChild).toHaveClass('nameCircle');
		expect(circle.container.firstChild).toHaveClass('stackedCircle');
	});
});
