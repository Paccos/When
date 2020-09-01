import React from 'react';
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

const NameCircle = (props) => {
	const initials = props.name
		.split(' ')
		.map((n) => n[0])
		.join('');

	const maybe = props.maybe;
	const classes = 'nameCircle ' + (maybe ? 'maybe' : '');

	return <div className={classes}>{initials}</div>;
};

const NamesBar = (props) => {
	const namesAndStates = props.namesAndStates;

	return (
		<div className="namesBar">
			{namesAndStates.map((n, index) => (
				<NameCircle key={index} name={n.name} maybe={n.maybe} />
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

export const DateColumn = (props) => {
	const date = props.date;
	const namesAndStates = props.namesAndStates;

	const yesCount = namesAndStates.filter((nAndS) => !nAndS.maybe).length;
	const maybeCount = namesAndStates.filter((nAndS) => nAndS.maybe).length;

	return (
		<div className="dateColumn">
			<NamesBar namesAndStates={namesAndStates} />
			<DateView date={date} />
			<YesMaybeCounter yes={yesCount} maybe={maybeCount} />
		</div>
	);
};
