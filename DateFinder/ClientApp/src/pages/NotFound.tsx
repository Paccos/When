import React from 'react';
import { useHistory } from 'react-router-dom';

import { SubmitButton } from '../components/SubmitButton';

import styles from './NotFound.module.css';
import crossLarge from '../images/CrossLarge.png';

export const NotFound = (props: { pollId: string }) => {
	const history = useHistory();

	return (
		<div className="main">
			<h1 className="title">Umfrage nicht gefunden</h1>
			<img src={crossLarge} alt="Not found" className={styles.notFoundImage} />
			<h3 className="subtitle">
				Die Umfrage mit der ID {props.pollId ?? 'unknown'} wurde nicht
				gefunden...
			</h3>
			<h3 className="subtitle">
				Du kannst hier eine eigene Umfrage erstellen:
			</h3>
			<SubmitButton
				submitHandler={() => history.push('/new')}
				id={styles.newPollButton}
			/>
		</div>
	);
};
