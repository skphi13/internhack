const {expect} = require('chai');
const routes = require('../index');

describe('server/routes/index.js', () => {
    it('Ensure routes array is returned', () => {
        const config = {get: () => 'temp'};
        expect(!!routes(config).length).to.equal(true);
    });
});
