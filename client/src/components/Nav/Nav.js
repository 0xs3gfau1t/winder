import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-head.png";
// import logo from '../assets/images/logo.svg'

import Wrapper from "../../assets/wrappers/NavPage";
import {
  FaSearch,
  FaGrinAlt,
  FaRegBell,
  FaRocketchat,
  FaWrench,
  FaDoorOpen,
} from "react-icons/fa";
import { IconContext } from "react-icons";

function Nav(props) {
  return (
    <Wrapper className="Navbar">
      <div className="Navbar">
        <Link to="/explore">
          <img className="logo_nav" src={logo} />
        </Link>

        <div className="navs">
          <IconContext.Provider
            value={{
              color: "#F24E1E",
              size: "2em",
              className:
                props.current == "Profile" ? "icons choosen_one" : "icons",
            }}
          >
            <Link to="/profile">
              <FaGrinAlt />
            </Link>
          </IconContext.Provider>

          <IconContext.Provider
            value={{
              color: "#F24E1E",
              size: "2em",
              className:
                props.current == "Notification" ? "icons choosen_one" : "icons",
            }}
          >
            <Link to="/notification">
              <span>
                <FaRegBell />
              </span>
            </Link>
          </IconContext.Provider>

          <IconContext.Provider
            value={{
              color: "#F24E1E",
              size: "2em",
              className:
                props.current == "Explore" ? "icons choosen_one" : "icons",
            }}
          >
            <Link to="/explore">
              <span>
                <FaSearch />
              </span>
            </Link>
          </IconContext.Provider>

          <IconContext.Provider
            value={{
              color: "#F24E1E",
              size: "2em",
              className:
                props.current == "Chat" ? "icons choosen_one" : "icons",
            }}
          >
            <Link to="/chat">
              <span>
                <FaRocketchat />
              </span>
            </Link>
          </IconContext.Provider>

          <IconContext.Provider
            value={{
              color: "#F24E1E",
              size: "2em",
              className:
                props.current == "Settings" ? "icons choosen_one" : "icons",
            }}
          >
            <Link to="/setting">
              <span>
                <FaWrench />
              </span>
            </Link>
          </IconContext.Provider>

          <IconContext.Provider
            value={{ color: "#F24E1E", size: "2em", className: "icons" }}
          >
            <Link to="/login">
              <span>
                <FaDoorOpen />
              </span>
            </Link>
          </IconContext.Provider>
        </div>
      </div>
    </Wrapper>
  );
}

export default Nav;
