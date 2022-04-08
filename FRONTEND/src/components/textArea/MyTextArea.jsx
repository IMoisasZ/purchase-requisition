import React, { Children } from 'react'

function MyTextArea({
	children,
	name,
	placeHolder,
	handleChange,
	text = 'Name label text area',
	cols = '30',
	rows = '10',
	value,
	height,
}) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				height,
			}}>
			<label htmlFor={name}>{text}</label>
			<textarea
				style={{ resize: 'none', borderRadius: '0.3em' }}
				name={name}
				id={name}
				cols={cols}
				rows={rows}
				placeholder={placeHolder}
				onChange={handleChange}
				value={value}>
				{children}
			</textarea>
		</div>
	)
}

export default MyTextArea
