import React from 'react'
import style from '../input/MyInput.module.css'

function MyInput({
	name,
	label,
	value,
	type,
	handleChange,
	placeholder,
	disable = false,
}) {
	return (
		<div className={style.container}>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				value={value}
				type={type}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disable}
			/>
		</div>
	)
}

export default MyInput
