import React from 'react'
import Container from '@mui/material/Container'

export default function MyContainer({
	children,
	backgroundColor = '#fff',
	margin = '0',
	maxWidth = '100%',
	minHeight = '69vh',
	color = 'black',
	border,
}) {
	return (
		<>
			<Container
				style={{
					backgroundColor,
					margin,
					maxWidth,
					minHeight,
					color,
					border,
				}}
			>
				{children}
			</Container>
		</>
	)
}
