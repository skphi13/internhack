import actions from '../actions/actions';
import request from 'superagent';

// responds to POST_NAME action
function postName(store, action) {
    /**
     * An example POST. The important thing here is the inclusion of the CSRF
     * token, or crumb. We are using the hapi library 'crumb' on the server to
     * enable this workflow. The POST will fail if the crumb is not included.
     *
     * Ideally, you'd create a generic api utility module that wraps superagent
     * and adds the crumb to all POSTs.
     */

    // Make api call and then dispatch once response comes back
    request.post('/temp/api/name')
        .send({
            name: action.payload.name,
            crumb: window.ha.crumb // Important to send CSRF token with request
        })
        .end((error, response) => {
            if (error) {
                store.dispatch(actions.postNameError());
            } else {
                store.dispatch(actions.postNameSuccess(response));
            }
        });
}

export default postName;
