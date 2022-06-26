import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchActiveChat } from "../actions/live"
import { BiSend } from "react-icons/bi"
import { IconContext } from "react-icons"
import { Other, Own } from "./Messages"
const ChatBody = ({ user }) => {
	const data = {
		name: "Someone Someone",
		dp: "https://thispersondoesnotexist.com/image",
	}
	const activeChat = useSelector(state => state.live.activeChat)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchActiveChat(user.id))
	}, [])
	return (
		<>
			<div className="w-full">
				<div className="relative flex items-center p-3 border-b border-gray-300">
					<img
						className="object-cover w-10 h-10 rounded-full"
						src={user.dp ? data.dp : data.dp}
						alt={user.userName}
					/>
					<span className="block ml-2 font-bold text-gray-600">
						{user.userName}
					</span>
				</div>
				<div className="relative w-full p-6 overflow-y-auto justify-end h-[70vh]">
					<ul className="space-y-2">
						{activeChat.map((message, index) => {
							return (
								<div key={index}>
									{message.sender ? (
										<Own text={message.content} />
									) : (
										<Other text={message.content} />
									)}
								</div>
							)
						})}
					</ul>
				</div>

				<div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
					<input
						type="text"
						placeholder="Message"
						className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
						name="message"
						required
					/>
					<button type="submit">
						<IconContext.Provider
							value={{ color: "#f24e1e", size: "2em" }}
						>
							<BiSend />
						</IconContext.Provider>
					</button>
				</div>
			</div>
		</>
	)
}

export default ChatBody
