import React from "react"
import { useSelector } from "react-redux"

const Bar = ({ title }) => {
	// console.log(alertMsg)
	return (
		<div className=" w-full bg-black">
			<h4 className="text-white mx-10">{title}</h4>
		</div>
	)
}

export default Bar
