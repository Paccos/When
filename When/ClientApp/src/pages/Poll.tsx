import React, { useState, useEffect, useCallback } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styles from './Poll.module.css';

import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { DateGrid } from '../components/DateGrid';
import { ParticipantList } from '../components/ParticipantList';
import { SubmitButton } from '../components/SubmitButton';

import { SelectionState, UserSelection } from '../types/PollTypes';

import cross from '../images/Cross.png';

const SwalWReact = withReactContent(Swal);

export const Poll = () => {
	/* States / Properties */

	const displayName = Poll.name;

	const { pollId } = useParams();
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(true);
	const [pollTitle, setPollTitle] = useState('');
	const [authorId, setAuthorId] = useState('');

	const [participants, setParticipants] = useState(
		[] as { id: string; name: string }[]
	);
	const [namesAndStates, setNamesAndStates] = useState(
		[] as {
			date: Date;
			entries: { name: string; maybe: boolean; id: string }[];
		}[]
	);
	const [userSelections, setUserSelections] = useState(
		[] as { date: Date; state: SelectionState }[]
	);

	const [username, setUsername] = useState('');
	const [usernameEmptyError, setUsernameEmptyError] = useState(false);

	const [idToEdit, setIdToEdit] = useState('');

	/* Data manipulation, information retrieval */

	const extractedDatesWithParticipants = (userSelections: UserSelection[]) => {
		let result: {
			[key: string]: { id: string; name: string; maybe: boolean }[];
		} = {};

		userSelections.forEach((userSelection) => {
			userSelection.dateSelections.forEach((dateSelection) => {
				if (!result[dateSelection.date + ''])
					result[dateSelection.date + ''] = [] as {
						id: string;
						name: string;
						maybe: boolean;
					}[];
				if (dateSelection.state === SelectionState.No) return;

				result[dateSelection.date + ''].push({
					id: userSelection.id,
					name: userSelection.name,
					maybe: dateSelection.state === SelectionState.Maybe,
				});
			});
		});

		return result;
	};

	const entriesIncludingUserSelections = (
		entries: { date: Date; entries: { name: string; maybe: boolean }[] }[],
		userSelections: { date: Date; state: SelectionState }[]
	) =>
		entries.map((e) => {
			const selection = userSelections.find(
				(u) => u.date.getTime() === e.date.getTime()
			);

			if (!selection) return e;

			if (selection.state === SelectionState.No) return e;
			else if (selection.state === SelectionState.Maybe)
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

	const namesAndStatesWithoutId = (id: string) =>
		namesAndStates.map((dns) => ({
			date: dns.date,
			entries: dns.entries.filter((entry) => entry.id !== id),
		}));

	const selectionsForId = (id: string) =>
		userSelections.map((s) => {
			const namesAndStateForDate = namesAndStates.find(
				(nns) => nns.date.getTime() === s.date.getTime()
			);

			if (!namesAndStateForDate)
				return { date: s.date, state: SelectionState.No };

			const entryForId = namesAndStateForDate.entries.find((e) => e.id === id);

			let state = SelectionState.Yes;

			if (!entryForId) {
				state = SelectionState.No;
			} else if (entryForId.maybe) {
				state = SelectionState.Maybe;
			}

			return { date: s.date, state: state };
		});

	/* CRUD operations */

	const fetchPollData = useCallback(async () => {
		const response = await fetch(`api/polls/${pollId}`);
		const data = await response.json();

		setIsLoading(false);

		if (data.errors || data.status == 404) {
			history.push('/404');
			return;
		}

		setPollTitle(data.title);
		setAuthorId(data.authorId);

		const userSelections: UserSelection[] = data.userSelections;

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
					date: new Date(date),
					state: SelectionState.No,
				};
			})
		);

		setNamesAndStates(
			Object.entries(datesWithParticipants).map((entry) => {
				return {
					date: new Date(entry[0]),
					entries: entry[1].sort((a, b) =>
						a.maybe === b.maybe ? 0 : a.maybe ? 1 : -1
					),
				};
			})
		);
	}, [pollId]);

	const postUserSelection = async (
		username: string,
		userSelections: { date: Date; state: SelectionState }[]
	) => {
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

	const putUserSelection = async (
		id: string,
		username: string,
		userSelections: { date: Date; state: SelectionState }[]
	) => {
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

	const deleteUserSelection = async (id: string) => {
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

	const handleUserSelection = (date: Date, state: SelectionState) => {
		let selections = userSelections.slice();
		const index = selections.findIndex(
			(s) => s.date.getTime() === date.getTime()
		);

		if (index !== -1) {
			selections[index].state = state;
			setUserSelections(selections);
		}
	};

	const handleEditAction = (id: string) => {
		window.scrollTo(0, 0);
		setIdToEdit(id);

		if (!id || id.trim() === '') {
			setUsername('');
		} else {
			const participant = participants.find((p) => p.id === id);

			if (participant) setUsername(participant.name);
		}

		setUserSelections(selectionsForId(id));
	};

	/* Lifecycle */

	useEffect(() => {
		fetchPollData();
	}, [fetchPollData]);

	/* UI */

	const pollAuthor = participants.find((p) => p.id === authorId)?.name;

	if (isLoading) {
		return (<div className={styles.spinner}><ClipLoader color="#afafaf" size="60" /></div>);
	}

	return (
		<div className="main">
			<div className="titleHeading">
				<h1 className="title">
					{pollTitle}
					<p className="when">, When?</p>
				</h1>
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
				authorId={authorId}
			/>
		</div>
	);
};
