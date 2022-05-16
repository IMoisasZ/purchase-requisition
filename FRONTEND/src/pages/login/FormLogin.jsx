import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/MyInput'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import Spinner from '../../components/spinner/Spinner'
import style from '../login/FormLogin.module.css'
import { User } from '../../context/userContext'
import api from '../../api/api'

function FormLogin() {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [type, setType] = useState('')
	const [message, setMessage] = useState('')
	const [spinner, setSpinner] = useState(false)
	const [userLogado, setUserLogado] = useState('')

	const navigate = useNavigate()

	const handleOnClick = async (e) => {
		e.preventDefault()
		try {
			const logUser = {
				email,
				password: senha,
			}
			const user = await api.post('/login', logUser)
			console.log(user)

			localStorage.setItem('user_log', JSON.stringify(user))
			setUserLogado(user)
			alert(`Bem vindo ${user.data.name}`)
			handleUserLogado()
			navigate('/menu')
		} catch (error) {
			console.error({ error })
			setType('error')
			setMessage(error.response.data.error || error.response.data.erros)
		}
	}

	const handleSubmit = (e) => {
		try {
		} catch (error) {
			console.log(error)
		}
	}

	const { handleUserLogado } = useContext(User)

	return (
		<>
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
