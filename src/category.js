import React from 'react'
import { Item } from './item'
import { ItemEdit } from './itemEdit'
import { RemoveModal } from './removeModal'

export class Category extends React.Component {
    state = {
        edit: false,
        itemList: [],
        itemLabel: "",
        itemValue: "",
        loaded: false,
        collapsed: true,
        remove: false,
        total: 0,
    }

    componentDidUpdate(prevProps, prevState) {
        // Update itemList changes
        if (prevState.itemList !== this.state.itemList) {
            // Set localStorage
            const json = JSON.stringify(this.state.itemList)
            localStorage.setItem(this.props.LOCAL_STORAGE_KEY, json)

            // Update item totals
            this.setState({ total: this.state.itemList.sum("value") })
            this.props.newCategoryTotal(this.state.itemList.sum("value"), this.props.id)
        }

        // Update on LOCAL_STORAGE_KEY change
        if (prevProps.LOCAL_STORAGE_KEY !== this.props.LOCAL_STORAGE_KEY) {
            // Get localStorage
            const json = localStorage.getItem(this.props.LOCAL_STORAGE_KEY)
            const itemList = JSON.parse(json)
            if (itemList) 
                this.setState(() => ({ itemList }))
        }

        // Set focus on new empty items
        if (this.state.itemList.length < 1 && !this.state.loaded) {
            document.getElementById("item-field-" + this.props.id).focus()
            this.setState({ loaded: true })
        }
    }

    componentDidMount() {
        // Get localStorage
        const json = localStorage.getItem(this.props.LOCAL_STORAGE_KEY)
        const itemList = JSON.parse(json)
        if (itemList) 
            this.setState(() => ({ itemList }))

        // Render Item Add form if no items
        if (itemList === null || itemList.length < 1)
            this.setState({ edit: true, collapsed: false })
    }

    // Toggle edit state
    toggleEdit = () => {
        this.setState( prevState => ({
            edit: !prevState.edit
        }))
    }

    // Toggle collapsed state
    toggleCollapse = () => {
        this.setState( prevState => ({
            collapsed: !prevState.collapsed
        }))
    }

    // Update temporary itemLabel
    updateItemLabel = e => 
        this.setState({ itemLabel: e.target.value })

    // Update temporary itemValue
    updateItemValue = e => 
        this.setState({ itemValue: e.target.value })

    // Add new item
    addItem = e => {
        if(this.state.itemLabel !== "" && this.state.itemValue !== "") {
            this.setState(prevState => ({
                itemList: [...prevState.itemList, {label: this.state.itemLabel, value: this.state.itemValue}],
                itemLabel: "",
                itemValue: ""
            }))
            document.getElementById("item-field-" + this.props.id).focus()
        }

        e.preventDefault()
    }

    // Shadow copy, assign itemList.label new value, update itemList
    editItemLabel = (e, i) => {
        let itemList = [...this.state.itemList]
        let item = {...itemList[i]}

        item.label = e.target.value
        itemList[i] = item

        this.setState({ itemList })
    }

    // Shadow copy, assign itemList.value new value, update itemList
    editItemValue = (e, i) => {
        let itemList = [...this.state.itemList]
        let item = {...itemList[i]}
        item.value = e.target.value
        itemList[i] = item
        this.setState({ itemList })
    }

    // Remove itemList element
    removeItem = (id, e) => {
        this.setState(prevState => ({
            itemList: prevState.itemList.filter((_, i) => i !== id)
        }))
        e.preventDefault()
    }

    // Toggle edit state
    toggleRemove = () => {
        this.setState( prevState => ({
            remove: !prevState.remove
        }))
    }

    // Confirm remove
    confirmRemove = (e) => {
        this.props.removeCategory(this.props.id, e)
        this.setState({ remove: false, edit: false })
    }

    render() {
        const { categoryLabel, id } = this.props
        const { edit, collapsed, remove } = this.state

        return (
            <section className={collapsed ? "category collapsed" : "category expanded"}>
                {edit ?
                    <>
                        {/* Category edit form */}
                        <input 
                            className="category-field" 
                            type="text" 
                            placeholder="Category label"
                            value={categoryLabel}
                            onChange={(e) => this.props.newCategoryLabel(e, id)}>
                        </input>
                        <button className="remove-btn category-btn" onClick={() => this.toggleRemove()}> </button>
                    </>
                :
                    <div className="category-label-wrapper" onClick={this.toggleCollapse}>
                        <h2 className="category-label">{categoryLabel}</h2>
                        <div className={collapsed ? "category-arrow collapsed" : "category-arrow expanded"}></div>
                    </div>
                }

                {collapsed ? "" : <button className={edit ? "edit-btn confirm-btn" : "edit-btn" } onClick={this.toggleEdit}></button>}

                {/* Render all items */}
                {this.state.itemList.map (
                    (items, i) =>
                        edit ? 
                            <ItemEdit 
                                key={i}
                                id={i}
                                itemLabel={items.label}
                                itemValue={items.value}
                                editItemLabel={this.editItemLabel}
                                editItemValue={this.editItemValue}
                                removeItem={this.removeItem}
                            />
                        : 
                            <Item 
                                key={i}
                                id={i}
                                itemLabel={items.label}
                                itemValue={items.value}
                            />
                )}

                {/* Item Add form */}
                {edit ? 
                    <div className="item-edit">
                        <form onSubmit={this.addItem}>
                            <input 
                                className="item-label-field" 
                                id={"item-field-"+id}
                                placeholder="Add item"
                                type="text"
                                value={this.state.itemLabel}
                                onChange={this.updateItemLabel}>
                            </input>

                            <div className="float-right">
                                <p>$</p>
                                <input 
                                    className="item-value-field" 
                                    placeholder="27.99"
                                    type="number"
                                    value={this.state.itemValue}
                                    onChange={this.updateItemValue}>
                                </input>
                                <button className="add-btn item-btn"></button>
                            </div>
                        </form>
                    </div>
                :
                    ""
                }

                {/* Category total */}
                {collapsed ?
                    <div className="category-total collapsed">
                        <p>${this.state.total.toFixed(2)}</p>
                    </div>
                :
                    <div className="category-total">
                        <h3>Total:</h3>
                        <div className="float-right">
                            <p>${this.state.total.toFixed(2)}</p>
                        </div>
                    </div>
                }

                {/* Remove modal */}
                {remove ? 
                    <RemoveModal
                        confirmRemove={this.confirmRemove}
                        toggleRemove={this.toggleRemove}
                    />
                :
                    ""
                }
            </section>
        )
    }
}