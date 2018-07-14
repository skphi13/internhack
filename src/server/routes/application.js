const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Provider = require('react-redux').Provider;
const {createStore} = require('../../universal/store');
const environment = require('@homeaway/environment-resolver');
const getAnalyticsDataLayer = require('../utils/analyticsDataLayer');
const serialize = require('serialize-javascript');
const Page1Container = require('../../universal/components/Page1Container/Page1Container').default;
const actions = require('../../universal/actions/actions').default;
const pageApi = require('../api');

/**
 * Application route
 *
 * Primary route for user requests into our application.
 * State is gathered, react UI is rendered, and a page is sent back.
**/

function applicationRouteHandler(request, reply) {
    /**
     * Here is the most straight-forward use-case, a simple one-page
     * app without any client-side routing. A simple app such as this
     * will have a single set of data (one aggregated API call) and one
     * parent component to render.
     *
     * If you require multiple client-side routes, each route with its
     * own data needs, see this recipe:
     * https://github.homeawaycorp.com/Catalyst/recipes/tree/master/multiRouteWithData
    **/

    // Read the data (a call that aggregates multiple other calls)
    pageApi.read(request).then((results) => {
        // Create redux store
        const store = createStore();

        // Dispatch to populate the store
        store.dispatch(actions.fetchPage1DataSuccess(results));

        const startRender = Date.now();

        // Render react UI based on route and data
        const body = ReactDOMServer.renderToString(
            <Provider store={store}>
                <Page1Container/>
            </Provider>
        );

        // Log server-side render times to logs and DataDog
        const renderTime = Date.now() - startRender;
        request.log(['perf'], `name=\'reactRenderToString\' url='\${request.url.pathname}\' elapsed=${renderTime}`);
        request.server.app.metrics.histogram('serverSideRenderTime').update(renderTime);

        // Serialize the state to protect against XSS attacks when inserted into the page
        const initialState = serialize(store.getState(), {isJSON: true});

        // Get site info (name, locale, brandId, humanReadableName, hosts)
        const site = request.plugins.SiteResolution.site;
        const lang = site.locale.substring(0, 2);

        // build and return the page
        return reply.view('index.hbs', {
            body,
            lang,
            initialState,
            analyticsDataLayer: getAnalyticsDataLayer({site, pagename: 'xxxxx'}),
            siteName: site.name
        });
    }).catch((err) => {
        request.log(['error'], `Read failure resulted in error page: '${err.message || ''}'. Stack: ${err.stack || ''}`);
        // TODO: Response HTML should be localized, or we should be directing the user somewhere that is.
        let responseHtml = `
            <h1>Sorry we'll be right back</h1>
            <p>Something unexpected happened and we're fixing it.</p>
        `;
        if (environment.getName() !== 'production') {
            responseHtml = `
                <h1>Error: ${err.message}</h1>
                <code>${err.stack.replace(/\n/g, '<br/>').replace(/\s{4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;')}</code>
            `;
        }
        return reply(responseHtml).code(500);
    });
}

module.exports = applicationRouteHandler;
