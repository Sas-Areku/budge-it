import React from 'react'

export class Summary extends React.Component {
    state = {
        netTotal: 0,
        collapsed: true
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
          this.setState({ netTotal: this.props.income - this.props.expenses })
        }
    }

    // Toggle collapsed state
    toggleCollapse = () => {
        this.setState( prevState => ({
            collapsed: !prevState.collapsed
        }))
    }

    render() {
        const { expenses, income } = this.props
        const { collapsed } = this.state
        return (
            <section className="summary">
                <h1>Summary</h1>

                {/* Spending available */}
                <div className="spending">
                    <h3>Spending available</h3>
                    <p>${(this.state.netTotal / 2).toFixed(2)}</p>
                </div>

                {/* Income category */}
                <div className={collapsed ? "category collapsed" : "category expanded"}>
                    <div className="category-label-wrapper" onClick={this.toggleCollapse}>
                        <h2 className="category-label">Net</h2>
                        <div className={collapsed ? "category-arrow collapsed" : "category-arrow expanded"}></div>
                    </div>

                    <div className="item">
                        <h3 className="item-label">Income</h3>
                        <p className="item-value income">+${parseFloat(income).toFixed(2)}</p>
                    </div>

                    <div className="item">
                        <h3 className="item-label">Expenses</h3>
                        <p className="item-value expenses">-${parseFloat(expenses).toFixed(2)}</p>
                    </div>

                    {/* Net total */}
                    {collapsed ?
                        <div className="category-total collapsed">
                            <p>${this.state.netTotal.toFixed(2)}</p>
                        </div>
                    :
                        <div className="category-total">
                            <h3>Total:</h3>
                            <div className="float-right">
                                <p>${this.state.netTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    }
                </div>
            </section>
        )
    }
}