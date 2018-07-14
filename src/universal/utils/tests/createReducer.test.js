import createReducer from '../createReducer';
import {expect} from 'chai';
import sinon from 'sinon';

describe('/universal/utils/createReducer.js', () => {
    it('creates a reducer function', () => {
        const reducerFunc = createReducer({});
        expect(typeof reducerFunc === 'function');
    });

    it('reducer function, when called with a matching action, calls the resulting function', () => {
        const action = {type: 'doIt'};
        const stub = sinon.stub();
        const handlers = {[action.type]: stub};
        const reducerFunc = createReducer(handlers, {});

        reducerFunc({}, action);
        sinon.assert.calledWith(stub, {}, action);
    });

    it('reducer function, passes state through when no match', () => {
        const action = {type: 'doIt'};
        const stub = sinon.stub();
        const handlers = {[action.type]: stub};
        const reducerFunc = createReducer(handlers, {});
        const anotherAction = {type: 'doSomethingElse'};
        const state = {foo: 'bar'};

        const result = reducerFunc(state, anotherAction);

        sinon.assert.notCalled(stub);
        expect(result).to.deep.equal(state);
    });
});