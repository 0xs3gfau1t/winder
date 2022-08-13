import React from "react"
import { NavLink } from "react-router-dom"

const ExploreSearch = props => {
	return (
		<div className="h-[80vh] place-items-center grid">
			<div className="scan_container">
				<div className="scan">
					<p className="animate-character ">
						No users found for your choice right now.
						<br />
						Change your preferences to see more.
					</p>
				</div>
				<NavLink to="/profile">
					<div className="goto-profile">Change Preferences</div>
				</NavLink>
			</div>
		</div>
	)
}

export { ExploreSearch }
