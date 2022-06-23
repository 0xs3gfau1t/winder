import React, { useState, useEffect } from "react"
import Nav from "../components/Nav/Nav"
import { FaArrowLeft, FaHeart, FaArrowRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { IconContext } from "react-icons"
import Wrapper from "../assets/wrappers/ExplorePage"
import { loadExplore } from "../actions/explore"

function Explore() {
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadExplore())
	}, [])

	const [d_data, setData] = useState({
		image_url:
			"https://scontent.fktm10-1.fna.fbcdn.net/v/t1.6435-9/92812065_620379468512336_5237467155796066304_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGFuCKdCCc-Gxb-zbABlPdqoJ4gySf6ayGgniDJJ_prIWTuy518pJrPTL94dPToU6EPSx8LV9QqEU7n_PGlpEQH&_nc_ohc=31N-JcUUcS8AX_FbYpi&_nc_ht=scontent.fktm10-1.fna&oh=00_AT_JMonzIhHYxOg2LMUmKgaiyFJbuNyxH4Jtr5I4NCSXlQ&oe=62C47AAF",
		name: "Hari Parsad Baral",
		batch: "BCT062",
		age: 50,
		hobbies: ["Ghutka", "Jpt Padaune", "Framework"],
		university: "Pashchimanchal Campus",
	})
	if (misc.showAlert) return <Navigate to="/profile" />
	return (
		<Wrapper>
			<div>
				<h1>Explore</h1>

				<div className="Container">
					<div className="Gallery">
						<img
							className="user_img"
							src={d_data.image_url}
							height="50%"
							width="20%"
						/>
					</div>

					<div className="Details_and_Controls">
						<div className="Details">
							<h2>{d_data.name}</h2>
							<h3>{d_data.batch}</h3>
							<h3>{d_data.age}</h3>
							<div className="hobbies">
								{d_data.hobbies.map(hobby => (
									<h3 className="hobby">{hobby}</h3>
								))}
							</div>
							<h3>{d_data.university}</h3>
						</div>

						<IconContext.Provider
							value={{ color: "#F24E1E", size: "2em" }}
						>
							<div className="Controls">
								<div className="Previous">
									<FaArrowLeft />
								</div>
								<div className="Heart">
									<FaHeart />
								</div>
								<div className="Next">
									<FaArrowRight />
								</div>
							</div>
						</IconContext.Provider>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Explore
