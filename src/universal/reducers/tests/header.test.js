import {expect} from 'chai';
import actions from '../../actions/actions';
import headerReducer from '../header';

describe('universal/reducers/header.js', () => {
    it('FETCH_PAGE1_DATA_SUCCESS updates the state with data', () => {
        const data = {foo: 'bar'};
        const action = {
            type: actions.FETCH_PAGE1_DATA_SUCCESS,
            payload: {response: {header: data}}
        };

        const newState = headerReducer({}, action);

        expect(newState).to.deep.equal(data);
    });
});
