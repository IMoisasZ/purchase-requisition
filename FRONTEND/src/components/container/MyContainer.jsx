import React from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import style from './MyContainer.module.css'

export default function MyContainer({
	children,
	backgroundColor = '#fff',
	margin = '0',
	maxWidth = '100%',
	width = '100%',
	minHeight = '69vh',
	color = 'black',
	border,
	padding,
	hideIcon = false,
	hideH1 = false,
	nameH1 = 'digite o nome do h1',
}) {
	return (
		<>
			<Container
				style={{
					backgroundColor,
					margin,
					maxWidth,
					width,
					minHeight,
					color,
					border,
					padding,
				}}>
				<div className={style.container} hidden={hideIcon}>
					<Link to='/menu'>
						<HomeOutlinedIcon titleAccess='Voltar para home!' />
					</Link>
				</div>
				<h1 style={{ textAlign: 'center', margin: '0' }} hidden={hideH1}>
					{nameH1}
				</h1>
				{children}
			</Container>
		</>
	)
}
