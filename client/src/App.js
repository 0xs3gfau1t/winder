import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Landing, Login, Error } from './pages';

import './app.css'
const App = () => {
	return (
    <Router>
      {/* <nav>
        <Link to='/' >Dashbaord</Link>
        <Link to='/landing' >Landing</Link>
        <Link to='/login' >Login</Link>
        </nav> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
	)
}

export default App;