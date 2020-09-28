import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './SubmitButton.module.css';
import submitArrow from '../images/SubmitArrow.png';

export const SubmitButton = (props: {
	submitHandler?: () => void;
	color?: string;
	id?: string;
	img?: string;
	alt?: string;
	disabled?: boolean;
	tooltip?: string;
}) => {
	return (
		<button
			className={styles.submitButton}
			onClick={props.submitHandler}
			style={{ backgroundColor: props.color }}
			id={props.id}
			data-tip={props.tooltip}
			disabled={props.disabled}
		>
			<img
				src={props.img ? props.img : submitArrow}
				alt={props.alt ? props.alt : 'Submit Arrow'}
			/>
			<ReactTooltip place="bottom" type="dark" effect="solid" />
		</button>
	);
};
