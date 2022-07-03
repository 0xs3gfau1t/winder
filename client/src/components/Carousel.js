import React, { useEffect, useState } from "react"
import { IconContext } from "react-icons"
import { FaArrowLeft, FaArrowRight, FaCircle } from "react-icons/fa"

import CarouselStyled from "../assets/wrappers/Carousel"
import DropDown from "./DropDown"

const Carousel = ({ imgs, width, height, options = [], user }) => {
	const [current, setCurrent] = useState(0)
	const download = async () => {
		const image = await fetch(imgs[current])
		const imageURL = URL.createObjectURL(await image.blob())

		const el = document.createElement("a")
		el.href = imageURL
		el.download = imgs[current].split("/")[4] + ".jpg"
		document.body.appendChild(el)
		el.click()
		document.body.removeChild(el)
	}

	const moveLeft = () =>
		setCurrent(current => {
			return current === 0 ? imgs.length - 1 : current - 1
		})
	const moveRight = () =>
		setCurrent(current => {
			return current === imgs.length - 1 ? 0 : current + 1
		})

	useEffect(() => {
		setCurrent(0)
	}, [imgs])

	return (
		<CarouselStyled width={width} height={height} len={imgs.length}>
			<div className="carousel-items">
				{imgs.map((item, idx) => (
					<img
						src={item}
						key={idx}
						className={`carousel-item ${
							idx === current ? "active" : ""
						}`}
					/>
				))}
			</div>
			<IconContext.Provider value={{ color: "white", size: "2rem" }}>
				<div className="name">
					<div className="firstName">{user?.firstName}</div>
					<div className="lastName">{user?.lastName}</div>
					{
						user?.dob ? 
							<div className="age"><FaCircle size={".3em"} color={"#ff3c00"}/>{user?.dob || "?"}</div>: ''
					}
				</div>
				<button
					className="carousel-control carousel-control--left"
					onClick={moveLeft}
				>
					<div className="control-icon">
						<FaArrowLeft />
					</div>
				</button>
				<button
					className="carousel-control carousel-control--right"
					onClick={moveRight}
				>
					<div className="control-icon">
						<FaArrowRight />
					</div>
				</button>
			</IconContext.Provider>
			<div className="header">
				<div className="indicator">
					{imgs.map((_, idx) => (
						<button
							key={idx}
							className={`indicator-btn ${
								idx === current ? "indicator-btn--active" : ""
							}`}
						></button>
					))}
				</div>
				<div className="context-menu">
					<DropDown options={[...options, ["Download", download]]} />
				</div>
			</div>
		</CarouselStyled>
	)
}

export default Carousel
