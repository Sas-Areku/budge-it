import React from 'react'

export class ItemEdit extends React.Component {
    render() {
        const { itemLabel, itemValue, id } = this.props

        return (
            // Item edit form
            <div className="item-edit">
                <input
                    className="item-label-field" 
                    type="text" 
                    value={itemLabel}
                    onChange={(e) => this.props.editItemLabel(e, id)}>
                </input>

                <div className="float-right">
                    <p>$</p>
                    <input
                        className="item-value-field" 
                        type="number" 
                        value={itemValue}
                        onChange={(e) => this.props.editItemValue(e, id)}>
                    </input>
                    <button className="remove-btn item-btn"></button>
                </div>
            </div>
        )
    }
}