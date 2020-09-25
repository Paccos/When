import React from 'react';
import styles from './ParticipantList.module.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import check from '../images/Checkmark.png';
import edit from '../images/Edit.png';
import cross from '../images/Cross.png';

import SubmitButton from './SubmitButton';
import { NameCircle } from './DateGrid';

const SwalWReact = withReactContent(Swal);

export const ParticipantList = (props: {
	participants: { id: string; name: string }[];
	deleteUserSelection: (id: string) => void;
	idToEdit: string;
	handleEditAction: (id: string) => void;
}) => {
	const participants = props.participants;

	const handleDeleteAction = async (id: string) => {
		const result = await SwalWReact.fire({
			icon: 'warning',
			title: `Löschen bestätigen`,
			html: (
				<div>
					<p>Bist Du sicher, dass Du Deinen Eintrag löschen möchtest?</p>
					<div className={styles.submitAndAbort}>
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
			props.deleteUserSelection(id);
		}
	};

	return (
		<div className={styles.participants}>
			{participants.map((participant, index) => (
				<React.Fragment key={index}>
					{participant.id === props.idToEdit ? (
						<SubmitButton
							img={cross}
							alt="Delete"
							color="red"
							id={styles.deleteCircle}
							submitHandler={() => handleDeleteAction(participant.id)}
						/>
					) : (
						<button
							className={styles.editCircle}
							onClick={() => props.handleEditAction(participant.id)}
						>
							<img src={edit} alt="Edit Button" />
						</button>
					)}
					<NameCircle name={participant.name} stacked={false} />
					<div className={styles.participantName}>{participant.name}</div>
				</React.Fragment>
			))}
		</div>
	);
};
