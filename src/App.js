import React from 'react'
import { Budget } from './budget'
import mobile from './Assets/Images/budge-it mobile.png'

function App() {
  return (
    <>
      <div className="header">
        <h1 className="title">Budget-it!</h1>
      </div>

      <div className="container">
        <Budget />
      </div>

      {/* Mobile view only warning message */}
      <div className="mobile-view-only">
        <div>
          <h1>Budge-it!</h1>
          <p>(Currently only available on mobile)</p>
          <img src={mobile}></img>
        </div>
      </div>
    </>
  )
}

export default App;
