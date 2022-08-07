import React from "react"
import { IMAGE_URL } from "../urls"

function ChatHead({ chat, onClick, relation }) {
	const data = {
		dp: "https://thispersondoesnotexist.com/image",
	}

	return (
		<div
			onClick={e => onClick(chat, relation)}
			className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-blue-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
		>
			<img
				className="object-cover w-10 h-10 rounded-full"
				src={"userDp" in chat ? IMAGE_URL + chat.userDp : data.dp}
				alt={chat.userName}
			/>
			<div className="hidden lg:block w-full pb-2">
				<div className="flex justify-between">
					<span className="block ml-2 font-semibold text-gray-600">
						{chat.userName}
					</span>
					{chat.unreadCount > 0 && (
						<span className="text-center px-1 font-bold bg-green-600 text-white rounded-full text-xs">
							{chat.unreadCount}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChatHead
