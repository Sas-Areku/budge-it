import React from 'react'
import { Item } from './item'
import { ItemEdit } from './itemEdit'

export class Category extends React.Component {
    state = {
        billList: [{label: "Item 1", value: 27.99}, {label: "Item 2", value: 6400.99}],
        edit: false
    }

    toggleEdit = () => {
        this.setState( prevState => ({
            edit: !prevState.edit
        }))
    }

    render() {
        const { categoryLabel } = this.props
        const { edit } = this.state

        return (
            <section className="category">
                {edit ?
                    <input className="category-edit-field" type="text" value={categoryLabel}></input>
                :
                    <h2 className="category-label">{categoryLabel}</h2>
                }

                <button onClick={this.toggleEdit}>{edit ? "Update" : "Edit"}</button>

                {this.state.billList.map (
                    (items, i) =>
                        <>
                            {edit ? 
                                <ItemEdit 
                                    key={i}
                                    id={i}
                                    itemLabel={items.label}
                                    itemValue={items.value}
                                />
                            : 
                                <Item 
                                    key={i}
                                    id={i}
                                    itemLabel={items.label}
                                    itemValue={items.value}
                                />
                            }
                        </>
                )}
            </section>
        )
    }
}