import React from 'react'
import style from '../../components/message/Message.module.css'

function Message({ children, type, width = '29em', height = '2em' }) {
	if (type === 'edit') {
		return (
			<div
				className={style.container}
				style={{ backgroundColor: '#FF8C00', color: 'white', height, width }}>
				<p>{children}</p>
			</div>
		)
	} else {
		return (
			<div
				className={style.container}
				style={
					type === 'error'
						? { backgroundColor: '#8b0000', color: 'white', height, width }
						: { backgroundColor: '#006400', color: 'white', height, width }
				}>
				<p>{children}</p>
			</div>
		)
	}
}

export default Message
