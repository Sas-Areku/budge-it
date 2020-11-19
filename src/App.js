import React, { useState, useEffect } from 'react'
import { Summary } from './summary'
import { Budget } from './budget'

function App() {
  return (
    <>
      <div className="header">
        <h1 className="title">Budget-it!</h1>
      </div>

      <div className="container">
        <Summary />
        <Budget />
      </div>
    </>
  )
}

export default App;
