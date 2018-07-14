const sinon = require('sinon');
const page1ApiRouteHandler = require('../page1ApiRouteHandler.js');
const pageApi = require('../../api');

describe('server/routes/page1ApiRouteHandler.js', () => {
    it('the pageApi should be called', () => {
        const request = {
            plugins: {SiteResolution: {site: {}}}
        };
        const reply = sinon.stub();
        pageApi.read = sinon.stub().returns({then: (cb) => cb()});

        page1ApiRouteHandler(request, reply);
        sinon.assert.called(pageApi.read);
        sinon.assert.called(reply);
    });
});