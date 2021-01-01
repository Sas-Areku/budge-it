import React from 'react'

export class ItemEdit extends React.Component {
    state = {
        remove: false
    }

    // Toggle edit state
    toggleRemove = () => {
        this.setState( prevState => ({
            remove: !prevState.remove
        }))
    }

    confirmRemove = (e) => {
        this.props.removeItem(this.props.id, e)
        this.setState({ remove: false })
    }

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

                    {this.state.remove ?
                        <button
                            className="confirm-remove-btn"
                            onClick={(e) => this.confirmRemove(e)}>
                                Confirm?
                        </button>   
                    :
                        <button 
                            className="remove-btn item-btn"
                            onClick={this.toggleRemove}>
                        </button>
                    }
                </div>
            </div>
        )
    }
}