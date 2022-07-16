import React from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { GoX } from "react-icons/go"

const ImageUpload = ({ settings, removePic }) => {
	return (
		<>
			{!settings.isDP && (
				<div className="flex border-2 m-4">
					{settings.preview2 ? (
						<div className="border-2 rounded-xl border-amber-900">
							<span
								className="absolute mt-4 ml-2 w-4 h-4 bg-black text-white"
								onClick={e => removePic(e, "uploadPic")}
							>
								<GoX />
							</span>
							<img
								src={settings.preview2}
								className="h-58 w-58"
							/>
						</div>
					) : (
						<>
							<label className="" htmlFor="upload2">
								<AiOutlinePlus className="mx-20 my-24 h-10 w-20" />
								<span className="absolute -mt-24 mx-20">
									Add Photo
								</span>
							</label>
							<input
								className="hidden"
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
