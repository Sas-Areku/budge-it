import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './Assets/Stylesheets/index.css'
import './Assets/Stylesheets/summary.css'
import './Assets/Stylesheets/category.css'
import './Assets/Stylesheets/item.css'

Array.prototype.sum = function (c) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
    total += parseFloat(this[i][c])
  }

  return total
}

// Shrink header when scroll
let headerAnimation = () => {
    const header = document.getElementById("header")
    var scrollPos = document.documentElement.scrollTop || document.scrollTop

    header.style.height = "130" - scrollPos + "px"
}

document.body.onscroll = () => headerAnimation()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)