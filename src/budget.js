import React from 'react'
import { Category } from './category'

export class Budget extends React.Component {
    state = {
        categoryList: [{label: "Category 1"}, {label: "Category 2"}],
        edit: false,
    }

    render() {
        return (
            <div className="budget">
                <h1>Budget</h1>

                {/* Render all categories */}
                {this.state.categoryList.map (
                    (categories, i) => 
                        <Category 
                            key={i}
                            id={i}
                            categoryLabel={categories.label}
                        />
                )}

            </div>
        )
    }
}