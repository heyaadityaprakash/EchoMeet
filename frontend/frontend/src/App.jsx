import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Landing from './pages/landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'

function App() {


  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/auth'element={<Authentication/>}></Route>
      </Routes> 
      </AuthProvider>
    </Router>

     
    </>
  )
}

export default App
