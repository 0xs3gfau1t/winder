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

	console.log("Rendering explore")

	useEffect(() => {
		dispatch(loadExplore())
	}, [])

	const accept = e => {
		console.log("Pressed like")
		dispatch(sendLike(users[current].id))
	}

	return (
		<>
			<div className="navbarr">
				<Nav current="Explore" />
			</div>
			{misc.showAlert && <Alert />}
			<ExploreStyled>
				<div className="carousel-wrapper">
					<Carousel
						imgs={
							users[0]?.images.map(
								item => process.env.URL + "/image/" + item
							) || []
						}
					/>
				</div>
				<div className="outer">
					<div className="details">
						<UserDetails user={users[0] || {}} />
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
