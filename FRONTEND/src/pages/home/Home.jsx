import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/MyContainer'
import Button from '../../components/button/MyButton'
import style from './Home.module.css'

function Home() {
	return (
		<Container minHeight='62vh'>
			<div className={style.container}>
				<div className={style.div_h1}>
					<h1>Requisição de Compras</h1>
				</div>
				<div className={style.div_injetaq}>
					<p>Injetaq</p>
				</div>

				<div className={style.div_p}>
					<p>Para entrar no sistema clique em login!</p>
				</div>

				<div className={style.div_button}>
					<Link to='/login' style={{ textDecoration: 'none' }}>
						<Button height='3em'>Login</Button>
					</Link>
				</div>
			</div>
		</Container>
	)
}

export default Home
