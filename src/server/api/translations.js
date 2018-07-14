const linguaFileReader = require('@homeaway/lingua-file-reader');

/**
 * This grabs the translations for the request's locale and gives you
 * the opportunity to organize/mutate as needed. The lingua namespaces are
 * configured in gulpfile.js.
 */

linguaFileReader.setPath('build/lingua/translations');

// Mutate the results
function mutate(resp) {
    // In this example we have one namespace, might as well simplify.
    return {
        translations: resp.translations['tm/glossary'].messages
    };
}

function read(request) {
    const site = request.plugins.SiteResolution.site;
    return linguaFileReader.read(site).then(mutate);
}

module.exports = {
    read
};
