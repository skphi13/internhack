const expect = require('chai').expect;
const proxyquire = require('proxyquire');

describe('server/api/mutatePageData.js', () => {
    const request = {
        plugins: {}
    };

    it('returns mutated data', () => {
        const mutate = proxyquire('../mutatePageData', {
            '../utils/systemData': () => 'systemData'
        }).mutate;

        const resp = {name: 'foo'};
        const result = mutate(resp, request);
        expect(result).to.deep.equal({...resp, system: 'systemData'});
    });
});