import React from 'react'
import style from './MyButton.module.css'

export default function MyButton({
	children,
	type = 'button',
	handleClick,
	value,
	height = '3em',
	width = '6em',
	marginTop,
	fontSize = '1.5rem',
	border,
}) {
	return (
		<div className={style.container}>
			<button
				className={style.button}
				type={type}
				value
				onClick={handleClick}
				style={{ height, width, marginTop, fontSize, border }}>
				{children}
			</button>
		</div>
	)
}
