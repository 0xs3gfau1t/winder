import React from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { GoX } from "react-icons/go"

const ImageUpload = ({ settings, removePic }) => {
	return (
		<>
			{!settings.isDP && (
				<div className="flex h-50 w-52 border-2 m-4">
					{settings.preview2 ? (
						<>
							<span
								className="absolute mt-4 ml-2 w-4 h-4 bg-black text-white"
								onClick={e => removePic(e, "uploadPic")}
							>
								<GoX />
							</span>
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
