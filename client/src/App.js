import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import { Landing, Login, Error } from './pages';

import './app.css'
const App = () => {
	return (
    <Provider store={store}>
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
    </Provider>
	)
}

export default App;