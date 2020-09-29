import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Home.module.css';
import sample from '../images/Sample.png';
import sampleColumn from '../images/Sample_column.png';
import { SubmitButton } from '../components/SubmitButton';

export const Home = () => {
	const history = useHistory();

	return (
		<div className="main">
			<div className="titleHeading">
				<h1 className="title">
					<p className="when">When?</p>
				</h1>
				<h3 className="subtitle">
					Übersichtliche und einfache Terminfindung. Sonst nichts.
				</h3>
			</div>
			<img src={sample} className={styles.hero} />
			<div
				className={styles.newPollButton}
				onClick={() => history.push('/new')}
			>
				<h1>
					Neue Umfrage
					<p className="when">, When?</p>
				</h1>
				<SubmitButton id={styles.embeddedSubmit} />
			</div>
			<img src={sampleColumn} className={styles.heroColumn} />
		</div>
	);
};
