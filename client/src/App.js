import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import { Landing, Login, Error } from './pages';
import Explore from './pages/Explore'

import './app.css'
import Profile from './pages/Profile';
import Notification from './pages/Notification';
import Chat from './pages/Chat';
import Setting from './pages/Setting';


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
          <Route path = '/profile' element = {<Profile/>}/>
          <Route path = '/notification' element = {<Notification/>}/>
          <Route path='/explore' element = {<Explore/>} />
          <Route path = '/chat' element = {<Chat/>}/>
          <Route path = '/setting' element = {<Setting/>}/>
        </Routes>
      </Router>
    </Provider>
	)
}

export default App;