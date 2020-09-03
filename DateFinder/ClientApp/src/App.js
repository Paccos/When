import React, { Component } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import DateGrid from './components/DateGrid';

export default class App extends Component {
	static displayName = App.name;

	render() {
		const dummy = [
			{
				date: '2020-08-20',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-22',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
			{
				date: '2020-08-23',
				entries: [
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: false },
					{ name: 'Max Mustermann', maybe: true },
				],
			},
		];

		return (
			<Layout>
				<DateGrid entries={dummy} />
			</Layout>
		);
	}
}
