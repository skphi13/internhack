const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const proxyquire = require('proxyquire');

describe('Development Babel Transpiling', () => {
    let devBabel;
    let babelRegisterStub;

    beforeEach(() => {
        babelRegisterStub = sinon.stub();

        devBabel = proxyquire('../devBabel', {
            '@babel/register': babelRegisterStub
        });
    });

    it('should invoke @babel/register when DEV_TOOLS is true', (done) => {
        process.env.DEV_TOOLS = true;
        const server = {};
        const options = {};
        const next = () => {
            expect(babelRegisterStub.callCount).to.equal(1);
            done();
        };

        return devBabel.register(server, options, next);
    });

    it('should not invoke @babel/register when DEV_TOOLS is false', (done) => {
        process.env.DEV_TOOLS = false;
        const server = {};
        const options = {};
        const next = () => {
            expect(babelRegisterStub.callCount).to.equal(0);
            delete process.env.DEV_TOOLS;
            done();
        };

        return devBabel.register(server, options, next);
    });
});