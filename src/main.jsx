import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './Pages/Login.jsx'
import Register from './Pages/Registrations.jsx'
import Admin from './Pages/Admin.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Register /> },
  { path: '/admin', element: <Admin /> },
  { path: '*', element: <div>404 Not Found</div> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
