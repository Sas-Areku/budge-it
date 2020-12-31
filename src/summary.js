import React from 'react'

export class Summary extends React.Component {
    state = {
        netTotal: (0).toFixed(2)
    }

    componentDidUpdate(prevProps) {
        if (this.props.expenses !== prevProps.expenses) {
          this.setState({ netTotal: parseFloat(this.props.income - this.props.expenses).toFixed(2) })
        }
    }

    render() {
        const { expenses, income } = this.props
        return (
            <section className="summary">
                <h1>Summary</h1>

                <div className="spending">
                    <h3>Spending available</h3>
                    <p>${this.state.netTotal / 2}</p>
                </div>

                <div className="category">
                    <h2 className="category-label">Net</h2>

                    <div className="item">
                        <h3 className="item-label">Income</h3>
                        <p className="item-value income">+${income}</p>
                    </div>

                    <div className="item">
                        <h3 className="item-label">Expenses</h3>
                        <p className="item-value expenses">-${expenses}</p>
                    </div>

                    {/* Net total */}
                    <div className="category-total">
                        <h3>Total:</h3>
                        <div className="float-right">
                            <p>${this.state.netTotal}</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}