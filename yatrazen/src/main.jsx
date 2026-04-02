import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';

const CreateTrip = React.lazy(() => import('./create-trip/index.jsx'));
const Viewtrip = React.lazy(() => import('./view-trip/[tripId]/index.jsx'));
const MyTrips = React.lazy(() => import('./my-trips/index.jsx'));

const LazyFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <Suspense fallback={<LazyFallback />}> <CreateTrip /> </Suspense>
  },
  {
    path: '/view-trip/:tripId',
    element: <Suspense fallback={<LazyFallback />}> <Viewtrip /> </Suspense>
  },
  {
    path: '/my-trips',
    element: <Suspense fallback={<LazyFallback />}> <MyTrips /> </Suspense>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <Toaster></Toaster>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
 