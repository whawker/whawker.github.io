import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import AppContainer from './containers/AppContainer';
import { configureStore } from './redux/configureStore';

const store = configureStore(browserHistory, window.__initialState__);

let render = () => {
    ReactDOM.render(
        <AppContainer store={store} />,
        document.getElementById('app')
    );
};

render();
