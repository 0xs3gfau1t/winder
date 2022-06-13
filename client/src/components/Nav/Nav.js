import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-head.png'
// import logo from '../assets/images/logo.svg'


import { FaSearch, FaGrinAlt, FaRegBell, FaRocketchat, FaWrench  } from 'react-icons/fa';
import { IconContext } from 'react-icons';




import './Nav.css'

function Nav(props) {
  return (
    <div className = 'Navbar'>
        <img className = "logo_nav" src = {logo} />
        <div className = 'navs'>
            <IconContext.Provider value={{color: "#F24E1E", size: "2em", className: props.current == "Profile" ? 'icons choosen_one' : 'icons'}}>
              <Link to='/profile'><FaGrinAlt /></Link>
            </IconContext.Provider>

            <IconContext.Provider value={{color: "#F24E1E", size: "2em", className: props.current == "Notification" ? 'icons choosen_one' : 'icons'}}>
            <Link to='/notification'><span><FaRegBell /></span></Link>
            </IconContext.Provider>

            <IconContext.Provider value={{color: "#F24E1E", size: "2em", className: props.current == "Explore" ? 'icons choosen_one' : 'icons'}}>
            <Link to='/explore'><span><FaSearch /></span></Link>
            </IconContext.Provider>

            <IconContext.Provider value={{color: "#F24E1E", size: "2em", className: props.current == "Chat" ? 'icons choosen_one' : 'icons'}}>
            <Link to='/chat'><span><FaRocketchat/></span></Link>
            </IconContext.Provider>

            <IconContext.Provider value={{color: "#F24E1E", size: "2em", className: props.current == "Settings" ? 'icons choosen_one' : 'icons'}}>
            <Link to='/setting'><span><FaWrench/></span></Link>
            </IconContext.Provider>







            
            
            
            
            {/* <div>Profile</div>
            <div>Notification</div>
            <div>Explore</div>
            <div>Chat</div> 
            <div>Setting</div> */}
        </div>

    </div>
  )
}

export default Nav