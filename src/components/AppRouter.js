import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import Tpl_main from "../templates/tpl_main";
import Main from "../pages/main/Main";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { StorageContext } from '../contex';
import Tpl_login from './../templates/tpl_login';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(StorageContext);
//   return user?.isAuth ? children : <Navigate to="/auth" replace />;
// };

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const routes = [
    // { path: '/', element: <ProtectedRoute><Tpl_main page={<Main />} /></ProtectedRoute> },
    { path: '/', element: <Tpl_main page={<Main />} />},
    { path: '/SignIn', element: <Tpl_login page={<SignIn />} /> },
    { path: '/SignUp', element: <Tpl_login page={<SignUp />} /> },
    { path: '*', element: <Navigate to="/" replace /> }
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}/>
      ))}
    </Routes>
  );
};

export default AppRouter;