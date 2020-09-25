import React from 'react';
import styles from './SubmitButton.module.css';
import submitArrow from '../images/SubmitArrow.png';

const SubmitButton = (props: {
	submitHandler?: () => void;
	color?: string;
	id?: string;
	img?: string;
	alt?: string;
}) => {
	return (
		<button
			className={styles.submitButton}
			onClick={props.submitHandler}
			style={{ backgroundColor: props.color }}
			id={props.id}
		>
			<img
				src={props.img ? props.img : submitArrow}
				alt={props.alt ? props.alt : 'Submit Arrow'}
			/>
		</button>
	);
};

export default SubmitButton;
