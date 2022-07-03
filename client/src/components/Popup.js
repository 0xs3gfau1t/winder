import React from "react"
import Wrapper from "../assets/wrappers/PopupPage"
import {FaWindowClose} from 'react-icons/fa'


function Popup({ clicked, close, children }) {
	return clicked ? (
		<Wrapper>
			<div className="popup">
				<div className="popup-inner">
					{children}
					<button className="close-btn" onClick={close}>
						<FaWindowClose/>
					</button>
				</div>
			</div>
		</Wrapper>
	) : (
		""
	)
}

export default Popup
