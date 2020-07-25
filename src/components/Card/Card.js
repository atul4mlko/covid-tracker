import React from 'react';

class Card extends React.Component {
    render() {
        const { newCases, totalCases, type } = this.props;
        return (
            <div className={`card-component ${type.toLowerCase()}`}>
                <div className="card-heading">{type}</div>
                <div>New: {newCases.toLocaleString()}</div>
                <div>Total: {totalCases.toLocaleString()}</div>
            </div>
        );
    }
}

export default Card;