import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layouts/Layout.jsx';
import Home from './Pages/Home.jsx';
import AllProducts from './Pages/AllProducts.jsx';
import MyProducts from './Pages/MyProducts.jsx';
import MyBids from './Pages/MyBids.jsx';
import CreateProducts from './Pages/CreateProducts.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import Register from './Pages/Register.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index:true,
        Component: Home,
      },
      {
        path: '/',
        Component: Home,
      },
      {
        path: 'allproducts',
        Component: AllProducts
      },
      {
        path: 'myproducts',
        element: <PrivateRoutes><MyProducts></MyProducts></PrivateRoutes>
      },
      {
        path: 'mybids',
        element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
      },
      {
        path: 'createproducts',
        Component: CreateProducts
      },
      {
        path: 'register',
        Component: Register
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
