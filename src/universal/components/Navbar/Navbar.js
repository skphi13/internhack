/* eslint-disable react/jsx-no-literals */
import React, {Component} from 'react';

class Navbar extends Component {
    

    render() {
        return (
            <nav class="box-shadow--nav">
                <ul class="nav nav-underline nav-underline-inverse" role="tablist">
                    <li role="presentation" class="active"><a href="#"><i class="icon-home"></i> Home</a></li>
                    <li role="presentation"><a href="#"><i class="icon-user"></i> Borrower</a></li>
                    <li role="presentation"><a href="#"><i class="icon-tag"></i> Items</a></li>
                </ul>
            </nav> 
        );
    }
}

export default Navbar;