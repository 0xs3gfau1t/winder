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
				<div className="detail">
					<AiFillTag />
					<span>{username}</span>
				</div>
				<div className="detail">
					<BiRename />
					<span>
						{firstName} {lastName}
					</span>
				</div>
				<div className="detail">
					<BsGenderAmbiguous />
					<span>{gender}</span>
				</div>
				<div className="detail">
					<FaUniversity />
					<span>{university}</span>
				</div>
				<div className="detail">
					<FaBook />
					<span>{program}</span>
				</div>
				<div className="detail">
					<AiTwotoneCalendar />
					<span>{batch}</span>
				</div>
				<div className="detail">
					<BiMessageSquareDetail />
					<span>{bio}</span>
				</div>
				<div className="detail">
					<MdSportsCricket />
					<span>
						[
						{passion?.map((item, idx) => {
							return (idx === 0 ? "" : ", ") + item
						})}
						]
					</span>
					{/* <span>{passion}</span> */}
				</div>
			</UserDetailsStyled>
		</IconContext.Provider>
	)
}

export default UserDetails
