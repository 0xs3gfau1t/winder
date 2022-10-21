import React from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../actions/auth"
import logo from "../../assets/images/logo-head.png"
import Wrapper from "../../assets/wrappers/NavPage"
import {
	FaSearch,
	FaGrinAlt,
	FaRegBell,
	FaRocketchat,
	FaDoorOpen,
} from "react-icons/fa"
import { IconContext } from "react-icons"

function Nav() {
	const live = useSelector(state => state.live)
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout())
	}
	if (!isAuthenticated) return <></>
	return (
		<Wrapper className="Navbar">
			<div className="Navbar">
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

						<NavLink
							to="/chat"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							{live.chat > 0 && (
								<span className="badge">{live.chat}</span>
							)}
							<span>
								<FaRocketchat />
							</span>
						</NavLink>

						<NavLink
							to="/explore"
							activeclassname="icons choosen_one"
						>
							<img className="logo_nav" src={logo} />
						</NavLink>

						<NavLink
							to="/notification"
							className={({ isActive }) =>
								isActive ? "iconse choosen_one" : "icons"
							}
						>
							{live.noti > 0 && (
								<span className="badge">{live.noti}</span>
							)}
							<span>
								<FaRegBell />
							</span>
						</NavLink>

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
