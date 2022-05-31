import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Button from '../../components/button/MyButton'
import style from './Home.module.css'
import api from '../../api/api'
import {
	SectorDefault,
	roleDefault,
	userDefault,
} from '../../utils/defaultData'

function Home() {
	if (localStorage.getItem('user_log')) {
		localStorage.clear('user_log')
	}

	const navigate = useNavigate()
	const handleDefault = async () => {
		try {
			const result = await api.get('/user')

			if (result.data.length === 0) {
				const sector = SectorDefault()
				const role = roleDefault()
				const user = userDefault()
				await api.post('/sector', sector)
				role.map(async (r) => {
					await api.post('/role', r)
				})
				await api.post('/user', user)
				navigate('/login')
			}
			navigate('/login')
		} catch (error) {
			console.log({ error })
		}
	}
	return (
		<Container minHeight='69vh' hideIcon={true} hideH1={true}>
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
