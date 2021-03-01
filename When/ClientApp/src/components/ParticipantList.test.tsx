import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ParticipantList } from './ParticipantList';

const dummyParticipants = [
	{ id: '42', name: 'Hans Maiser' },
	{ id: '4711', name: 'Bernd das Brot' },
	{ id: '1337', name: 'Rudolph the Reindeer' },
];

describe('<ParticipantList />', () => {
	it('Should show edit buttons by default', async () => {
		const onEditClick = jest.fn();
		const onDeleteClick = jest.fn();

		const partList = render(
			<ParticipantList
				participants={dummyParticipants}
				handleEditAction={onEditClick}
				deleteUserSelection={onDeleteClick}
				idToEdit=""
				authorId="42"
			/>
		);

		const elems = partList.getAllByAltText('Edit Button');

		expect(elems.length).toBe(3);
	});

	it('Should set the id to edit on the clicked participant', async () => {
		const onEditClick = jest.fn();
		const onDeleteClick = jest.fn();

		const partList = render(
			<ParticipantList
				participants={dummyParticipants}
				handleEditAction={onEditClick}
				deleteUserSelection={onDeleteClick}
				idToEdit=""
				authorId="42"
			/>
		);

		const secondEditButton = partList.getAllByAltText('Edit Button')[1];
		secondEditButton.click();

		expect(onEditClick).toBeCalledWith('4711');
	});

	it('Should show the delete button at the participant to edit', async () => {
		const onEditClick = jest.fn();
		const onDeleteClick = jest.fn();

		const partList = render(
			<ParticipantList
				participants={dummyParticipants}
				handleEditAction={onEditClick}
				deleteUserSelection={onDeleteClick}
				idToEdit="4711"
				authorId="42"
			/>
		);

		const deleteButtons = partList.getAllByAltText('Delete');

		expect(deleteButtons.length).toBe(1);

		const deleteButton = deleteButtons[0];
		const nameDiv = deleteButton.parentNode?.nextSibling?.nextSibling;

		expect(nameDiv?.textContent).toBe('Bernd das Brot');
	});
});
