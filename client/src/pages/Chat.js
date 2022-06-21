import React from "react"
import ChatHead from "../components/ChatHead/ChatHead"
import Nav from "../components/Nav/Nav"
import { Alert, Bar } from "../components"

function Chat() {
	const a = Array.from(Array(50).keys())

	return (
		<>
			<Bar title={"Chats"} />
			<div className="navbarr">
				<Nav current="Chat" />
			</div>
			<div className="container ml-28 w-4/5">
				<div className="flex flex-row flex-wrap pb-4">
					{a.map(element => {
						return (
							<div className="h-64 w-64 p-4 mb-9 mx-2">
								<ChatHead />
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Chat
