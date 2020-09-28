import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
	static displayName = Layout.name;

	render() {
		return (
			<div>
				<NavMenu />
				<Container>
					{this.props.children}
					<footer>
						© 2020 Patryk Pekala
						<br />
						<a href="youtube.com">View Code on GitHub</a>
					</footer>
				</Container>
			</div>
		);
	}
}
