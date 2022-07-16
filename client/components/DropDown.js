import React, { useState } from "react"
import DropDownStyled from "../assets/wrappers/DropDown"

const DropDown = ({ options }) => {
	const [open, setOpen] = useState(false)

	const toggle = e => {
		setOpen(o => !o)
	}

	return (
		<DropDownStyled>
			<button className="toggler" onClick={toggle}>
				⋮
			</button>
			<div className={`items ${open && "items--active"}`}>
				{options.map((item, _) => (
					<div key={_} className="item" onClick={item[1]}>
						{item[0]}
					</div>
				))}
			</div>
		</DropDownStyled>
	)
}

export default DropDown
