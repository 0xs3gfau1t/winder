import React from "react"
import { useSelector } from "react-redux"

const SaveChanges = ({ onSubmit }) => {
	// console.log(alertMsg)
	return (
		<div className="sticky bottom-1 flex  justify-center space-x-2">
			<div className="rounded h-9 items-center text-center text-slate-50 bg-sky-900 w-1/2 py-1">
				Changes Made!{" "}
				<button className="mx-2 bg-black rounded p-1">
					Save Changes
				</button>
			</div>
		</div>
	)
}

export default SaveChanges
