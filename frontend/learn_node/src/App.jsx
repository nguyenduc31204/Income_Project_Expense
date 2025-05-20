
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'

const Root = () => {
  // kiem tra neu token co trong localStorage thi chuyen huong den dashboard
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/logins" />
  )
}

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/logins" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/income" element={<Income/>} />
          <Route path="/expense" element={<Expense/>} />
        </Routes>
    </div>
  )
}

export default App


