import React from 'react';

import { NameCircle } from './NameCircle';
import { ToggleButton } from './ToggleButton';

import './DateView.css';

const DateView = (props) => {
	const date = new Date(props.date);

	const monthStr = date.toLocaleString(undefined, { month: 'short' });
	const dateStr = date.toLocaleString(undefined, { day: 'numeric' });
	const weekdayStr = date.toLocaleString(undefined, { weekday: 'short' });

	return (
		<div className="date">
			<div className="month">{monthStr.toUpperCase()}</div>
			<div className="day">{dateStr}</div>
			<div className="weekday">{weekdayStr}</div>
		</div>
	);
};

const NamesBar = (props) => {
	const namesAndStates = props.namesAndStates;

	return (
		<div className="namesBar">
			{namesAndStates.map((n, index) => (
				<NameCircle stacked={true} key={index} name={n.name} maybe={n.maybe} />
			))}
		</div>
	);
};

const YesMaybeCounter = (props) => {
	const yes = props.yes;
	const maybe = props.maybe;

	return (
		<div className="ymCounter">
			<p className="yesCount">{yes}</p>
			<p className="maybeCount">({maybe})</p>
		</div>
	);
};

const DateColumn = (props) => {
	const date = props.date;
	const namesAndStates = props.namesAndStates;

	const yesCount = namesAndStates.filter((nAndS) => !nAndS.maybe).length;
	const maybeCount = namesAndStates.filter((nAndS) => nAndS.maybe).length;

	return (
		<div className="dateColumn">
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

const DateGrid = (props) => {
	const entries = props.entries;

	return (
		<div className="dateGrid">
			{entries.map((e, index) => (
				<DateColumn
					date={e.date}
					namesAndStates={e.entries}
					key={index}
					buttonState={
						props.userSelections.find(
							(selection) => selection.date.getTime() === e.date.getTime()
						).state
					}
					handleButtonChange={(state) => {
						props.handleUserSelection(e.date, state);
					}}
				/>
			))}
		</div>
	);
};

export default DateGrid;
