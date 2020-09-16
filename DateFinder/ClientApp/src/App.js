import React from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import { Home } from './components/Home';
import { Poll } from './components/Poll';
import { BrowserRouter, Route } from 'react-router-dom';

const App = (props) => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route path="/:pollId" component={Poll} />
		</BrowserRouter>
	);
};

export default App;
