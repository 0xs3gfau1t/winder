import React, { useEffect, useState } from "react"
import axios from "axios"

import Wrapper from "../assets/wrappers/NotificationPage"
import Nav from "../components/Nav/Nav"

import { Popup, Bar } from "../components"
import { NOTI_URL } from "../urls"

function Notification() {
	const [popUp, setPopUP] = useState({})
	const [clicked, setClick] = useState(false)
	const [notis, setNotis] = useState([])

	useEffect(() => {
		async function _() {
			await axios
				.get(NOTI_URL, { withCredentials: true })
				.then(res => res.data.data)
				.then(res => setNotis(res))
		}
		_()
	}, [])

	function handlePopup(element) {
		axios
			.get(`${NOTI_URL}/${element._id}`, { withCredentials: true })
			.then(res => {
				if (res.data.success) {
					setClick(true)
					setPopUP(res.data.notification)
				}
			})
	}

	function handlePopupClose() {
		setClick(false)
		setNotis(oldnotis => {
			return oldnotis.filter(noti => noti._id !== popUp._id)
		})
	}

	return (
		<Wrapper>
			<Bar title={"Notifications"} />
			<div className="notifyArea">
				<div className="notifications">
					<div className="Notification-card">
						{notis.length > 0 ? (
							notis.map(element => {
								return (
									<div
										key={element._id}
										className="card"
										onClick={() => handlePopup(element)}
									>
										{element.title}
										<div className="showTime">
											{new Date(
												element.createdAt
											).toLocaleString(undefined, {
												year: "2-digit",
												month: "short",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
									</div>
								)
							})
						) : (
							<h5 className="h-[80vh] place-items-center grid">
								Ohh man!
								<br /> We got no more good news for you.
							</h5>
						)}
						<Popup
							setClick={setClick}
							clicked={clicked}
							close={handlePopupClose}
						>
							<h2>{popUp.title}</h2>
							<span>{popUp.content}</span>
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
