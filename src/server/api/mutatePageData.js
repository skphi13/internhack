const systemData = require('../utils/systemData');

/**
 * Mutate Page data
 *
 * After all the data is fetched/gathered we have the opportunity
 * to combine, filter, and manipulate that data. This is the place
 * to do that.
 */

function mutate(results, request) {
    // Mix in the standard system data
    results.system = systemData(request);

    return results;
}

module.exports = {mutate};
