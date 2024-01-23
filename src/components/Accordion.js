import React, { Component } from "react";

export class Accordion extends Component {
    state = { isOpen: false };

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const { title, children } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="accordion-item">
                <button className="accordion-button" onClick={this.toggle}>
                    {title}
                </button>
                {isOpen && <div className="accordion-content">{children}</div>}
            </div>
        );
    }
}