import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import AppContainer from './containers/AppContainer';
import { configureStore } from './redux/configureStore';

const store = configureStore(hashHistory, window.__initialState__);

let render = () => {
    let app = document.getElementById('app');
    if (app !== null) {
        ReactDOM.render(
            <AppContainer store={store}/>,
            document.getElementById('app')
        );
    }
};

render();
