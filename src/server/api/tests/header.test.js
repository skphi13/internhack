const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const proxyquire = require('proxyquire');

describe('server/api/header.js', () => {
    let httpClientInstanceGet;
    let header;
    let request;

    beforeEach(() => {
        httpClientInstanceGet = sinon.stub();

        header = proxyquire('../header', {
            '@homeaway/http-client': function HttpClientMock() {
                return {
                    get: httpClientInstanceGet
                };
            }
        });

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

    it('should read response', () => {
        const response = {
            payload: {
                'one': 1
            }
        };

        httpClientInstanceGet.returns(Promise.resolve(response));

        return header.read(request)
            .then((result) => {
                expect(httpClientInstanceGet.callCount).to.equal(1);
                expect(result).to.deep.equal(response.payload);
            });
    });

    it('should throw an error if call fails', () => {
        httpClientInstanceGet.returns(Promise.reject({message: 'error!!!'}));

        return header.read(request)
            .catch((err) => {
                expect(err.message).to.match(/error!!!/);
            });
    });
});