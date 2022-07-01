import React from "react"
import Wrapper from "../assets/wrappers/PopupPage"

function Popup({ clicked, children }) {
	return clicked ? (
		<Wrapper>
			<div className="popup">
				<div className="popup-inner">{children}</div>
			</div>
		</Wrapper>
	) : (
		""
	)
}

export default Popup
