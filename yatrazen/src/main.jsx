import React from 'react'
import ReactDOM from 'react-dom/client' // ✅ Import ReactDOM
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render( // ✅ Works now
  <React.StrictMode>
    <Header/>
    <Toaster></Toaster>
    <RouterProvider router={router} />
  </React.StrictMode>
)
 