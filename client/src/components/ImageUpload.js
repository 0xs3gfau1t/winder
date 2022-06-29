import React from "react"
import { AiOutlinePlus } from "react-icons/ai"

const ImageUpload = ({ settings }) => {
	return (
		<>
			<div className="flex h-50 w-52 border-2 m-4">
				{!settings.preview2 && (
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
				{settings.preview2 && <img src={settings.preview2} />}
			</div>
		</>
	)
}

export default ImageUpload
