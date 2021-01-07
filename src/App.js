import React, { useState, useEffect } from 'react'
import storage from 'local-storage-fallback'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Budget } from './budget'
import mobile from './Assets/Images/budge-it mobile.png'
import arrowWhite from './Assets/Images/arrow-white.png'

// Darkmode theme stylesheet
const GlobalStyle = createGlobalStyle`
  ${props => props.theme.mode === 'dark' ? `
    body { 
      background-color: #1A1A1A;
      color: white;
    }

    .header {
      background-color: black;
      color: #0A47FF;
    }

    .container {
      background-color: #1A1A1A;
    }

    .category.collapsed, .category.expanded {
      background-color: #2A2A2A;
      border: 1px solid #111;
    }

    .item {
      background-color: #1A1A1A;
    }

    .spending {
      background-color: #00b55b;
      border: 1px solid #004020;
    }

    .income {
      color: #00b55b;
    }

    .expenses {
      color: #db2a3b;
    }

    .edit-btn.confirm-btn {
      background-color: #00b55b;
    }

    .remove-btn.confirm-btn {
      background-color: #00b55b;
    }

    .btn-wrapper .confirm-btn {
      background-color: #00b55b;
    }

    .remove-btn {
      background-color: #db2a3b;
    }

    .btn-wrapper .cancel-btn {
      background-color: #db2a3b;
    }

    input {
      color: white;
      background-color: #1A1A1A;
    }

    input:hover {
      color: white;
      background-color: #1A1A1A;
    }

    input:focus {
      color: white;
      background-color: #1A1A1A;
    }

    .category-add-form input {
      background-color: #2A2A2A;
      border: 1px solid #111;
    }

    .category-add-form input:focus {
      background-color: #2A2A2A;
      border: 1px solid #111;
    }

    .category-arrow {
      background-image: url(${arrowWhite}) !important;
    }

    .remove-modal {
      background-color: #1A1A1A;
    }
  `
  : ""}
`

// Load saved theme from localStorage
function getInitialTheme() {
  const savedTheme = storage.getItem('theme')
  return savedTheme ? JSON.parse(savedTheme) : { mode: 'light' }
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Save theme to localStorage
  useEffect(
    () => {
      storage.setItem('theme', JSON.stringify(theme))
    },
    [theme]
  )

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <div className="header">
        <h1 className="title">Budge-it!</h1>
        <button 
          className={theme.mode === 'dark' ? "theme-btn light" : "theme-btn dark"} 
            onClick={
              (e) => 
                setTheme(theme.mode === 'dark' ? {mode: 'light'} : {mode: 'dark'})}>
        </button>
      </div>

      <div className="container">
        <Budget />
      </div>

      {/* Mobile view only warning message */}
      <div className="mobile-view-only">
        <div>
          <h1>Budge-it!</h1>
          <p>(Currently only available on mobile)</p>
          <img alt="mobile splashscreen" src={mobile}></img>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App;