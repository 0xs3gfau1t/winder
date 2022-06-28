import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Icons
import { IconContext } from "react-icons"
import { FaHeart } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { BsCheckLg } from "react-icons/bs"
import { loadExplore, sendLike } from "../actions/explore"

// Components
import Carousel from "../components/Carousel"
import UserDetails from "../components/UserDetails"
import Nav from "../components/Nav/Nav"
import { Alert } from "../components"

// Styles
import ExploreStyled from "../assets/wrappers/Explore"

function Explore() {
	const misc = useSelector(state => state.misc)
	const users = useSelector(state => state.explore.users)
	const current = useSelector(state => state.explore.current)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadExplore())
	}, [])

	const accept = e =>
		(users[current] && dispatch(sendLike(users[current].id))) ||
		console.log("No user to accept.")

	if (misc.showAlert) return <Navigate to="/profile" />
	return (
		<>
			<div className="navbarr">
				<Nav current="Explore" />
			</div>
			<ExploreStyled>
				<div className="carousel-wrapper">
					<Carousel
						imgs={
							users[current]?.images.map(
								item => process.env.URL + "/image/" + item
							) || [
								"https://via.placeholder.com/300/000000/FFFFFF/?text=No+Images+To+Load",
							]
						}
					/>
				</div>
				<div className="outer">
					<div className="details">
						<UserDetails user={users[current] || {}} />
					</div>
					<IconContext.Provider
						value={{ color: "green", size: "2em" }}
					>
						<div className="actions">
							<ImCross />
							<FaHeart />
							<BsCheckLg onClick={accept} />
						</div>
					</IconContext.Provider>
				</div>
			</ExploreStyled>
		</>
	)
}

export default Explore
