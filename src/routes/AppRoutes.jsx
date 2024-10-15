import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '../pages/Authentication/Signin';
import Signup from '../pages/Authentication/Signup';
import Home from '../pages/dashboard/home';
import DefaultLayout from '../layout/DefaultLayout';
import Profile from '../pages/dashboard/profile';

function AppRoutes() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />

<Route
          path="/profile"
          element={
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};




export default AppRoutes