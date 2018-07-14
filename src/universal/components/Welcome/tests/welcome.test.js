import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

describe('/universal/components/Welcome', () => {
    const Welcome = proxyquire('../Welcome.js', {
        './catalyst-logo.png': () => {}
    }).default;

    it('handleClick() throws an error', () => {
        const instance = shallow(<Welcome/>).instance();
        const errorStub = sinon.stub();
        try {
            instance.handleClick();
        } catch (err) {
            errorStub();
        }
        sinon.assert.called(errorStub);
    });

    it('Renders successfully', () => {
        expect(shallow(<Welcome/>)).to.have.length(1);
    });
});