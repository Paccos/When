import React from 'react';

import { SelectionState } from '../types/PollTypes';

import styles from './ToggleButton.module.css';
import checkmark from '../images/Checkmark.png';

export const ToggleButton = (props: {
	buttonState: SelectionState;
	handleButtonChange: (state: SelectionState) => void;
}) => {
	const buttonState = props.buttonState;

	const className = `${styles.toggleButton} ${
		styles[SelectionState[buttonState].toLowerCase()]
	}`;

	return (
		<button
			className={className}
			onClick={() => {
				if (buttonState === SelectionState.Yes)
					props.handleButtonChange(SelectionState.Maybe);
				else if (buttonState === SelectionState.Maybe)
					props.handleButtonChange(SelectionState.No);
				else if (buttonState === SelectionState.No)
					props.handleButtonChange(SelectionState.Yes);
			}}
		>
			<img src={checkmark} alt={SelectionState[buttonState]} />
		</button>
	);
};
