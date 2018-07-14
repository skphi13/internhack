import {createStore as reduxCreateStore, applyMiddleware, compose} from 'redux';
import Reducers from './reducers/all';
import {middlewareAdapter} from '@homeaway/redux-middleware-adapter';
import registerAllMiddleware from './middleware/all';

/**
 * Initialize the redux store.
 *   - connects middleware and reducers
 *   - configures the chrome extension for redux
 */

/* istanbul ignore next */
function createStore(initialState = {}) {
    // Each middleware function is registered with the middlewareAdapter and
    // is assigned an action to respond to. See './middleware/all'
    registerAllMiddleware();

    let composeEnhancers = compose;

    // Setup redux devtools chrome extension, if available and correct env
    if (typeof window !== 'undefined' && initialState.system.environment === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const createStoreWithMiddleware = composeEnhancers(
        applyMiddleware(middlewareAdapter)
    )(reduxCreateStore);

    const store = createStoreWithMiddleware(Reducers, initialState);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducers/all', () => {
            store.replaceReducer(Reducers);
        });
    }
    return store;
}

export {createStore};