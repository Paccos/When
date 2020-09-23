import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DateGrid, { NameCircle, ToggleButton } from './DateGrid';
import SubmitButton from './SubmitButton';
import edit from '../images/Edit.png';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalWReact = withReactContent(Swal);

export const Poll = (props) => {
	const { pollId } = useParams();

	const [pollTitle, setPollTitle] = useState('');
	const [pollAuthor, setPollAuthor] = useState('');

	const [participants, setParticipants] = useState([]);
	const [namesAndStates, setNamesAndStates] = useState([]);
	const [userSelections, setUserSelections] = useState([]);

	const [username, setUsername] = useState('');
	const [usernameEmptyError, setUsernameEmptyError] = useState(false);

	const [idToEdit, setIdToEdit] = useState('');

	const extractedDatesWithParticipants = (userSelections) => {
		let result = {};

		userSelections.forEach((userSelection) => {
			userSelection.dateSelections.forEach((dateSelection) => {
				if (!result[dateSelection.date]) result[dateSelection.date] = [];
				if (dateSelection.state === ToggleButton.buttonStates.no) return;

				result[dateSelection.date].push({
					id: userSelection.id,
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
				setPollTitle(data.title);
				setPollAuthor(data.author);

				const userSelections = data.userSelections;

				setParticipants(
					userSelections.map((d) => ({
						name: d.name,
						id: d.id,
					}))
				);

				const datesWithParticipants = extractedDatesWithParticipants(
					userSelections
				);

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

	const displayName = Poll.name;

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
		if (!username || username.trim() === '') {
			setUsernameEmptyError(true);
			return;
		}

		setUsernameEmptyError(false);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: username, dateSelections: userSelections }),
		};

		console.log(requestOptions.body);

		fetch(`api/polls/${pollId}`, requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.then(() =>
				SwalWReact.fire({
					icon: 'success',
					title: `Vielen Dank für Deine Teilnahme, ${username}!`,
					html: (
						<SubmitButton
							submitHandler={() => {
								Swal.clickConfirm();
							}}
						/>
					),
					showConfirmButton: false,
				})
			)
			.then(() => fetchPollData());
	};

	const namesAndStatesWithoutId = (id) =>
		namesAndStates.map((dns) => ({
			date: dns.date,
			entries: dns.entries.filter((entry) => entry.id !== id),
		}));

	const selectionsForId = (id) =>
		userSelections.map((s) => {
			const namesAndStateForDate = namesAndStates.find(
				(nns) => nns.date === s.date
			);

			if (!namesAndStateForDate)
				return { date: s.date, state: ToggleButton.buttonStates.no };

			const entryForId = namesAndStateForDate.entries.find((e) => e.id === id);

			let state = ToggleButton.buttonStates.yes;

			if (!entryForId) {
				state = ToggleButton.buttonStates.no;
			} else if (entryForId.maybe) {
				state = ToggleButton.buttonStates.maybe;
			}

			return { date: s.date, state: state };
		});

	const handleEditAction = (id) => {
		window.scrollTo(0, 0);
		setIdToEdit(id);
		setUsername(participants.find((p) => p.id === id).name);
		setUserSelections(selectionsForId(id));
	};

	return (
		<div className="main">
			<div className="titleHeading">
				<h1 className="title">{pollTitle}</h1>
				<h3 className="subtitle">Umfrage von {pollAuthor}</h3>
				<input
					className={usernameEmptyError ? 'error' : ''}
					type="text"
					placeholder="Dein Name"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				></input>
			</div>
			<div className="resultsAndSubmit">
				<DateGrid
					entries={entriesIncludingUserSelections(
						namesAndStatesWithoutId(idToEdit),
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
						<button
							className="editCircle"
							onClick={() => handleEditAction(participant.id)}
						>
							<img src={edit} alt="Edit Button" />
						</button>
						<NameCircle name={participant.name} stacked={false} />
						<div className="participantName">{participant.name}</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
