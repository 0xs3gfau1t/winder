import React from "react"
import { Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo } from "../components"
import landing from "../assets/images/landing-alt.svg"

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="containerM w-4/5 page">
				<div className="info">
					<h1>WINDER</h1>
					<p className="tagline">
						Where you meet your <span>Soulmate</span>
					</p>
					<p>
						Experience a social media site where you can find like minded people
						sharing your interests, academically or maybe not. Join now and find new
						friends from various university and their programs. Create an account
						and start looking for your <i>perfect half</i>. You know what we mean.<br></br>
						Happy windering.
					</p>
					<Link to="/login" className="btn btn-hero">
						Login/Register
					</Link>
				</div>
				<img src={landing} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	)
}

export default Landing
