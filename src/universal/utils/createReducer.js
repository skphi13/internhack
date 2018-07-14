
/**
 * Simple utility to clean up reducer files.
**/
const createReducer = (handlers = {}, initialState = {}) => {
    return (state = initialState, action) => {
        if (typeof handlers[action.type] === 'function') {
            return handlers[action.type](state, action);
        }

        return state;
    };
};

export default createReducer;
