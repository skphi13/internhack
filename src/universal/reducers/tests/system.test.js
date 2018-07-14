import {expect} from 'chai';
import actions from '../../actions/actions';
import systemReducer from '../system';

describe('universal/reducers/translations.js', () => {
    it('FETCH_PAGE1_DATA_SUCCESS updates the state with data', () => {
        const data = {foo: 'bar'};
        const action = {
            type: actions.FETCH_PAGE1_DATA_SUCCESS,
            payload: {response: {system: data}}
        };

        const newState = systemReducer({}, action);

        expect(newState).to.deep.equal(data);
    });
});
