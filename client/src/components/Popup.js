import React from "react"
import Wrapper from "../assets/wrappers/PopupPage"

function Popup({ clicked, handlePopupClose, children }) {
	return clicked ? (
		<Wrapper>
			<div className="popup">
				<div className="popup-inner">
					{children}
					<button className="close-btn" onClick={handlePopupClose}>
						Close
					</button>
				</div>
			</div>
		</Wrapper>
	) : (
		""
	)
}

export default Popup
