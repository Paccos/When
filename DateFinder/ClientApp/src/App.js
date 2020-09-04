import React, { Component, useState } from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import DateGrid from './components/DateGrid';

export default class App extends Component {
	static displayName = App.name;

	constructor(props) {
		super(props);

		this.state = {
			username: '',
		};
	}

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
				<div className="titleHeading">
					<h1 className="title">DnD</h1>
					<h3 className="subtitle">Umfrage von Pac</h3>
					<input
						type="text"
						placeholder="Dein Name"
						onChange={(e) => this.setState({ username: e.target.value })}
					></input>
				</div>
				<DateGrid entries={dummy} />
			</Layout>
		);
	}
}
