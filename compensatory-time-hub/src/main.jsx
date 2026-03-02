import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import UserPage from './pages/UserPage.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
   {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/user",
    element:<UserPage/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
