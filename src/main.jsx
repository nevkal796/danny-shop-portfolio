import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// The app decides scroll position on every route change. Left on "auto",
// the browser restores the previous position after our effects run and
// drops you halfway down the facade on reload.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
