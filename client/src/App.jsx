import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './pages/error-page';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/homepage';
import Dashboard from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={router} >
      </RouterProvider>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} />
    </ThemeProvider>
  )
}

export default App
