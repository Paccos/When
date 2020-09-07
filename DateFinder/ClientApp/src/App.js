import React, { useState } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import DateGrid from './components/DateGrid';

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

	return (
		<Layout>
			<div className="titleHeading">
				<h1 className="title">DnD</h1>
				<h3 className="subtitle">Umfrage von Pac</h3>
				<input
					type="text"
					placeholder="Dein Name"
					onChange={(e) => setUsername(e.target.value)}
				></input>
			</div>
			<DateGrid
				entries={namesAndStates}
				userSelections={userSelections}
				handleUserSelection={handleUserSelection}
			/>
		</Layout>
	);
};

export default App;
