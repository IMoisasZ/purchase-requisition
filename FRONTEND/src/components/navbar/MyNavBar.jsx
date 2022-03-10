import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../MyContainer'
import MyAvatar from '../MyAvatar'
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

				<div className={style.div_list}>
					<ul>
						<li>
							<Link className={style.link} to='/cadastros'>
								Cadastros
							</Link>
						</li>
						<li>
							<Link className={style.link} to='/requisicao'>
								Requisição
							</Link>
						</li>
						<li>
							<Link className={style.link} to='/consultas_relatorios'>
								Consultas/Relatórios
							</Link>
						</li>
					</ul>
				</div>
				<div className={style.div_avatar}>
					<MyAvatar />
				</div>
			</nav>
		</Container>
	)
}

export default MyNavBar
