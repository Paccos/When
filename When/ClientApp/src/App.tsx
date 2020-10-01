import React from 'react';
import { Layout } from './components/Layout';

import './custom.css';
import { Home } from './pages/Home';
import { NewPoll } from './pages/NewPoll';
import { Poll } from './pages/Poll';
import { NotFound } from './pages/NotFound';
import { Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/new" component={NewPoll} />
				<Route exact path="/404" component={NotFound} />
				<Route path="/:pollId" component={Poll} />
			</Switch>
		</Layout>
	);
};

export default App;
