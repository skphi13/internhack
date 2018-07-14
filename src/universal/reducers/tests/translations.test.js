import {expect} from 'chai';
import actions from '../../actions/actions';
import translationsReducer from '../translations';

describe('universal/reducers/system.js', () => {
    it('FETCH_PAGE1_DATA_SUCCESS updates the state with data', () => {
        const data = {foo: 'bar'};
        const action = {
            type: actions.FETCH_PAGE1_DATA_SUCCESS,
            payload: {response: {translations: data}}
        };

        const newState = translationsReducer({}, action);

        expect(newState).to.deep.equal(data);
    });
});
