import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Landing from './pages/landing'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
      </Routes>
    </Router>

     
    </>
  )
}

export default App
