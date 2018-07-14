const sinon = require('sinon');
const proxyquire = require('proxyquire');


describe('server/plugins/ssrStylesSupport.js', () => {
    it('should define extentions for less and css', (done) => {
        proxyquire.noCallThru();

        const hookStub = sinon.stub();

        const ssrStylesSupport = proxyquire('../ssrStylesSupport', {
            'css-modules-require-hook': hookStub
        });

        const server = {};
        const options = {};
        const next = () => {
            sinon.assert.called(hookStub);
            done();
        };

        return ssrStylesSupport.register(server, options, next);
    });
});