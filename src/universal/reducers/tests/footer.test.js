import {expect} from 'chai';
import actions from '../../actions/actions';
import footerReducer from '../footer';

describe('universal/reducers/footer.js', () => {
    it('FETCH_PAGE1_DATA_SUCCESS updates the state with data', () => {
        const data = {foo: 'bar'};
        const action = {
            type: actions.FETCH_PAGE1_DATA_SUCCESS,
            payload: {response: {footer: data}}
        };

        const newState = footerReducer({}, action);

        expect(newState).to.deep.equal(data);
    });
});
