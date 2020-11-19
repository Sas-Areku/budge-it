import React from 'react'

export class Item extends React.Component {
    render() {
        const { itemLabel, itemValue } = this.props

        return (
            <section className="item">
                <h3 className="item-label">{itemLabel}</h3>
                <p className="item-value">${itemValue}</p>
            </section>
        )
    }
}