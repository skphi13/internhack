const expect = require('chai').expect;
const systemData = require('../systemData');

describe('server/utils/systemData.js', () => {
    const request = {
        headers: {
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53'
        },
        plugins: {
            SiteResolution: {
                site: {
                    name: 'homeaway_us',
                    locale: 'en_US_HA'
                }
            }
        }
    };

    it('returns a set of data', () => {
        const resp = systemData(request);
        expect(!!resp.isMobile).to.equal(true);
    });

    it('returns isDesktop = true if useragent string is empty', () => {
        request.headers = {};
        const resp = systemData(request);
        expect(!!resp.isMobile).to.equal(false);
        expect(!!resp.isTablet).to.equal(false);
        expect(!!resp.isDesktop).to.equal(true);
    });
});