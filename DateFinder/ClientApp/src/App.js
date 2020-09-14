import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import DateGrid, { NameCircle, ToggleButton } from './components/DateGrid';
import SubmitButton from './components/SubmitButton';
import edit from './images/Edit.png';

const App = (props) => {
	let pollId = '7357';

	const [participants, setParticipants] = useState([]);
	const [namesAndStates, setNamesAndStates] = useState([]);
	const [userSelections, setUserSelections] = useState([]);
	const [username, setUsername] = useState('');

	const extractedDatesWithParticipants = (userSelections) => {
		let result = {};

		userSelections.forEach((userSelection) => {
			userSelection.dateSelections.forEach((dateSelection) => {
				if (!result[dateSelection.date]) result[dateSelection.date] = [];
				if (dateSelection.state === ToggleButton.buttonStates.no) return;

				result[dateSelection.date].push({
					name: userSelection.name,
					maybe: dateSelection.state === ToggleButton.buttonStates.maybe,
				});
			});
		});

		return result;
	};

	const fetchPollData = useCallback(() => {
		fetch(`api/polls/${pollId}`)
			.then((response) => response.json())
			.then((data) => {
				setParticipants(data.map((d) => d.name));

				const datesWithParticipants = extractedDatesWithParticipants(data);

				setUserSelections(
					Object.keys(datesWithParticipants).map((date) => {
						return {
							date,
							state: ToggleButton.buttonStates.no,
						};
					})
				);

				setNamesAndStates(
					Object.entries(datesWithParticipants).map((entry) => {
						return {
							date: entry[0],
							entries: entry[1].sort((a, b) => a.maybe - b.maybe),
						};
					})
				);
			});
	}, [pollId]);

	useEffect(() => {
		fetchPollData();
	}, [fetchPollData]);

	const displayName = App.name;

	const handleUserSelection = (date, state) => {
		let selections = userSelections.slice();
		selections.find((s) => s.date === date).state = state;

		setUserSelections(selections);
	};

	const entriesIncludingUserSelections = (entries, userSelections) => {
		return entries.map((e) => {
			const selection = userSelections.find((u) => u.date === e.date);

			if (selection.state === ToggleButton.buttonStates.no) return e;
			else if (selection.state === ToggleButton.buttonStates.maybe)
				return {
					date: e.date,
					entries: [...e.entries, { name: username, maybe: true }],
				};
			else
				return {
					date: e.date,
					entries: [{ name: username, maybe: false }, ...e.entries],
				};
		});
	};

	const postUserSelection = (userSelections) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: username, dateSelections: userSelections }),
		};

		console.log(requestOptions.body);

		fetch(`api/polls/${pollId}`, requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.then(() => fetchPollData(pollId));
	};

	return (
		<div className="main">
			<div className="titleHeading">
				<h1 className="title">DnD</h1>
				<h3 className="subtitle">Umfrage von Pac</h3>
				<input
					type="text"
					placeholder="Dein Name"
					onChange={(e) => setUsername(e.target.value)}
				></input>
			</div>
			<div className="resultsAndSubmit">
				<DateGrid
					entries={entriesIncludingUserSelections(
						namesAndStates,
						userSelections
					)}
					userSelections={userSelections}
					handleUserSelection={handleUserSelection}
				/>
				<SubmitButton submitHandler={() => postUserSelection(userSelections)} />
			</div>
			<h3 id="participantHeading" className="subtitle">
				Teilnehmer:
			</h3>
			<div className="participants">
				{participants.map((participant, index) => (
					<React.Fragment key={index}>
						<button className="editCircle">
							<img src={edit} alt="Edit Button" />
						</button>
						<NameCircle name={participant} hue={Math.random() * 359} />
						<div className="participantName">{participant}</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default App;
