import React, { useState } from "react"
import Wrapper from "../assets/wrappers/NotificationPage"
import Nav from "../components/Nav/Nav"
import { Popup } from "../components"

function Notification() {
	const [popUp, setPopUP] = useState({
		type: "haha",
		content: "",
		time: "",
		read: false,
	})
	const [clicked, setClick] = useState(false)
	const dummyy = [
		{
			"type": 2,
			"content":
				"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
			"time": "10:37 AM",
			"read": "Female",
		},
		{
			"type": 1,
			"content": "Nullam molestie nibh in lectus. Pellentesque at nulla.",
			"time": "4:38 AM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
			"time": "8:20 PM",
			"read": "Male",
		},
		{
			"type": 1,
			"content":
				"Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
			"time": "7:57 PM",
			"read": "Female",
		},
		{
			"type": 2,
			"content":
				"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
			"time": "6:03 PM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
			"time": "12:23 PM",
			"read": "Male",
		},
		{
			"type": 1,
			"content":
				"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
			"time": "9:24 AM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
			"time": "4:02 PM",
			"read": "Female",
		},
		{
			"type": 0,
			"content":
				"Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.",
			"time": "2:52 PM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
			"time": "6:01 AM",
			"read": "Female",
		},
		{
			"type": 1,
			"content":
				"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
			"time": "9:24 AM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
			"time": "4:02 PM",
			"read": "Female",
		},
		{
			"type": 0,
			"content":
				"Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.",
			"time": "2:52 PM",
			"read": "Male",
		},
		{
			"type": 0,
			"content":
				"Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
			"time": "6:01 AM",
			"read": "Female",
		},
	]

	function handlePopup(element) {
		setClick(true)
		setPopUP({
			type: element.type,
			content: element.content,
			time: element.time,
			read: element.read,
		})
	}

	function handlePopupClose() {
		setClick(false)
	}

	return (
		<Wrapper>
			<div className="notifyArea">
				<div className="notifications">
					<h1>Notification</h1>
					<div className="Notification-card">
						{dummyy.map(element => {
							return (
								<div
									className="card"
									onClick={() => handlePopup(element)}
								>
									{element.content.slice(0, 100) + "..."}
									<div className="showTime">
										{element.time}
									</div>
								</div>
							)
						})}
						<Popup clicked={clicked}>
							<h2>{popUp.type}</h2>
							<span>{popUp.content}</span>
							<button
								className="close-btn"
								onClick={handlePopupClose}
							>
								Close
							</button>
						</Popup>
					</div>
				</div>

				<div className="navbarr">
					<Nav current="Notification" />
				</div>
			</div>
		</Wrapper>
	)
}

export default Notification
