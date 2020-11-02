import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { ToggleButton } from './ToggleButton';
import { SelectionState } from '../types/PollTypes';
import { act } from 'react-dom/test-utils';

describe('<ToggleButton />', () => {
	it('Should change state from No to Yes', async () => {
		const onButtonChange = jest.fn();

		const button = render(
			<ToggleButton
				buttonState={SelectionState.No}
				handleButtonChange={onButtonChange}
			/>
		);

		act(() => {
			fireEvent.click(screen.getByAltText('No'));
		});

		expect(onButtonChange).toBeCalledWith(SelectionState.Yes);
	});

	it('Should change state from Yes to Maybe', async () => {
		const onButtonChange = jest.fn();

		const button = render(
			<ToggleButton
				buttonState={SelectionState.Yes}
				handleButtonChange={onButtonChange}
			/>
		);

		act(() => {
			fireEvent.click(screen.getByAltText('Yes'));
		});

		expect(onButtonChange).toBeCalledWith(SelectionState.Maybe);
	});

	it('Should change state from Maybe to No', async () => {
		const onButtonChange = jest.fn();

		const button = render(
			<ToggleButton
				buttonState={SelectionState.Maybe}
				handleButtonChange={onButtonChange}
			/>
		);

		act(() => {
			fireEvent.click(screen.getByAltText('Maybe'));
		});

		expect(onButtonChange).toBeCalledWith(SelectionState.No);
	});
});
