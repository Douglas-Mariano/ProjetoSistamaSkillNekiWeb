import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from './pages/login/Login.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Home from './pages/home/Home.jsx';
import { SkillProvider } from './context/SistemaSkillContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <SkillProvider>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </SkillProvider>
);
