const MobileDetect = require('mobile-detect');
const environment = require('@homeaway/environment-resolver');

function systemData(request) {
    const site = request.plugins.SiteResolution.site;
    const userAgent = request.headers['user-agent'] || '';
    const mobileDetect = new MobileDetect(userAgent);

    return {
        siteName: site.name,
        brandId: site.brandId,
        fullLocale: site.locale,
        locale: site.locale.match(/^.{2}_.{2}/)[0],
        environment: environment.getName(),
        userAgent,
        isMobile: !!mobileDetect.mobile(),
        isTablet: !!mobileDetect.tablet(),
        isDesktop: !mobileDetect.mobile() && !mobileDetect.tablet()
    };
}

module.exports = systemData;