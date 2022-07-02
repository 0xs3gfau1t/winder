import React from "react"
import { AiFillTag, AiTwotoneCalendar } from "react-icons/ai"
import { BiMessageSquareDetail, BiRename } from "react-icons/bi"
import { BsGenderAmbiguous } from "react-icons/bs"
import { FaBook, FaUniversity } from "react-icons/fa"
import { MdSportsCricket } from "react-icons/md"
import { IconContext } from "react-icons"
import UserDetailsStyled from "../assets/wrappers/UserDetails"

const UserDetails = ({ user }) => {
	const {
		firstName,
		lastName,
		gender,
		username,
		university,
		program,
		batch,
		bio,
		passion,
	} = user

	return (
		<IconContext.Provider value={{ color: "#f24e1e", size: "2em" }}>
			<UserDetailsStyled>
				<div className="detail bio">
					<h1>Bio</h1>
					<span>{bio}</span>
				</div>
				<div className="detail academics">
					<h1>Academics</h1>
					<div className="uni">
						<p>
							Studies<span>{program}</span> at
							<span>{university}</span>
						</p>
					</div>
					<div className="batch">
						<p>
							Batch of <span>{batch}</span>
						</p>
					</div>
				</div>
				<div className="detail passions">
					<h1>Passions</h1>
					<div className="passion-container">
						{passion?.map((item, idx) => {
							return <span>{item}</span>
						})}
					</div>
					{/* <span>{passion}</span> */}
				</div>
			</UserDetailsStyled>
		</IconContext.Provider>
	)
}

export default UserDetails
