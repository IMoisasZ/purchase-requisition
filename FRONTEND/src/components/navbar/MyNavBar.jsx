import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../MyContainer'
import MyAvatar from '../MyAvatar'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import LogoInjetaq from '../../images/logo_injetaq.jpg'
import style from './MyNavBar.module.css'

function MyNavBar() {
	return (
		<Container minHeight='1vh' backgroundColor='#4682B4' color='white'>
			<nav className={style.container}>
				<div className={style.div_logo}>
					<Link className={style.link} to='/'>
						<img src={LogoInjetaq} alt='Logo' />
					</Link>
				</div>
				<div>
					<Link to='/menu'>
						<HomeSharpIcon style={{ fontSize: '3em', color: 'white' }} />
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
