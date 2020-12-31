import React from 'react'
import { Summary } from './summary'
import { Category } from './category'
import { Income } from './income'
import uuid from 'react-uuid'

export class Budget extends React.Component {
    state = {
        categoryList: [],
        categoryLabel: "",
        expenses: (0).toFixed(2),
        income: (0).toFixed(2),
    }

    componentDidUpdate(_, prevState) {
        // Update when categoryList changes
        if(prevState.categoryList !== this.state.categoryList) {
            // Set localStorage
            const json = JSON.stringify(this.state.categoryList)
            localStorage.setItem("categoryList", json)

            // Update total expenses
            this.setState({ expenses: this.state.categoryList.sum("total").toFixed(2) })
        }
    }

    componentDidMount() {
        const json = localStorage.getItem("categoryList")
        const categoryList = JSON.parse(json)
        if (categoryList) {
            this.setState(() => ({ categoryList }))
        }
    }

    // Update temporary categoryLabel
    updateCategoryLabel = e => 
        this.setState({ categoryLabel: e.target.value })
    
    // Add new category
    addCategory = e => {
        if(this.state.categoryLabel !== "") {
            this.setState(prevState => ({
                categoryList: [...prevState.categoryList, {label: this.state.categoryLabel,
                                                           total: 0,  
                                                           ITEM_KEY: "itemList_" + uuid()}],
                categoryLabel: ""
            }))
        }

        e.preventDefault()
    }

    // Shadow copy, assign categoryList.label new value, update categoryList
    newCategoryLabel = (e, i) => {
        let categoryList = [...this.state.categoryList]
        let category = {...categoryList[i]}

        category.label = e.target.value
        categoryList[i] = category

        this.setState({ categoryList })
    }

    // New category total from sum of item values
    newCategoryTotal = (c, i) => {
        let categoryList = [...this.state.categoryList]
        let category = {...categoryList[i]}
    
        category.total = c
        categoryList[i] = category
    
        this.setState({ categoryList })
    }

    // New income total
    newIncomeTotal = c =>
        this.setState({ income: c })

    // Remove categoryList element
    removeCategory = (id, e) => {
        this.setState(prevState => ({
            categoryList: prevState.categoryList.filter((_, i) => i !== id)
        }))
        e.preventDefault()
    }

    render() {
        return (
            <div className="wrapper">
                <Summary 
                    expenses={this.state.expenses} 
                    income={this.state.income}
                />

                <div className="budget">
                    <h1>Budget</h1>

                    <Income 
                        newIncomeTotal={this.newIncomeTotal}
                    />

                    {/* Render all categories */}
                    {this.state.categoryList.map (
                        (categories, i) => 
                            <Category 
                                key={i}
                                id={i}
                                categoryLabel={categories.label}
                                LOCAL_STORAGE_KEY={categories.ITEM_KEY}
                                newCategoryLabel={this.newCategoryLabel}
                                newCategoryTotal={this.newCategoryTotal}
                                removeCategory={this.removeCategory}
                            />
                    )}

                    {/* Category Add form */}
                    <form className="category-add-form" onSubmit={this.addCategory}>
                        <input 
                            className="category-field" 
                            placeholder="Add category"
                            type="text"
                            value={this.state.categoryLabel}
                            onChange={this.updateCategoryLabel}>
                        </input>
                        <button className="add-btn category-btn"></button>
                    </form>
                </div>
            </div>
        )
    }
}