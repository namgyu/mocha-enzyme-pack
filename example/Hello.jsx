import React, { Component } from 'react';

class Hello extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Hello World'
        };
    }

    render() {
        return (
            <div className="default">
                {this.state.title}
            </div>
        );
    }
}

export default Hello;
