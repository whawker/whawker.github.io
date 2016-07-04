import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from '../router/Router';

const AppContainer = ({ store }) => (
    <Provider store={store}>
        <Router store={store} />
    </Provider>
);

AppContainer.propTypes = {
    store: PropTypes.object.isRequired
};

export default AppContainer;