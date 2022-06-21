import React from "react"
import Wrapper from "../../assets/wrappers/ChatHeadPage"

function ChatHead() {
	const image_url = "https://thispersondoesnotexist.com/image"

	return (
		<Wrapper>
			<div>
				<div className="chatSmthIForgetName rounded-md">
					<img src={image_url} />
					<div className="chatPersonDetails">
						<p>AnuRadha Maiyaa</p>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default ChatHead
