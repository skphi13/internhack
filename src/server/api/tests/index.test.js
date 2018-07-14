const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const proxyquire = require('proxyquire');

const header = require('../header');
const footer = require('../footer');
const translations = require('../translations');

describe('server/api/index.js', () => {
    let readHeaderReadStub;
    let readFooterReadStub;
    let readTranslationsStub;
    let pageApi;

    beforeEach(() => {
        readHeaderReadStub = sinon.stub(header, 'read');
        readFooterReadStub = sinon.stub(footer, 'read');
        readTranslationsStub = sinon.stub(translations, 'read');

        pageApi = proxyquire('../index', {
            './header': {
                read: readHeaderReadStub
            },
            './footer': {
                read: readFooterReadStub
            },
            './translations': {
                read: readTranslationsStub
            },
            './mutatePageData': {
                mutate(results) {
                    return Promise.resolve(results);
                }
            }
        });
    });

    afterEach(() => {
        readHeaderReadStub.reset();
        readFooterReadStub.reset();
        readTranslationsStub.reset();
    });

    after(() => {
        readHeaderReadStub.restore();
        readFooterReadStub.restore();
        readTranslationsStub.restore();
    });

    it('should orchestrate multiple JSON APIs', () => {
        const request = {
            log() {},
            plugins: {
                SiteResolution: {
                    site: {
                        name: 'homeaway_us',
                        locale: 'en_US_HA'
                    }
                }
            },
            headers: {
                'user-agent': 'mocha'
            }
        };

        readHeaderReadStub.returns(Promise.resolve({
            'one': 1
        }));
        readFooterReadStub.returns(Promise.resolve({
            'two': 2
        }));
        readTranslationsStub.returns(Promise.resolve({
            'three': 3
        }));

        return pageApi.read(request)
            .then((result) => {
                expect(readHeaderReadStub.callCount).to.equal(1);
                expect(readFooterReadStub.callCount).to.equal(1);
                expect(readTranslationsStub.callCount).to.equal(1);
                expect(result).to.deep.equal({
                    'one': 1,
                    'two': 2,
                    'three': 3
                });
            });
    });
});