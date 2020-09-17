import React from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import { Home } from './components/Home';
import { NewPoll } from './components/NewPoll';
import { Poll } from './components/Poll';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/new" component={NewPoll} />
				<Route path="/:pollId" component={Poll} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
