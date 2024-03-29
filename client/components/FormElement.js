import React from "react"

const FormText = ({ type, name, value, handleChange, labelText }) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>

			<input
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input"
			/>
		</div>
	)
}

const FormSelect = ({ name, options = [], defaultV, hint }) => {
	return (
		<select
			name={name}
			onChange={onchange}
			className="py-1 px-4 bg-slate-800 text-white text-base h-8 capitalize cursor-pointer"
		>
			<option value="" hidden={!defaultV} className="bg-blue-500">
				{defaultV ? defaultV : hint || "Select one"}
			</option>
			{options.map((opt, index) => (
				<option key={index} value={opt} className="capitalize">
					{opt}
				</option>
			))}
		</select>
	)
}

export default FormText
export { FormSelect }
