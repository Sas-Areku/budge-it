import React from 'react'
import { Item } from './item'

export class Category extends React.Component {
    state = {
        billList: [{label: "Item 1", value: 27.99}, {label: "Item 2", value: 64.99}]
    }

    render() {
        const { categoryLabel } = this.props

        return (
            <section className="category">
                <h2 className="category-label">{categoryLabel}</h2>

                {this.state.billList.map (
                    (items, i) =>
                        <Item 
                            key={i}
                            id={i}
                            itemLabel={items.label}
                            itemValue={items.value}
                        />
                )}
            </section>
        )
    }
}