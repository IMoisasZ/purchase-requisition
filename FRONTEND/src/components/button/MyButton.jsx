import React from 'react'
import style from './MyButton.module.css'

export default function MyButton({
	children,
	type = 'button',
	handleClick,
	value,
	disable = false,
	height = '3em',
	width = '6em',
	marginTop,
	fontSize = '1.5rem',
	border,
	hide = false,
	title = '',
}) {
	return (
		<div className={style.container}>
			<button
				className={style.button}
				type={type}
				value={value}
				disabled={disable}
				onClick={handleClick}
				hidden={hide}
				title={title}
				style={{ height, width, marginTop, fontSize, border }}>
				{children}
			</button>
		</div>
	)
}
