import React from "react"
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai"

const ImageUpload = ({ settings, removePic }) => {
	return (
		<>
			{!settings.isDP && (
				<div className="flex h-50 w-52 border-2 m-4">
					{settings.preview2 ? (
						<>
							<label
								className="absolute w-4 h-4 bg-black text-white"
								htmlFor="upload2"
								onClick={removePic}
							>
								<AiOutlineClose />
							</label>
							<img src={settings.preview2} />
						</>
					) : (
						<>
							<label className="" htmlFor="upload2">
								<AiOutlinePlus className="mx-16 my-24 h-10 w-20" />
							</label>
							<input
								id="upload2"
								type="file"
								accept="image/*"
								name="images"
							/>
						</>
					)}
				</div>
			)}
		</>
	)
}

export default ImageUpload
