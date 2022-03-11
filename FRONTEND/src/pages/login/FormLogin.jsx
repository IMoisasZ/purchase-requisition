import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/MyContainer'
import Input from '../../components/input/MyInput'
import Button from '../../components/button/MyButton'
import style from '../login/FormLogin.module.css'

function FormLogin() {
	const [email, setEmail] = useState(undefined)
	const [senha, setSenha] = useState(undefined)
	const [confirmarSenha, setConfirmarSenha] = useState(undefined)

	const handleEmail = (e) => {
		setEmail(() => e.target.value)
	}

	const handleSenha = (e) => {
		setSenha(() => e.target.value)
	}

	const handleConfirmarSenha = (e) => {
		setConfirmarSenha(() => e.target.value)
	}

	const handleOnClick = (e) => {}

	const handleSubmit = (e) => {
		try {
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<form className={style.container} onSubmit={handleSubmit}>
				<Input
					name='email'
					label='E-mail'
					value={email}
					type='email'
					handleChange={handleEmail}
					placeholder='E-mail'
				/>
				<Input
					name='senha'
					label='Senha'
					value={senha}
					type='text'
					handleChange={handleSenha}
					placeholder='Senha'
				/>
				<Input
					name='confirm_senha'
					label='Confirmar Senha'
					value={confirmarSenha}
					type='text'
					handleChange={handleConfirmarSenha}
					placeholder='Confirme sua senha'
				/>
				<Link to='/menu' style={{ textDecoration: 'none' }}>
					<Button handleClick={handleOnClick} type='submit' height='2em'>
						Entrar
					</Button>
				</Link>
			</form>
		</>
	)
}

export default FormLogin
