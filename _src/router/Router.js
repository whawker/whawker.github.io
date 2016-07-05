import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import DefaultLayout from '../layouts/Default';
import { HomePage, PostPage } from '../components';

const AppRouter = ({ store }) => {
    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(hashHistory, store);

    return (
        <Router history={history}>
            <Route path="/" component={DefaultLayout}>
				<IndexRoute component={HomePage} />
                <Route path="post/:year/:month/:day/:slug" component={PostPage} />
			</Route>
        </Router>
    );
};

AppRouter.propTypes = {
    store: PropTypes.object.isRequired
};

export default AppRouter;
