import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './NameCircle.module.css';

export const NameCircle = (props: {
	name: string;
	maybe?: boolean;
	stacked?: boolean;
}) => {
	const initials = props.name
		.split(' ')
		.map((n) => n[0])
		.join('');

	const maybe = props.maybe;
	const stacked = props.stacked;
	const classes = `${styles.nameCircle} ${maybe ? styles.maybe : ''} ${
		stacked ? styles.stackedCircle : ''
	}`;

	return (
		<div className={classes} data-tip={stacked ? props.name : ''}>
			{initials}
			{stacked && <ReactTooltip place="top" type="dark" effect="solid" />}
		</div>
	);
};
