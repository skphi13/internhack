import sinon from 'sinon';
import proxyquire from 'proxyquire';

describe('universal/middleware/postName.js', () => {
    before(() => {
        proxyquire.noCallThru();
        global.window = {ha: {crumb: '12345678'}};
    });

    after(() => {
        proxyquire.callThru();
        delete global.window;
    });

    it('dispatches a success action when POST succeeds', () => {
        const postNameSuccess = sinon.stub();
        const postName = proxyquire('../postName.js', {
            'superagent': {
                post: () => ({
                    send: () => ({
                        end: (cb) => cb()
                    })
                })
            },
            '../actions/actions': {
                postNameSuccess
            }
        }).default;
        const store = {
            dispatch: () => {},
            getState: () => ({system: {crumb: '12334'}})
        };
        const action = {payload: 'Nancy'};

        postName(store, action);
        sinon.assert.called(postNameSuccess);
    });

    it('dispatches an error action when the POST fails', () => {
        const postNameError = sinon.stub();
        const postName = proxyquire('../postName.js', {
            'superagent': {
                post: () => ({
                    send: () => ({
                        end: (cb) => cb('ERROR!!!')
                    })
                })
            },
            '../actions/actions': {
                postNameError
            }
        }).default;
        const store = {
            dispatch: () => {},
            getState: () => ({system: {crumb: '12334'}})
        };
        const action = {payload: 'Nancy'};

        postName(store, action);
        sinon.assert.called(postNameError);
    });
});