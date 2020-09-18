import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './NewPoll.css';
import SubmitButton from './SubmitButton';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/de';

export const NewPoll = (props) => {
	const [authorName, setAuthorName] = useState('');
	const [pollTitle, setPollTitle] = useState('');
	const [selectedDays, setSelectedDays] = useState([]);

	const history = useHistory();

	const onDaySelect = (day) => {
		let selection = [...selectedDays];
		const selectionIndex = selection.findIndex((date) =>
			DateUtils.isSameDay(date, day)
		);

		if (selectionIndex === -1) selection.push(day);
		else selection.splice(selectionIndex, 1);

		setSelectedDays(selection);
	};

	const postPoll = () => {
		const dateSelections = selectedDays.map((date) => ({
			date: date,
			state: 1,
		}));

		const poll = {
			author: authorName,
			title: pollTitle,
			userSelections: [{ name: authorName, dateSelections: dateSelections }],
		};

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(poll),
		};

		console.log(requestOptions.body);

		fetch('api/polls', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				const pollId = data.id;

				history.push(`/${pollId}`);
			});
	};

	return (
		<div className="main">
			<div>
				<h1 className="title">Umfrage erstellen</h1>

				<div className="formFields">
					<label>Dein Name:</label>
					<input
						type="text"
						placeholder="Max Mustermann"
						onChange={(e) => setAuthorName(e.target.value)}
					/>
					<label>Titel der Umfrage:</label>
					<input
						type="text"
						placeholder="Star Wars Marathon"
						onChange={(e) => setPollTitle(e.target.value)}
					/>
				</div>
			</div>

			<div className="chooseDays">
				<h3 className="subtitle" id="chooseDaysTitle">
					Tage auswählen:
				</h3>
				<h3 className="subtitle" id="chosenDaysCounter">
					{selectedDays.length} Tage ausgewählt
				</h3>
				<DayPicker
					localeUtils={MomentLocaleUtils}
					locale="de"
					selectedDays={selectedDays}
					onDayClick={onDaySelect}
				/>
				<SubmitButton submitHandler={() => postPoll()} />
			</div>
		</div>
	);
};
