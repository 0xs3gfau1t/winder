import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchActiveChat, sendMessage } from "../actions/live"
import { BiSend } from "react-icons/bi"
import { IconContext } from "react-icons"
import { Other, Own } from "./Messages"

const ChatBody = ({ user }) => {
	const data = {
		dp: "https://thispersondoesnotexist.com/image",
	}
	const [message, setMessage] = useState("")
	const activeChat = useSelector(state => state.live.activeChat)
	const ref = useRef(null)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchActiveChat(user.id))
	}, [])

	useEffect(() => {
		if (activeChat.live) {
			ref.current.scrollTop = ref.current.scrollHeight
		} else ref.current.scrollTop += 77
	}, [activeChat])

	const sendChat = e => {
		if (message.trim != "") dispatch(sendMessage(message, activeChat.id))
		setMessage("")
	}

	const enterKey = e => {
		if (e.key === "Enter") {
			sendChat(e)
		}
	}

	const observer = useRef()
	const topChatRef = useCallback(
		node => {
			if (activeChat.loading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && activeChat.more) {
					dispatch(fetchActiveChat(activeChat.id, activeChat.more))
				}
			})
			if (node) observer.current.observe(node)
		},
		[activeChat.loading, activeChat.more]
	)

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
				<div
					ref={ref}
					className="relative w-full p-6 overflow-y-auto justify-end h-[70vh]"
				>
					<ul className="space-y-2">
						{activeChat.data.map((message, index) => {
							return (
								<div
									key={index}
									ref={index == 0 ? topChatRef : null}
								>
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
						placeholder="Type here to send..."
						className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
						name="message"
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyPress={e => enterKey(e)}
						required
					/>
					<button type="submit" onClick={sendChat}>
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
