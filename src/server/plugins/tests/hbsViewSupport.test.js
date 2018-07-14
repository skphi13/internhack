const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('server/plugins/hbsViewSupport.js', () => {
    it('should invoke without error', (done) => {
        proxyquire.noCallThru();

        const routesStub = sinon.stub();
        const hbsViewSupport = proxyquire('../hbsViewSupport', {
            '../routes': routesStub
        });

        const server = {
            app: {
                config: {get: () => 'foo'}
            },
            register(dep, callback) {
                callback();
            },
            views() {},
            route() {}
        };
        const options = {};
        const next = () => {
            sinon.assert.called(routesStub);
            proxyquire.callThru();
            done();
        };

        return hbsViewSupport.register(server, options, next);
    });
});