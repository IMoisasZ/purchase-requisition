import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Button from '../../components/button/MyButton'
import style from './Home.module.css'
import api from '../../api/api'

function Home() {
	const navigate = useNavigate()
	const handleDefault = async () => {
		try {
			const result = await api.get('/user')
			console.log(result.data.length === 0)
			if (result.data.length === 0) {
				await api.post('/sector', {
					sector: 'ADMINISTRACAO',
					actived: true,
				})
				await api.post('/role', {
					role: 'MASTER',
					actived: true,
				})
				await api.post('/user', {
					name: 'MOISES',
					last_name: 'SANTOS',
					sector_id: 1,
					role_id: 1,
					responsable_id: null,
					email: 'devimoisasz@gmail.com',
					password: '123456',
					confirm_password: '123456',
					actived: true,
				})
				navigate('/login')
			}
			navigate('/login')
		} catch (error) {
			console.log({ error })
		}
	}
	return (
		<Container minHeight='71.3vh' hideIcon={true} hideH1={true}>
			<div className={style.container}>
				<div className={style.div_h1}>
					<h1>Solicitação de Compras</h1>
				</div>
				<div className={style.div_injetaq}>
					<p>Injetaq</p>
				</div>

				<div className={style.div_p}>
					<p>Para entrar no sistema clique em login!</p>
				</div>

				<div className={style.div_button}>
					<Button height='3em' handleClick={handleDefault}>
						Login
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default Home
