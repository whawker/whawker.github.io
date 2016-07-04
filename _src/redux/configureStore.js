import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export function configureStore (history, initialState) {
    let devTools = [];
    if (typeof window !== 'undefined' && window.devToolsExtension) {
        devTools.push(window.devToolsExtension());
    }

    const store = createStore(
        combineReducers({
            ...reducers,
            routing: routerReducer // Add the react-router-redux reducer so Redux knows about application routing
        }),
        initialState,
        compose(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            ),
            ...devTools
        )
    );

    return store;
}