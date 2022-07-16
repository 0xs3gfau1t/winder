import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

// Icons
import { IconContext } from "react-icons"
import { FaHeart } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { BsCheckLg } from "react-icons/bs"
import { ignoreUnliked, loadExplore, sendLike } from "../actions/explore"

// Components
import Carousel from "../components/Carousel"
import UserDetails from "../components/UserDetails"
import { Bar } from "../components"
import Alert from "../components/Alert"
import { ExploreSearch } from "../components/ExploreSearch"

// Styles
import ExploreStyled from "../assets/wrappers/Explore"

function Explore() {
	const misc = useSelector(state => state.misc)
	const users = useSelector(state => state.explore.users)
	const user = useSelector(state => state.auth.user)
	const current = useSelector(state => state.explore.current)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadExplore())
	}, [])

	const accept = e => {
		if (users[current]) dispatch(sendLike(users[current].id))
		else console.log("No user to accept.")
	}
	const ignore = e => {
		if (users[current]) dispatch(ignoreUnliked(users[current].id))
		else console.log("No user to ignore")
	}
	if (!user.email_verified) return <Navigate to="/profile" />
	if (!users[current]) {
		return (
			<>
				<ExploreStyled>
					<ExploreSearch />
				</ExploreStyled>
			</>
		)
	} else {
		return (
			<>
				<Bar title={"Explore"} />
				{misc.showAlert && <Alert />}
				<ExploreStyled>
					<div className="outer">
						<div className="carousel-wrapper">
							<Carousel
								imgs={
									users[current]?.images.map(
										item =>
											process.env.URL + "/image/" + item
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
					<IconContext.Provider
						value={{ color: "#743ad5", size: "2em" }}
					>
						<div className="actions">
							<span>
								<ImCross onClick={ignore} color="#eb1e07" />
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
}

export default Explore
