import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Nav from "../components/Nav/Nav"
import { Bar } from "../components"

function Profile() {
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()

	useEffect(() => {})

	return (
		<>
			<Bar title={"Chats"} />
			<Nav current="Settings" />
			<div className="container mx-2 border-2 w-4/5">
				<div className="flex flex-row flex-wrap">
					<aside className="w-full sm:w-1/3 md:w-1/4 border-2 rounded-md h-screen">
						<div className="sticky top-0 p-2 w-full profile-form">
							Asided
						</div>
					</aside>
					<main
						role="main"
						className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
					>
						Main
					</main>
				</div>
			</div>
		</>
	)
}

export default Profile
