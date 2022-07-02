import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Nav from "../components/Nav/Nav"
import { Bar, ChatBody, ChatHead } from "../components"
import { fetchChats } from "../actions/live"

function Chat() {
	const dispatch = useDispatch()
	const [activeChat, setActiveChat] = useState({})
	useEffect(() => {
		dispatch(fetchChats())
	}, [])
	const chatList = useSelector(state => state.live.chatList)

	const handleCurrent = (chat, relation) => {
		setActiveChat({ ...chat, relnID: relation })
	}
	return (
		<>
			<Bar title={"Chats"} />
			<div className="container ml-4">
				<div className="min-w-full border-4 rounded-xl lg:grid lg:grid-cols-3">
					<div className="border-r border-gray-300 lg:col-span-1">
						<h2 className="my-2 mb-2 ml-2 text-lg text-gray-600 border-b-2">
							Chats
						</h2>
						<div className="overflow-auto h-[80vh] scroll-smooth">
							{Object.keys(chatList).map(relation => {
								return (
									<div
										key={relation}
										className="chatContainer"
									>
										<ChatHead
											chat={chatList[relation]}
											relation={relation}
											onClick={handleCurrent}
										/>
									</div>
								)
							})}
						</div>
					</div>
					<div className="lg:col-span-2 lg:block">
						{activeChat.relnID && <ChatBody user={activeChat} />}
					</div>
				</div>
			</div>
		</>
	)
}

export default Chat
