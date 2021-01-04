import React from 'react'

export class Item extends React.Component {
    render() {
        const { itemLabel, itemValue } = this.props

        return (
            <div className="item">
                <h3 className="item-label">{itemLabel}</h3>
                <p className="item-value">${parseFloat(itemValue).toFixed(2)}</p>
            </div>
        )
    }
}