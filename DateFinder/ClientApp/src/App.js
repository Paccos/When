import React, { useState } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import DateGrid from './components/DateGrid';
import SubmitButton from './components/SubmitButton';

const App = (props) => {
	const dummy = [
		{
			date: '2020-08-20',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-22',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-23',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-24',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-26',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-28',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-29',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-30',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
		{
			date: '2020-08-31',
			entries: [
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: false },
				{ name: 'Max Mustermann', maybe: true },
			],
		},
	];

	const displayName = App.name;

	const [username, setUsername] = useState('');
	const [namesAndStates, setNamesAndStates] = useState(dummy);

	const initialSelection = dummy.map((entry) => ({
		date: entry.date,
		state: 'no',
	}));
	const [userSelections, setUserSelections] = useState(initialSelection);

	const handleUserSelection = (date, state) => {
		let selections = userSelections.slice();
		selections.find((s) => s.date === date).state = state;

		setUserSelections(selections);
	};

	const entriesIncludingUserSelections = (entries, userSelections) => {
		return entries.map((e) => {
			const selection = userSelections.find((u) => u.date === e.date);

			if (selection.state === 'no') return e;
			else if (selection.state === 'maybe')
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
				<SubmitButton />
			</div>
		</div>
	);
};

export default App;
