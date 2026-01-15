import React, { useEffect } from 'react'
import AppRoute from './route/AppRoute'
import { useDispatch } from 'react-redux'
import { getMe } from './features/auth/authSlice';
import { getAccessToken } from './utils/token';
import Navbar from './components/layout/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const dispatch=useDispatch();

  useEffect(() => {
  if (getAccessToken()) {
    dispatch(getMe());
  }
}, []);



  return (
    <div>
      <Navbar/>
    <AppRoute/>
    <ToastContainer/>
    </div>
  )
}

export default App
