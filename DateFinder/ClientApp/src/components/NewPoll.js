import React from 'react';

import './NewPoll.css';
import SubmitButton from './SubmitButton';

export const NewPoll = (props) => {
	return (
		<div className="main">
			<div>
				<h1 className="title">Umfrage erstellen</h1>

				<div className="formFields">
					<label>Dein Name:</label>
					<input type="text" placeholder="Max Mustermann" />
					<label>Titel der Umfrage:</label>
					<input type="text" placeholder="Star Wars Marathon" />
				</div>
			</div>

			<div className="chooseDays">
				<h3 className="subtitle" id="chooseDaysTitle">
					Tage auswählen:
				</h3>
				<h3 className="subtitle" id="chosenDaysCounter">
					9 Tage ausgewählt
				</h3>
				<div className="calendar"></div>
				<SubmitButton />
			</div>
		</div>
	);
};
