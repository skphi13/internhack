const sinon = require('sinon');
const translationsAPI = require('../translations');
const linguaFileReader = require('@homeaway/lingua-file-reader');

describe('server/api/translations.js', () => {
    it('when read is called, the lingua translation lib should be called', () => {
        const request = {
            plugins: {
                SiteResolution: {
                    site: {
                        locale: 'en_US_HA'
                    }
                }
            }
        };

        const trans = {
            translations: {
                'tm/glossary': {
                    messages: {}
                }
            }
        };

        const linguaFileReaderStub = sinon.stub(linguaFileReader, 'read');
        linguaFileReaderStub.returns(Promise.resolve(trans));

        return translationsAPI.read(request).then(() => {
            sinon.assert.called(linguaFileReaderStub);
            linguaFileReaderStub.restore();
        });
    });
});