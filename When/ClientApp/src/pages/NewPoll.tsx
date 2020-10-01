import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './NewPoll.module.css';
import { SubmitButton } from '../components/SubmitButton';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/de';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CopyableComponent } from '../components/CopyableComponent';

const SwalWReact = withReactContent(Swal);

export const NewPoll = () => {
	const [authorName, setAuthorName] = useState('');
	const [pollTitle, setPollTitle] = useState('');
	const [selectedDays, setSelectedDays] = useState([] as Date[]);

	const [nameEmptyError, setNameEmptyError] = useState(false);
	const [titleEmptyError, setTitleEmptyError] = useState(false);
	const [selectionEmptyError, setSelectionEmptyError] = useState(false);

	const history = useHistory();

	const onDaySelect = (day: Date) => {
		let selection = [...selectedDays];
		const selectionIndex = selection.findIndex((date) =>
			DateUtils.isSameDay(date, day)
		);

		if (selectionIndex === -1) selection.push(day);
		else selection.splice(selectionIndex, 1);

		if (selection.length > 0) setSelectionEmptyError(false);

		setSelectedDays(selection);
	};

	const showSuccessDialog = (pollId: string) => {
		const url = `${window.location.origin}/${pollId}`;

		SwalWReact.fire({
			icon: 'success',
			title: 'Deine Umfrage wurde erstellt!',
			html: (
				<div className={styles.dialogText}>
					Du kannst Deine Umfrage mit diesem Link teilen (zum Kopieren klicken):
					<CopyableComponent text={url}>
						<p className={styles.pollLink}>{url}</p>
					</CopyableComponent>
					<SubmitButton
						submitHandler={() => {
							history.push(`/${pollId}`);
							Swal.clickConfirm();
						}}
					/>
				</div>
			),
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			width: '80%',
		});
	};

	const postPoll = async () => {
		const dateSelections = selectedDays.map((date) => ({
			date: date,
			state: 1,
		}));

		if (!authorName || authorName.trim() === '') {
			setNameEmptyError(true);
			return;
		}

		setNameEmptyError(false);

		if (!pollTitle || pollTitle.trim() === '') {
			setTitleEmptyError(true);
			return;
		}

		setTitleEmptyError(false);

		if (dateSelections.length === 0) {
			setSelectionEmptyError(true);
			return;
		}

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

		const response = await fetch('api/polls', requestOptions);
		const data = await response.json();

		const pollId = data.id;
		showSuccessDialog(pollId);
	};

	return (
		<div className="main">
			<div>
				<h1 className="title">Umfrage erstellen</h1>

				<div className={styles.formFields}>
					<label>Dein Name:</label>
					<input
						type="text"
						placeholder="Max Mustermann"
						onChange={(e) => setAuthorName(e.target.value)}
						className={nameEmptyError ? 'error' : ''}
					/>
					<label>Titel der Umfrage:</label>
					<input
						type="text"
						placeholder="Star Wars Marathon"
						onChange={(e) => setPollTitle(e.target.value)}
						className={titleEmptyError ? 'error' : ''}
					/>
				</div>
			</div>

			<div className={styles.chooseDays}>
				<h3 className="subtitle" id={styles.chooseDaysTitle}>
					Tage auswählen:
				</h3>
				<h3
					className={`subtitle ${selectionEmptyError ? styles.error : ''}`}
					id={styles.chosenDaysCounter}
				>
					{selectedDays.length} Tage ausgewählt
				</h3>
				<DayPicker
					localeUtils={MomentLocaleUtils}
					locale="de"
					selectedDays={selectedDays}
					onDayClick={onDaySelect}
					className={styles.DayPicker}
					modifiers={{ all: (day) => true }}
					modifiersStyles={{ all: { minWidth: '40px', height: '40px' } }}
				/>
				<SubmitButton
					submitHandler={() => postPoll()}
					id={styles.submitButton}
				/>
			</div>
		</div>
	);
};
