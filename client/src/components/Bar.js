import React from "react"
import { useSelector } from "react-redux"

const Bar = ({ title }) => {
	// console.log(alertMsg)
	return (
		<div className="sticky top-0 w-full bg-black">
			<h4 className="text-center text-white mx-10 py-1">{title}</h4>
		</div>
	)
}

export default Bar
