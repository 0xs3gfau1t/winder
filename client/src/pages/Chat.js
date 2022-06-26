import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Nav from "../components/Nav/Nav"
import { Bar, ChatBody, ChatHead } from "../components"
import { fetchChats } from "../actions/live"

function Chat() {
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()
	const a = Array.from(Array(50).keys())
	useEffect(() => {
		dispatch(fetchChats())
	}, [])
	const chatList = useSelector(state => state.live.chatList)
	return (
		<>
			<Bar title={"Chats"} />
			<div className="container ml-4">
				<div className="min-w-full border-4 rounded-xl lg:grid lg:grid-cols-3">
					<div className="border-r border-gray-300 lg:col-span-1">
						<h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">
							Chats
						</h2>
						<div className="overflow-auto h-[85vh]">
							{chatList.map((chat, index) => {
								return (
									<div key={index} className="chatContainer">
										<ChatHead chat={chat} />
									</div>
								)
							})}
						</div>
					</div>
					<div className="lg:col-span-2 lg:block">
						<ChatBody />
					</div>
				</div>
			</div>
		</>
	)
}

export default Chat
