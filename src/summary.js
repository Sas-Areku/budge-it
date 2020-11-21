import React from 'react'

export class Summary extends React.Component {
    render() {
        return (
            <section className="summary">
                <h1>Summary</h1>
                <div className="spending">
                    <h3>Spending available</h3>
                    <p>$526.67</p>
                </div>
            </section>
        )
    }
}