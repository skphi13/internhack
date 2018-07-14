/* istanbul ignore next */
const ACTIONS = {
    FETCH_PAGE1_DATA_SUCCESS: 'FETCH_PAGE1_DATA_SUCCESS',
    FETCH_PAGE1_DATA_ERROR: 'FETCH_PAGE1_DATA_ERROR',

    TRIGGER_EDAP_PAGEVIEW: 'TRIGGER_EDAP_PAGEVIEW',
    TRIGGER_EDAP_EVENT: 'TRIGGER_EDAP_EVENT',

    POST_NAME: 'POST_NAME',
    POST_NAME_SUCCESS: 'POST_NAME_SUCCESS',
    POST_NAME_ERROR: 'POST_NAME_ERROR'
};

/* istanbul ignore next */
const ACTION_CREATORS = {
    fetchPage1DataSuccess(response) {
        return {
            type: ACTIONS.FETCH_PAGE1_DATA_SUCCESS,
            payload: {
                response
            }
        };
    },

    fetchPage1DataError(response) {
        return {
            type: ACTIONS.FETCH_PAGE1_DATA_ERROR,
            payload: {
                response
            }
        };
    },

    triggerEdapPageView() {
        return {
            type: ACTIONS.TRIGGER_EDAP_PAGEVIEW
        };
    },

    triggerEdapEvent(eventName, eventData, options) {
        return {
            type: ACTIONS.TRIGGER_EDAP_EVENT,
            payload: {
                eventName,
                eventData,
                options
            }
        };
    },

    postName(name) {
        return {
            type: ACTIONS.POST_NAME,
            payload: {
                name
            }
        };
    },

    postNameSuccess(resp) {
        return {
            type: ACTIONS.POST_NAME_SUCCESS,
            payload: {
                resp
            }
        };
    },

    postNameError() {
        return {
            type: ACTIONS.POST_NAME_ERROR
        };
    }
};

export default {...ACTIONS, ...ACTION_CREATORS};
