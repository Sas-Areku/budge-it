import React from 'react'

export class ItemEdit extends React.Component {
    render() {
        const { itemLabel, itemValue } = this.props

        return (
            <div className="item-edit">
                <input
                    className="item-label-field" 
                    type="text" 
                    value={itemLabel}>
                </input>

                <div className="float-right">
                    <p>$</p>
                    <input
                        className="item-value-field" 
                        type="number" 
                        value={itemValue}>
                    </input>
                </div>
            </div>
        )
    }
}