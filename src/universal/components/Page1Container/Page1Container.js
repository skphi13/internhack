import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/actions';
import Welcome from '../Welcome/Welcome';
import Carousel from '../Carousel/Carousel';
import NewItemModal from '../NewItemModal/NewItemModal';
import './Page1Container.less';
import Particles from 'react-particles-js';

function mapStateToProps(state) {
    // Each container component will likely only pull in the state that
    // it cares about. Doing so will eliminate unnecessary rerenders.
    return state;
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch), dispatch};
}

@connect(mapStateToProps, mapDispatchToProps)
class Page1Container extends Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        // edap pageview
        this.props.actions.triggerEdapPageView();
    }

    // Handler that makes an example POST with CSRF protection
    handlePost() {
        this.props.actions.postName('Ringo');
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <Particles
                        params={{
                            particles: {
                                number: {
                                    value: 50
                                },
                                line_linked: {
                                    shadow: {
                                        enable: false,
                                        color: '#3CA9D1',
                                        blur: 5
                                    }
                                }
                            }
                        }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zindex: 4
                        }}
                    />

                    <h1>Plan Your Trip!</h1>

                </div>
                <div>
                    <Carousel
                        style={{
                            margin: '5em'
                        }}
                    />
                </div>

            </div>
        );
    }
}

export default Page1Container;
