import React from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import check from '../images/Checkmark.png';
import edit from '../images/Edit.png';
import cross from '../images/Cross.png';

import SubmitButton from './SubmitButton';
import { NameCircle } from './DateGrid';

const SwalWReact = withReactContent(Swal);

export const ParticipantList = (props) => {
	const participants = props.participants;

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

		props.handleEditAction('');
		props.refresh();
	};

	const handleDeleteAction = async (id) => {
		const result = await SwalWReact.fire({
			icon: 'warning',
			title: `Löschen bestätigen`,
			html: (
				<div>
					<p>Bist Du sicher, dass Du Deinen Eintrag löschen möchtest?</p>
					<div className="submitAndAbort">
						<SubmitButton
							img={check}
							alt="Confirm Delete"
							color="red"
							submitHandler={() => {
								Swal.clickConfirm();
							}}
						/>
						<SubmitButton
							img={cross}
							alt="Cancel"
							submitHandler={() => Swal.clickCancel()}
						/>
					</div>
				</div>
			),
			showConfirmButton: false,
		});

		if (result.isConfirmed) {
			deleteUserSelection(id);
		}
	};

	return (
		<div className="participants">
			{participants.map((participant, index) => (
				<React.Fragment key={index}>
					{participant.id === props.idToEdit ? (
						<SubmitButton
							img={cross}
							alt="Delete"
							color="red"
							id="deleteCircle"
							submitHandler={() => handleDeleteAction(participant.id)}
						/>
					) : (
						<button
							className="editCircle"
							onClick={() => props.handleEditAction(participant.id)}
						>
							<img src={edit} alt="Edit Button" />
						</button>
					)}
					<NameCircle name={participant.name} stacked={false} />
					<div className="participantName">{participant.name}</div>
				</React.Fragment>
			))}
		</div>
	);
};
