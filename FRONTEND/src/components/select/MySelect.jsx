import React from 'react'
import style from '../select/MySelect.module.css'

function MySelect({
	text,
	name,
	value = '',
	handleChange,
	children,
	initial_text,
	width = '24.5em',
	height = '2.5em',
	disable = false,
}) {
	return (
		<div className={style.container}>
			<label>{text}</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				disabled={disable}
				style={{
					width,
					height,
					border: '2px solid black',
					borderRadius: '0.3em',
				}}>
				<option>{initial_text}</option>
				{children}
			</select>
		</div>
	)
}

export default MySelect
