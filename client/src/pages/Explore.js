import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

// Icons
import { IconContext } from "react-icons"
import { FaHeart } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { BsCheckLg } from "react-icons/bs"
import { loadExplore, sendLike } from "../actions/explore"

// Components
import Carousel from "../components/Carousel"
import UserDetails from "../components/UserDetails"
import { Bar } from "../components"

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
			<Bar title={"Explore"} />
			<ExploreStyled>
				<div className="outer">
					<div className="carousel-wrapper">
						<Carousel
							imgs={
								users[current]?.images.map(
									item => process.env.URL + "/image/" + item
								) || [
									"https://via.placeholder.com/300/000000/FFFFFF/?text=No+Images+To+Load",
								]
							}
							user={users[current]}
						/>
					</div>
					<div className="details">
						<UserDetails user={users[current] || {}} />
					</div>
				</div>
				<IconContext.Provider value={{ color: "#743ad5", size: "2em" }}>
					<div className="actions">
						<span>
							<ImCross color="#eb1e07" />
						</span>
						<span>
							<FaHeart color="#ab0a73" />
						</span>
						<span>
							<BsCheckLg onClick={accept} color="#0dbd4b" />
						</span>
					</div>
				</IconContext.Provider>
			</ExploreStyled>
		</>
	)
}

export default Explore
