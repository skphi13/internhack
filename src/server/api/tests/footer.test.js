const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const proxyquire = require('proxyquire');

// TODO: Write a test that confirms caching integration configuration works properly.
describe('server/api/footer.js', () => {
    let httpClientInstanceGet;
    let footer;
    let request;
    let response;

    beforeEach(() => {
        httpClientInstanceGet = sinon.stub();
        proxyquire.noCallThru();
        footer = proxyquire('../footer', {
            '@homeaway/http-client': function HttpClientMock() {
                return {
                    get: httpClientInstanceGet
                };
            }
        });

        response = {
            payload: {
                'one': 1
            }
        };

        request = {
            log() {},
            plugins: {
                SiteResolution: {
                    site: {
                        name: 'homeaway_us',
                        locale: 'en_US_HA'
                    }
                }
            },
            server: {
                app: {
                    config: {
                        get: () => {
                            return {
                                headerFooterService: {
                                    timeout: 3000,
                                    connectionTimeout: 3000,
                                    baseUrl: 'url/'
                                }
                            };
                        }

                    }
                }
            }
        };
    });

    afterEach(() => {
        proxyquire.callThru();
    });

    it('should read response from service', (done) => {
        httpClientInstanceGet.returns(Promise.resolve(response));

        request.server.cache = (options) => {
            const cacheToken = {
                url: 'url/',
                id: 0
            };
            return {
                get: () => {
                    options.generateFunc(cacheToken, () => (done()));
                }
            };
        };

        footer.read(request)
            .then((result) => {
                expect(httpClientInstanceGet.callCount).to.equal(1);
                expect(result).to.deep.equal(response.payload);
            });
    });

    it('should throw an error if call fails', (done) => {
        httpClientInstanceGet.returns(Promise.reject({message: 'error!!!'}));

        request.server.cache = (options) => {
            const cacheToken = {
                url: 'url/',
                id: 0
            };
            return {
                get: () => {
                    options.generateFunc(cacheToken, () => (done()));
                }
            };
        };

        footer.read(request)
            .catch((err) => {
                expect(err.message).to.match(/error!!!/);
            });
    });

    it('reject if cache throws an error', () => {
        request.server.cache = () => {
            return {
                get: (token, cb) => {
                    cb('error!!!');
                }
            };
        };

        return footer.read(request)
            .catch((err) => {
                expect(err).to.match(/error!!!/);
            });
    });

    it('should return the response if cache read succeeds', () => {
        request.server.cache = () => {
            return {
                get: (token, cb) => {
                    cb(null, response);
                }
            };
        };

        return footer.read(request)
            .then((result) => {
                expect(result.payload).to.deep.equal(response.payload);
            });
    });
});