import React from "react"
import { BiSend } from "react-icons/bi"
import { IconContext } from "react-icons"

const ChatBody = () => {
	const activeChat = {
		name: "Someone Someone",
		dp: "https://thispersondoesnotexist.com/image",
	}
	return (
		<>
			<div className="w-full">
				<div className="relative flex items-center p-3 border-b border-gray-300">
					<img
						className="object-cover w-10 h-10 rounded-full"
						src={activeChat.dp}
						alt="username"
					/>
					<span className="block ml-2 font-bold text-gray-600">
						{activeChat.name}
					</span>
				</div>
				<div className="relative w-full p-6 overflow-y-auto h-[70vh]">
					<ul className="space-y-2">
						<li className="flex justify-start">
							<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
								<span className="block">Hi</span>
							</div>
						</li>
						<li className="flex justify-end">
							<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
								<span className="block">Hiiii</span>
							</div>
						</li>
						<li className="flex justify-end">
							<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
								<span className="block">how are you?</span>
							</div>
						</li>
						<li className="flex justify-start">
							<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
								<span className="block">
									Lorem ipsum dolor sit, amet consectetur
									adipisicing elit.
								</span>
							</div>
						</li>
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
