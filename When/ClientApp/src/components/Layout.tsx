import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout = (props: { children: React.ReactNode }) => {
	return (
		<div>
			<NavMenu />
			<Container>
				{props.children}
				<footer>
					© 2020-2021 Patryk Pekala
					<br />
					<a href="https://github.com/paccos/when">View Code on GitHub</a>
				</footer>
			</Container>
		</div>
	);
};
