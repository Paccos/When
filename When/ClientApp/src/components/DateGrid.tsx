import React from 'react';

import { NameCircle } from './NameCircle';
import { ToggleButton } from './ToggleButton';

import styles from './DateGrid.module.css';
import { SelectionState } from '../types/PollTypes';

const DateView = (props: { date: Date }) => {
	const date = props.date;

	const monthStr = date.toLocaleString(undefined, { month: 'short' });
	const dateStr = date.toLocaleString(undefined, { day: 'numeric' });
	const weekdayStr = date.toLocaleString(undefined, { weekday: 'short' });

	return (
		<div className={styles.date}>
			<div className={styles.month}>{monthStr.toUpperCase()}</div>
			<div className={styles.day}>{dateStr}</div>
			<div className={styles.weekday}>{weekdayStr}</div>
		</div>
	);
};

const NamesBar = (props: {
	namesAndStates: { name: string; maybe: boolean }[];
}) => {
	const namesAndStates = props.namesAndStates;

	return (
		<div className={styles.namesBar}>
			{namesAndStates.map((n, index) => (
				<NameCircle stacked={true} key={index} name={n.name} maybe={n.maybe} />
			))}
		</div>
	);
};

const YesMaybeCounter = (props: { yes: number; maybe: number }) => {
	const yes = props.yes;
	const maybe = props.maybe;

	return (
		<div className={styles.ymCounter}>
			<p className={styles.yesCount}>{yes}</p>
			<p className={styles.maybeCount}>({maybe})</p>
		</div>
	);
};

const DateColumn = (props: {
	date: Date;
	namesAndStates: { name: string; maybe: boolean }[];
	buttonState: SelectionState;
	handleButtonChange: (state: SelectionState) => void;
}) => {
	const date = props.date;
	const namesAndStates = props.namesAndStates;

	const yesCount = namesAndStates.filter((nAndS) => !nAndS.maybe).length;
	const maybeCount = namesAndStates.filter((nAndS) => nAndS.maybe).length;

	return (
		<div className={styles.dateColumn}>
			<NamesBar namesAndStates={namesAndStates} />
			<DateView date={date} />
			<YesMaybeCounter yes={yesCount} maybe={maybeCount} />
			<ToggleButton
				buttonState={props.buttonState}
				handleButtonChange={(state) => {
					props.handleButtonChange(state);
				}}
			/>
		</div>
	);
};

export const DateGrid = (props: {
	entries: { date: Date; entries: { name: string; maybe: boolean }[] }[];
	userSelections: { date: Date; state: SelectionState }[];
	handleUserSelection: (date: Date, state: SelectionState) => void;
}) => {
	const entries = props.entries;

	return (
		<div className={styles.dateGrid}>
			{entries.map((e, index) => (
				<DateColumn
					date={e.date}
					namesAndStates={e.entries}
					key={index}
					buttonState={
						props.userSelections.find(
							(selection) => selection.date.getTime() === e.date.getTime()
						)?.state ?? SelectionState.No
					}
					handleButtonChange={(state) => {
						props.handleUserSelection(e.date, state);
					}}
				/>
			))}
		</div>
	);
};
