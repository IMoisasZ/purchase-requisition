import React from 'react'
import style from '../input/MyInput.module.css'

function MyInput({
	name,
	label,
	value,
	type,
	handleChange = null,
	handleBlur = null,
	placeholder,
	disable = false,
	width,
	hide = false,
	flexDirection = 'column',
	margin,
}) {
	return (
		<div className={style.container} style={{ flexDirection }}>
			<label htmlFor={name} style={{ margin }}>
				{label}
			</label>
			<input
				style={{ width }}
				id={name}
				name={name}
				value={value}
				type={type}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				disabled={disable}
				hidden={hide}
			/>
		</div>
	)
}

export default MyInput
