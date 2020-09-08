import React from 'react';
import './SubmitButton.css';
import submitArrow from '../images/SubmitArrow.png';

const SubmitButton = (props) => {
	return (
		<button className="submitButton" onClick={props.submitHandler}>
			<img src={submitArrow} />
		</button>
	);
};

export default SubmitButton;
