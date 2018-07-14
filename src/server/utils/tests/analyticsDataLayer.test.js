const expect = require('chai').expect;
const proxyquire = require('proxyquire');


describe('server/utils/analyticsDataLayer.js', () => {
    const site = {name: 'sitename'};
    const pagename = 'page1';

    it('returns an object with expected data', () => {
        const analyticsDataLayer = proxyquire('../analyticsDataLayer', {
            '@homeaway/environment-resolver': {
                getName: () => 'production'
            }
        });

        const result = JSON.parse(analyticsDataLayer({site, pagename}));

        expect(result.appversion).to.be.a('string');
        expect(result.monikerbrand).to.equal(site.name);
        expect(result.analyticsbrand).to.equal(site.name);
        expect(result.appenvironment).to.equal('production');
    });

    it('returns "dev" for development env', () => {
        const analyticsDataLayer = proxyquire('../analyticsDataLayer', {
            '@homeaway/environment-resolver': {
                getName: () => 'development'
            }
        });

        const result = JSON.parse(analyticsDataLayer({site, pagename}));
        expect(result.appenvironment).to.equal('dev');
    });
});
