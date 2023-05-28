import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import { paths } from './api/paths';
import ErrorLayout from './components/Layout/error';
import Menu from './components/Layout/Menu/menu';
import Main from './components/Main/main';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Profile from './components/Layout/Profile/profile';
import Settings from './components/Layout/Options/Settings/settings';
import NewRestaurant from './components/Layout/NewRestaurant/newRestaurant';
import Orders from './components/Layout/Options/Orders/orders';
import Cart from './components/Layout/Options/Cart/cart';
import Restaurant from './components/Layout/Restaurant/restaurant';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: paths.NEWRESTAURANT,
        element: <NewRestaurant />,
      },
      {
        path: paths.PROFILE,
        element: <Profile />,
      },
      {
        path: paths.RESTAURANT,
        element: <Restaurant />,
      },
      {
        path: paths.ORDERS,
        element: <Orders />,
      },
      {
        path: paths.CART,
        element: <Cart />,
      },
      {
        path: paths.SETTINGS,
        element: <Settings />,
      }
    ]
  },
  {
    path: paths.MAIN,
    element: <Main />,
  },
  {
    path: paths.LOGIN,
    element: <Login/>,
  },
  {
    path: paths.REGISTER,
    element: <Register />,
  },
  {
    path: '*',
    element: <ErrorLayout />
  }
])
  
  const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App