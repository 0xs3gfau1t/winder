import React from "react"
import { useSelector } from "react-redux"

const Alert = ({ float = true }) => {
	const { alertMsg, alertType } = useSelector(state => state.misc)
	// console.log(alertMsg)
	return (
		<div
			className={`${
				!float ? "my-2" : "fixed w-1/3 top-8"
			} opacity-95 left-1/3 text-center drop-shadow-lg border px-4 py-2 rounded z-[100] alert-${alertType}`}
			role="alert"
		>
			<span className="block sm:inline">{alertMsg}</span>
			<span className="absolute top-0 bottom-0 right-0 px-4 py-2">X</span>
		</div>
	)
}

export default Alert
