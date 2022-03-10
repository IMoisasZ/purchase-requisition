import React from 'react'
import style from '../checkBox/MyCheckBox.module.css'

function MyCheckBox({ name, label, value, togleChange, checked = true }) {
	return (
		<div className={style.container}>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				value={value}
				type='checkbox'
				onChange={togleChange}
				checked={checked}
			/>
		</div>
	)
}

export default MyCheckBox
