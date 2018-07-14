import {combineReducers} from 'redux';
import system from './system';
import translations from './translations';
import header from './header';
import footer from './footer';

/**
 * Connect reducers to the redux store.
 */

/* istanbul ignore next */
const reducers = combineReducers({
    system,
    translations,
    header,
    footer
});

export default reducers;
