import React, { useState, useEffect, useCallback } from 'react';
import styles from './Poll.module.css';

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import DateGrid, { ToggleButton } from '../components/DateGrid';
import { ParticipantList } from '../components/ParticipantList';
import SubmitButton from '../components/SubmitButton';

import cross from '../images/Cross.png';

const SwalWReact = withReactContent(Swal);

export const Poll = (props) => {
	/* States / Properties */

	const displayName = Poll.name;

	const { pollId } = useParams();

	const [pollTitle, setPollTitle] = useState('');
	const [pollAuthor, setPollAuthor] = useState('');

	const [participants, setParticipants] = useState([]);
	const [namesAndStates, setNamesAndStates] = useState([]);
	const [userSelections, setUserSelections] = useState([]);

	const [username, setUsername] = useState('');
	const [usernameEmptyError, setUsernameEmptyError] = useState(false);

	const [idToEdit, setIdToEdit] = useState('');

	/* Data manipulation, information retrieval */

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

	const entriesIncludingUserSelections = (entries, userSelections) =>
		entries.map((e) => {
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

	/* CRUD operations */

	const fetchPollData = useCallback(async () => {
		const response = await fetch(`api/polls/${pollId}`);
		const data = await response.json();

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
	}, [pollId]);

	const postUserSelection = async (username, userSelections) => {
		if (!username || username.trim() === '') {
			setUsernameEmptyError(true);
			return;
		}

		setUsernameEmptyError(false);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: username,
				dateSelections: userSelections,
				pollId: pollId,
			}),
		};

		await fetch(`api/userSelections`, requestOptions);

		await SwalWReact.fire({
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
		});

		fetchPollData();
	};

	const putUserSelection = async (id, username, userSelections) => {
		if (!username || username.trim() === '') {
			setUsernameEmptyError(true);
			return;
		}

		setUsernameEmptyError(false);

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: id,
				name: username,
				dateSelections: userSelections,
				pollId: pollId,
			}),
		};

		await fetch(`api/userSelections/${id}`, requestOptions);

		await SwalWReact.fire({
			icon: 'success',
			title: `Deine Änderungen wurden erfolgreich gespeichert, ${username}!`,
			html: (
				<SubmitButton
					submitHandler={() => {
						Swal.clickConfirm();
					}}
				/>
			),
			showConfirmButton: false,
		});

		handleEditAction('');
		fetchPollData();
	};

	const deleteUserSelection = async (id) => {
		const requestOptions = {
			method: 'DELETE',
		};

		await fetch(`api/userSelections/${id}`, requestOptions);

		await SwalWReact.fire({
			icon: 'success',
			title: 'Der Eintrag wurde gelöscht!',
			html: (
				<SubmitButton
					submitHandler={() => {
						Swal.clickConfirm();
					}}
				/>
			),
			showConfirmButton: false,
		});

		handleEditAction('');
		fetchPollData();
	};

	/* UI Actions */

	const handleUserSelection = (date, state) => {
		let selections = userSelections.slice();
		selections.find((s) => s.date === date).state = state;

		setUserSelections(selections);
	};

	const handleEditAction = (id) => {
		window.scrollTo(0, 0);
		setIdToEdit(id);

		if (!id || id.trim() === '') {
			setUsername('');
		} else {
			setUsername(participants.find((p) => p.id === id).name);
		}

		setUserSelections(selectionsForId(id));
	};

	/* Lifecycle */

	useEffect(() => {
		fetchPollData();
	}, [fetchPollData]);

	/* UI */

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
			<div className={styles.resultsAndSubmit}>
				<DateGrid
					entries={entriesIncludingUserSelections(
						namesAndStatesWithoutId(idToEdit),
						userSelections
					)}
					userSelections={userSelections}
					handleUserSelection={handleUserSelection}
				/>
				<div className={styles.submitAndAbort}>
					{idToEdit.trim() !== '' && (
						<SubmitButton
							img={cross}
							alt="Abort"
							id="abortEditButton"
							submitHandler={() => handleEditAction('')}
						/>
					)}
					<SubmitButton
						submitHandler={() => {
							if (!idToEdit || idToEdit.trim() === '') {
								postUserSelection(username, userSelections);
							} else {
								putUserSelection(idToEdit, username, userSelections);
							}
						}}
					/>
				</div>
			</div>
			<h3 id={styles.participantHeading} className="subtitle">
				Teilnehmer:
			</h3>
			<ParticipantList
				participants={participants}
				handleEditAction={handleEditAction}
				deleteUserSelection={deleteUserSelection}
				idToEdit={idToEdit}
				refresh={fetchPollData}
			/>
		</div>
	);
};
