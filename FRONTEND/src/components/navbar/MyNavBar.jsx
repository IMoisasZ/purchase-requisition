import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../container/MyContainer'
import MyAvatar from '../MyAvatar'
import LogoInjetaq from '../../images/logo_injetaq.jpg'
import style from './MyNavBar.module.css'
import { User } from '../../pages/context/userContext'

function MyNavBar() {
	const [showAvatar, setShowAvatar] = useState(false)
	const [avatar, setAvatar] = useState('')

	const navigate = useNavigate()

	const { userLogado } = useContext(User)

	const initials = (user) => {
		if (user) {
			const names = user.nome.split(' ')
			const nameAvatar =
				names[0].substring(0, 1) + '' + names[1].substring(0, 1)
			setAvatar(nameAvatar)
			setShowAvatar(true)
		}
	}

	useEffect(() => {
		initials(userLogado)
	}, [userLogado])

	const logOut = () => {
		alert(`Até a próxima ${userLogado.nome}`)
		localStorage.clear('user_log')
		setAvatar('')
		setShowAvatar(false)
		navigate('/login')
	}

	return (
		<Container
			minHeight='1vh'
			backgroundColor='#4682B4'
			color='white'
			hideIcon={true}
			hideH1={true}>
			<nav className={style.container}>
				<div className={style.div_logo}>
					<img
						src={LogoInjetaq}
						alt='Logo'
						title='Injetaq - Sistema de Solicitaçao de Compras'
					/>
				</div>
				{showAvatar && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							margin: '0',
							padding: 0,
						}}>
						<div className={style.div_avatar}>
							<MyAvatar title={`${userLogado.nome} - ${userLogado.role}`}>
								{avatar}
							</MyAvatar>
						</div>
						<div className={style.log_out}>
							<button title='Sair da aplicação!' onClick={logOut}>
								Sair
							</button>
						</div>
					</div>
				)}
			</nav>
		</Container>
	)
}
export default MyNavBar
