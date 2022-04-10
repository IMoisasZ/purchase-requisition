import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/MyContainer'
import MyAvatar from '../MyAvatar'
import LogoInjetaq from '../../images/logo_injetaq.jpg'
import style from './MyNavBar.module.css'

function MyNavBar() {
	return (
		<Container
			minHeight='1vh'
			backgroundColor='#4682B4'
			color='white'
			hideIcon={true}
			hideH1={true}>
			<nav className={style.container}>
				<div className={style.div_logo}>
					<Link className={style.link} to='/'>
						<img src={LogoInjetaq} alt='Logo' />
					</Link>
				</div>
				<div className={style.div_avatar}>
					<MyAvatar />
				</div>
			</nav>
		</Container>
	)
}

export default MyNavBar
