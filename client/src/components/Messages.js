import React from "react"

const Other = ({ text }) => {
	return (
		<li className="flex justify-start">
			<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
				<span className="block">{text}</span>
			</div>
		</li>
	)
}

const Own = ({ text }) => {
	return (
		<li className="flex justify-end">
			<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-blue-200 rounded shadow">
				<span className="block">{text}</span>
			</div>
		</li>
	)
}
export { Own, Other }
