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
	width,
	hide = false,
}) {
	return (
		<div className={style.container}>
			<label htmlFor={name}>{label}</label>
			<input
				style={{ width }}
				id={name}
				name={name}
				value={value}
				type={type}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disable}
				hidden={hide}
			/>
		</div>
	)
}

export default MyInput
