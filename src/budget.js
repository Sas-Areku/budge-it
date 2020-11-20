import React from 'react'
import { Category } from './category'
import uuid from 'react-uuid'

export class Budget extends React.Component {
    state = {
        categoryList: [],
        categoryLabel: "",
        edit: false,
    }

    updateCategoryLabel = e => 
        this.setState({ categoryLabel: e.target.value })
    
    addCategory = e => {
        if(this.state.categoryLabel !== "") {
            this.setState(prevState => ({
                categoryList: [...prevState.categoryList, {label: this.state.categoryLabel,  
                                                           ITEM_KEY: "itemList_" + uuid()}],
                categoryLabel: ""
            }))
        }

        e.preventDefault()
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

                <form onSubmit={this.addCategory}>
                    <input 
                        className="category-field" 
                        placeholder="Category label"
                        type="text"
                        value={this.state.categoryLabel}
                        onChange={this.updateCategoryLabel}>
                    </input>
                    <button className="category-btn">Add</button>
                </form>
            </div>
        )
    }
}