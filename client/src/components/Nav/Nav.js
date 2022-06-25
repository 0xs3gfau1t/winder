import React from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../actions/auth"
import logo from "../../assets/images/logo-head.png"
// import logo from '../assets/images/logo.svg'

import Wrapper from "../../assets/wrappers/NavPage"
import {
	FaSearch,
	FaGrinAlt,
	FaRegBell,
	FaRocketchat,
	FaDoorOpen,
} from "react-icons/fa"
import { IconContext } from "react-icons"

function Nav(props) {
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout())
	}
	return (
		<Wrapper className="Navbar">
			<div className="Navbar">
				<NavLink to="/explore" activeclassname="icons choosen_one">
					<img className="logo_nav" src={logo} />
				</NavLink>

				<div className="navs">
					<IconContext.Provider
						value={{
							color: "#F24E1E",
							size: "2em",
						}}
					>
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							<FaGrinAlt />
						</NavLink>
					</IconContext.Provider>

					<IconContext.Provider
						value={{
							color: "#F24E1E",
							size: "2em",
						}}
					>
						<NavLink
							to="/notification"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							<span>
								<FaRegBell />
							</span>
						</NavLink>
					</IconContext.Provider>

					<IconContext.Provider
						value={{
							color: "#F24E1E",
							size: "2em",
						}}
					>
						<NavLink
							to="/explore"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							<span>
								<FaSearch />
							</span>
						</NavLink>
					</IconContext.Provider>

					<IconContext.Provider
						value={{
							color: "#F24E1E",
							size: "2em",
						}}
					>
						<NavLink
							to="/chat"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							<span>
								<FaRocketchat />
							</span>
						</NavLink>
					</IconContext.Provider>
					<IconContext.Provider
						value={{
							color: "#F24E1E",
							size: "2em",
							className: "icons",
						}}
					>
						<NavLink to="/login" onClick={handleLogout}>
							<span>
								<FaDoorOpen />
							</span>
						</NavLink>
					</IconContext.Provider>
				</div>
			</div>
		</Wrapper>
	)
}

export default Nav
