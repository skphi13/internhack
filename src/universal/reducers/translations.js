import createReducer from '../utils/createReducer';
import actions from '../actions/actions';

const initialState = {};

const actionHandlers = {
    [actions.FETCH_PAGE1_DATA_SUCCESS](state, {payload}) {
        return {
            ...state,
            ...payload.response.translations
        };
    }
};

export default createReducer(actionHandlers, initialState);
