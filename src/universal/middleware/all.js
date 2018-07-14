import actions from '../actions/actions';
import {registerMiddleware} from '@homeaway/redux-middleware-adapter';
import {triggerEdapPageView, triggerEdapEvent} from './edap';
import postName from './postName';

/**
 * The middleware directory holds functions that are meant to be called
 * when certain redux actions are dispatched. This is a pattern for consolidating
 * business logic and simplifying side effects handling, such as async api calls.
 *
 * It is a simpler alternative to redux-sagas, but accomplishes the same thing.
 * This is a cleaner pattern than redux-thunk or redux-promises.
 *
 * There is one true redux middleware, called the middlewareAdapter that allows us to
 * register middleware functions that hold our business logic. Each function is paired with
 * one action. When that action is dispatched, the function is called. The registrations
 * below are pairing up action-to-function.
 *
 * The functions, themselves, are passed the store and the action. They can dispatch
 * additional actions, as needed.
 *
 * Example:
 *  function doFetchData(store, action) {
 *      request('/api/getData').then((resp) => {
 *          store.dispatch(fetchSuccess(resp));
 *      });
 *  }
 *
 * registerMiddleware(FETCH_DATA, doFetchData);
 *
 * Once the above is setup, a component could dispatch the FETCH_DATA action creator,
 * our doFetchData function would therefore be called and when it succeeded in fetching
 * the data, dispatches the fetchSuccess action creator with the payload, presumably to
 * populate a reducer. More details here:
 * https://github.homeawaycorp.com/Catalyst/node-redux-middleware-adapter
 */

/* istanbul ignore next */
function registerAllMiddleware() {
    // List out all middleware functions and the action that they respond to
    registerMiddleware(actions.TRIGGER_EDAP_PAGEVIEW, triggerEdapPageView);
    registerMiddleware(actions.TRIGGER_EDAP_EVENT, triggerEdapEvent);
    registerMiddleware(actions.POST_NAME, postName);
}

export default registerAllMiddleware;
