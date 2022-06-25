import React, { useState } from "react"
import { IconContext } from "react-icons"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import CarouselStyled from "../assets/wrappers/Carousel"

const Carousel = ({ imgs, width, height }) => {
	const [current, setCurrent] = useState(0)
	const moveLeft = () =>
		setCurrent(current => {
			return current === 0 ? imgs.length - 1 : current - 1
		})
	const moveRight = () =>
		setCurrent(current => {
			return current === imgs.length - 1 ? 0 : current + 1
		})

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
		</CarouselStyled>
	)
}

export default Carousel
