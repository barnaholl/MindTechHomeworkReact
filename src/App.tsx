import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Navbar } from './component/Navbar';
import { ErrorPage } from './page/ErrorPage';
import { HomePage } from './page/HomePage';
import { LoginPage } from './page/LoginPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/login",
      element: <LoginPage/>,
      errorElement: <ErrorPage/>
    },
  ])
  return (
    <>
      <Navbar/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
