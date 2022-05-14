import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/MyInput'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import Spinner from '../../components/spinner/Spinner'
import style from '../login/FormLogin.module.css'
import { User } from '../context/userContext'

function FormLogin() {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [type, setType] = useState('')
	const [message, setMessage] = useState('')
	const [spinner, setSpinner] = useState(false)
	const [userLogado, setUserLogado] = useState('')

	const navigate = useNavigate()

	const handleOnClick = (e) => {
		e.preventDefault()
		validation()
		setTimeout(() => {
			handleUserLogado()
		}, 1000)
	}

	const handleSubmit = (e) => {
		try {
		} catch (error) {
			console.log(error)
		}
	}

	const users = [
		{
			nome: 'Moisés Santos',
			email: 'devimoisasz@gmail.com',
			senha: '123456',
			role: 'MASTER',
		},
		{
			nome: 'Moisas Barbosa',
			email: 'mopri08@gmail.com',
			senha: '456321',
			role: 'user',
		},
	]

	const validation = () => {
		if (!email) {
			setType('error')
			setMessage('Email não informado!')
			return
		}

		if (!senha) {
			setType('error')
			setMessage('Senha não informado!')
			return
		}

		let user = users.find((u) => u.email === email)
		if (!user || user.senha !== senha) {
			setType('error')
			setMessage('Usuário e ou senha não conferem!')
			return
		}

		user.senha = undefined

		localStorage.setItem('user_log', JSON.stringify(user))
		setUserLogado(user)
		setType('success')
		setSpinner(true)
		setTimeout(() => {
			navigate('/menu')
		}, 1000)
	}
	const { handleUserLogado } = useContext(User)

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{spinner && <Spinner />}
			</div>
			<form className={style.container} onSubmit={handleSubmit}>
				<Input
					name='email'
					label='E-mail'
					value={email}
					type='email'
					handleChange={(e) => setEmail(e.target.value)}
					placeholder='E-mail'
				/>
				<Input
					name='senha'
					label='Senha'
					value={senha}
					type='password'
					handleChange={(e) => setSenha(e.target.value)}
					placeholder='Senha'
				/>

				<Button handleClick={handleOnClick} type='submit' height='2em'>
					Entrar
				</Button>

				<ul>
					<li>
						Cadastre-se <a href='#'> aqui</a>!
					</li>
					<li>
						Esqueceu a senha? Clique <a href='#'> aqui </a>
					</li>
				</ul>
			</form>
			{message && (
				<Message type={type} width='24em'>
					{message}
				</Message>
			)}
		</>
	)
}

export default FormLogin
