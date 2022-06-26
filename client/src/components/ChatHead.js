import React from "react"

function ChatHead(chat) {
	const data = {
		name: "Ram Singh Pandey",
		lastMsg: "O hency, K xa khabar",
		lastTime: "3h",
		dp: "https://thispersondoesnotexist.com/image",
	}

	return (
		<div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
			<img
				className="object-cover w-10 h-10 rounded-full"
				src={data.dp}
				alt={data.name}
			/>
			<div className="w-full pb-2">
				<div className="flex justify-between">
					<span className="block ml-2 font-semibold text-gray-600">
						{data.name}
					</span>
					<span className="block ml-2 text-sm text-gray-600">
						{data.lastTime}
					</span>
				</div>
				<span className="block ml-2 text-sm text-gray-600">
					{data.lastMsg}
				</span>
			</div>
		</div>
	)
}

export default ChatHead
