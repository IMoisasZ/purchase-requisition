import React from 'react'
import Container from '@mui/material/Container'

export default function MyContainer({
	children,
	backgroundColor = '#fff',
	margin = '1rem auto',
	maxWidth = '100%',
	minHeight = '61.3vh',
	color = 'black',
	border,
}) {
	return (
		<Container
			style={{
				backgroundColor,
				margin,
				maxWidth,
				minHeight,
				color,
				border,
			}}>
			{children}
		</Container>
	)
}
