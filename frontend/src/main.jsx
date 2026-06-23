import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { applyStoredTheme } from "./utils/theme.js"

// App bootstrap. Wrap new global providers here when adding app-wide settings or branding state.
applyStoredTheme()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
)
