import React, { useState } from 'react';
import './DateView.css';
import checkmark from '../images/Checkmark.png';
import cross from '../images/Cross.png';

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

export const NameCircle = (props) => {
	const initials = props.name
		.split(' ')
		.map((n) => n[0])
		.join('');

	const maybe = props.maybe;
	const stacked = props.stacked;
	const classes = `nameCircle ${maybe ? 'maybe' : ''} ${
		stacked ? 'stackedCircle' : ''
	}`;

	return <div className={classes}>{initials}</div>;
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

const toggleButtonStates = {
	yes: 1,
	maybe: 2,
	no: 0,
};

export const ToggleButton = (props) => {
	const buttonState = props.buttonState;
	const className = `toggleButton ${Object.keys(ToggleButton.buttonStates).find(
		(key) => ToggleButton.buttonStates[key] === buttonState
	)}`;

	return (
		<button
			className={className}
			onClick={() => {
				if (buttonState === ToggleButton.buttonStates.yes)
					props.handleButtonChange(ToggleButton.buttonStates.maybe);
				else if (buttonState === ToggleButton.buttonStates.maybe)
					props.handleButtonChange(ToggleButton.buttonStates.no);
				else if (buttonState === ToggleButton.buttonStates.no)
					props.handleButtonChange(ToggleButton.buttonStates.yes);
			}}
		>
			<img
				src={buttonState === ToggleButton.buttonStates.no ? cross : checkmark}
			/>
		</button>
	);
};

ToggleButton.buttonStates = toggleButtonStates;

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
						props.userSelections.find((selection) => selection.date === e.date)
							.state
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
