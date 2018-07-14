import 'core-js/es6/promise'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import getCurrentScriptPath from '@homeaway/current-script-path';
import {createStore} from './store';
import Root from './Root';

/**
 * Main client-side entry point. This is not used during
 * server-side rendering, only after the javascript bundle
 * has been loaded into the browser.
 */

// Let webpack know where to load files from in production envs.
// This is primarily for code-splitting scenarios and for images.
if (!module.hot) {
    __webpack_public_path__ = getCurrentScriptPath(); // eslint-disable-line
}

// Initial state as set by the server-side render
const initialState = window.__INITIAL_STATE__;

const store = createStore(initialState);

ReactDOM.hydrate(<Root store={store}/>, document.getElementById('root'));