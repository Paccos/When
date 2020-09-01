import React, { Component } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import { DateColumn } from './components/DateView';

export default class App extends Component {
	static displayName = App.name;

	render() {
		const dummy = [
			{ name: 'Max Mustermann', maybe: false },
			{ name: 'Max Mustermann', maybe: false },
			{ name: 'Max Mustermann', maybe: false },
			{ name: 'Max Mustermann', maybe: true },
		];

		return (
			<Layout>
				<DateColumn date={new Date()} namesAndStates={dummy} />
			</Layout>
		);
	}
}
