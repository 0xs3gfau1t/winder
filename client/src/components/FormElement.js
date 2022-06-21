import React from "react"

const FormText = ({ type, name, value, handleChange, labelText }) => {
	return (
		<div className="form-row">
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
		<select name={name} onChange={onchange} className="h-9">
			<option value="" hidden={!defaultV}>
				{defaultV ? defaultV : hint || "Select one"}
			</option>
			{options.map((opt, index) => (
				<option key={index} value={opt}>
					{opt}
				</option>
			))}
		</select>
	)
}

export default FormText
export { FormSelect }
