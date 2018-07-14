import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Page1Container from '../Page1Container';
import actions from '../../../actions/actions';

describe('<Page1Container/>', () => {
    const store = {
        dispatch: () => {},
        getState: () => {},
        subscribe: () => {}
    };

    it('componentDidMount triggers an EDAP pageview', () => {
        actions.triggerEdapPageView = sinon.stub();
        const instance = shallow(<Page1Container store={store}/>).dive().instance();
        instance.componentDidMount();
        sinon.assert.called(actions.triggerEdapPageView);
    });

    it('Renders successfully', () => {
        expect(shallow(<Page1Container store={store}/>)).to.have.length(1);
    });
});
