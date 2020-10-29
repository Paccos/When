import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Home.module.css';
import sampleDesktop from '../images/SampleDesktop.png';
import sampleMobile from '../images/SampleMobile.png';
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
			<div className={styles.heroContainer}>
				<img src={sampleDesktop} className={styles.heroDesktop} />
				<img src={sampleMobile} className={styles.heroMobile} />
			</div>
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
		</div>
	);
};
