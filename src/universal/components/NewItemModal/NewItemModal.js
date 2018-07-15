import React, {Component} from 'react';
import {Modal} from '@homeaway/react-modal';
import {Button} from '@homeaway/react-buttons';
import {FormInput, FormTextArea} from '@homeaway/react-form-components';


class NewItemModal extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    handleOpen() {
        this.setState({isOpen: true});
    }

    handleClose() {
        this.setState({isOpen: false});
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} label="Add a destination" />
                <Modal
                    id="modal-example-1"
                    isOpen={this.state.isOpen}
                    onClose={this.handleClose}
                    title="Add a Place"
                >
                    <form role="form">
                        <div className="input-container" aria-label="Big form">
                            <div className="row">
                                <div className="col-xs-6">
                                    <FormInput
                                        id="Place name"
                                        type="text"
                                        name="Place name"
                                        label="Place name"
                                    />
                                </div>
                                <div className="col-xs-6">
                                    <FormInput
                                        id="PlaceURL"
                                        type="text"
                                        name="PlaceURL"
                                        label="Place image URL"
                                    />
                                </div>
                            </div>

                            <FormTextArea
                                id="description"
                                label="Description"
                                className="custom-class"
                                value={this.state.controlledValue}
                                onChange={this.handleTextChange}
                            />

                        </div>
                    </form>
                    <Button label="Submit" />
                </Modal>
            </div>
        );
    }
}

export default NewItemModal;