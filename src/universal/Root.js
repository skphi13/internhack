import React from 'react';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import Page1Container from './components/Page1Container/Page1Container';

/**
 * Basic provider wrapping. This has been externalized in order to
 * enable hot module replacement features.
 */

/* istanbul ignore next */
function Root({store}) {
    return (
        <Provider store={store}>
            <Page1Container/>
        </Provider>
    );
}

export default hot(module)(Root);