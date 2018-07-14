const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('server/routes/application.js', () => {
    let request;
    let stubbedDependencies;
    const dispatchStub = sinon.stub();

    before(() => {
        request = {
            path: '',
            url: {},
            plugins: {
                SiteResolution: {
                    site: {
                        name: 'homeaway_us',
                        locale: 'en_US_HA',
                        brandId: '121'
                    }
                }
            },
            headers: {
                'user-agent': 'chrome'
            },
            server: {
                app: {
                    config: {get: () => 'temp'},
                    metrics: {
                        histogram: () => ({update: () => {}})
                    }
                }
            },
            log: () => {}
        };

        stubbedDependencies = {
            '../api': {
                read: () => ({then: (cb) => cb()})
            },
            'react-dom/server': {
                renderToString: () => '<div>Yeah!</div>',
                RouterContext: () => {}
            },
            'react-redux': {
                Provider: () => {}
            },
            '../../universal/store': {
                createStore: (data) => ({
                    getState: () => data,
                    dispatch: dispatchStub
                })
            },
            '../utils/analyticsDataLayer': () => {},
            '../utils/siteNameToBaselineBrand': () => 'gt',
            'serialize-javascript': (input) => input
        };

        proxyquire.noCallThru();
    });

    after(() => {
        proxyquire.callThru();
    });

    // -- Tests -----------------------------------------

    it('requesting a valid page should reply with a view', (done) => {
        const reply = () => {};
        reply.redirect = () => {};

        request.path = '';

        reply.view = (templateName) => {
            expect(templateName).to.equal('index.hbs');
            done();
        };

        const applicationRouteHandler = proxyquire('../application', stubbedDependencies);

        applicationRouteHandler(request, reply);
    });

    it('Exceptions are handled correctly for dev mode', (done) => {
        const ERROR_MESSAGE = 'crazy error';
        const ERROR = {
            message: ERROR_MESSAGE,
            stack: ''
        };
        const reply = (renderedTemplate) => {
            return {
                code: (code) => {
                    expect(code).to.equal(500);
                    expect(request.log.called).to.equal(true);
                    expect(renderedTemplate.indexOf(ERROR_MESSAGE) >= 0).to.equal(true);
                    done();
                }
            };
        };
        reply.redirect = () => {};
        request.path = '';
        request.log = sinon.spy();

        const applicationRouteHandler = proxyquire('../application', {
            ...stubbedDependencies,
            '../api': {
                read: () => ({
                    then: () => new Promise(() => {
                        throw ERROR;
                    })
                })
            },
            '@homeaway/environment-resolver': {
                getName: () => 'development'
            }
        });

        applicationRouteHandler(request, reply);
    });

    it('Exceptions are handled correctly for production mode', (done) => {
        const ERROR_MESSAGE = 'crazy error';
        const ERROR = {
            message: ERROR_MESSAGE,
            stack: ''
        };
        const reply = (renderedTemplate) => {
            return {
                code: (code) => {
                    expect(code).to.equal(500);
                    expect(request.log.called).to.equal(true);
                    expect(renderedTemplate.indexOf(ERROR_MESSAGE) >= 0).to.equal(false);
                    done();
                }
            };
        };
        reply.redirect = () => {};
        request.path = '';
        request.log = sinon.spy();

        const applicationRouteHandler = proxyquire('../application', {
            ...stubbedDependencies,
            '../api': {
                read: () => ({
                    then: () => new Promise(() => {
                        throw ERROR;
                    })
                })
            },
            '@homeaway/environment-resolver': {
                getName: () => 'production'
            }
        });

        applicationRouteHandler(request, reply);
    });
});
