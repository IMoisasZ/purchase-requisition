import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import TableUser from './TableUser'
import api from '../../api/api'
import style from '../user/FormUser.module.css'
import Message from '../../components/message/Message'

function FormUser() {
	const [id, setId] = useState(undefined)
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [sector, setSector] = useState('')
	const [role, setRole] = useState('')
	const [responsable, setResponsable] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [listSector, setListSector] = useState([])
	const [listRole, setListRole] = useState([])
	const [listResponsable, setListResponsable] = useState([])
	const [actived, setActived] = useState(true)
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)
	const [edit, setEdit] = useState({})

	useEffect(() => {
		setId(edit.user_id)
		setName(edit.name)
		setLastName(edit.last_name)
		setSector(edit.sector_id)
		setRole(edit.role_id)
		setResponsable(edit.responsable_id)
		setEmail(edit.email)
		setPassword(edit.password)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		const result = async () => {
			await allSectors()
			await allRoles()
			await allResponsables()
		}
		result()
		setNameBtn('Incluir')
		setState('Inclusão')
	}, [])

	const togleActived = () => {
		setActived(!actived)
	}

	// list sectors
	const allSectors = async () => {
		const result = await api.get('/sector')
		setListSector(result.data)
		return result.data
	}

	// list roles
	const allRoles = async () => {
		const result = await api.get('/role')
		setListRole(result.data)
		return result.data
	}

	// list responsables
	const allResponsables = async () => {
		const result = await api.get('/responsable')
		setListResponsable(result.data)
		return result.data
	}

	const handleListUser = () => {
		setShow('list')
	}

	const handleNew = async () => {
		setId(undefined)
		setName('')
		setLastName('')
		setListSector(await allSectors())
		setListRole(await allRoles())
		setListResponsable(await allResponsables())
		setSector('')
		setRole('')
		setResponsable('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setActived(true)
		setMessage(undefined)
		setType(undefined)
		setShow('create')
		setBtnDisable(false)
		setState('Inclusão')
		setNameBtn('Incluir')
		clearTimeout(timeNew)
	}

	const timeNew = () => {
		setBtnDisable(true)
		setTimeout(() => {
			handleNew()
		}, 2000)
	}

	const time = () => {
		setTimeout(() => {
			setMessage(undefined)
		}, 2000)
	}

	const submit = async (e) => {
		e.preventDefault()
		if (id === undefined) {
			try {
				let createdUser = {
					name,
					last_name: lastName,
					sector_id: sector,
					role_id: role,
					responsable_id: responsable ? responsable : null,
					email,
					password,
					confirm_password: confirmPassword,
					actived,
				}
				await api.post('/user', createdUser)
				setType('success')
				setMessage('Usuário incluído com sucesso!')
				timeNew()
			} catch (error) {
				console.log({ error })
				setType('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros && setMessage(error.response.data.erros)
				time()
			}
		} else {
			try {
				await api.patch('/user', {
					user_id: id,
					name,
					last_name: lastName,
					sector_id: sector,
					role_id: role,
					responsable_id: responsable ? responsable : null,
					email,
					password,
					confirm_password: confirmPassword,
					actived,
				})
				setType('edit')
				setMessage('Usuário alterado com sucesso!')
				timeNew()
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Usuário já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			time()
		}
	}

	const handleAddUser = () => {
		setShow('create')
	}

	if (show === 'create') {
		return (
			<>
				{state === 'Inclusão' ? (
					<p
						style={{
							color: 'green',
							fontSize: '1.5em',
							textAlign: 'center',
							margin: '0',
						}}
					>
						Inclusão
					</p>
				) : (
					<p
						style={{
							color: 'orange',
							fontSize: '1.5em',
							textAlign: 'center',
							margin: '0',
						}}
					>
						Edição
					</p>
				)}
				<form className={style.container} onSubmit={submit}>
					<Input
						label=''
						name='id'
						value={id}
						type='numeric'
						placeholder='ID'
						disable={true}
						handleChange={(e) => setId(e.target.value)}
						hide={true}
					/>
					<div className={style.fullname}>
						<Input
							label='Nome'
							name='name'
							value={name}
							type='text'
							placeholder='Digite o nome do usuário'
							disable={false}
							handleChange={(e) => setName(e.target.value.toUpperCase())}
						/>

						<Input
							label='Sobrenome'
							name='last_name'
							value={lastName}
							type='text'
							placeholder='Digite o sobrenome do usuário'
							disable={false}
							handleChange={(e) => setLastName(e.target.value.toUpperCase())}
						/>
					</div>
					<div className={style.selects}>
						<Select
							text='Setor'
							name='sector'
							value={sector}
							width='18em'
							handleChange={(e) => setSector(e.target.value)}
							initial_text='Escolha um setor...'
						>
							{listSector.map((sector) => {
								return (
									<option key={sector.sector_id} value={sector.sector_id}>
										{sector.sector}
									</option>
								)
							})}
						</Select>
						<Select
							text='Perfil Usuário'
							name='role'
							value={role}
							width='16em'
							handleChange={(e) => setRole(e.target.value)}
							initial_text='Escolha um perfil...'
						>
							{listRole.map((role) => {
								return (
									<option key={role.role_id} value={role.role_id}>
										{role.role}
									</option>
								)
							})}
						</Select>
						<Select
							text='Responsável'
							name='responsable'
							value={responsable}
							width='18em'
							handleChange={(e) => setResponsable(e.target.value)}
							initial_text='Escolha um responsável...'
						>
							{listResponsable.map((resp) => {
								return (
									<option key={resp.user_id} value={resp.user_id}>
										{resp.name}
									</option>
								)
							})}
						</Select>
					</div>
					<Input
						label='Email'
						name='email'
						value={email}
						type='email'
						placeholder='Digite o email do usuário'
						disable={false}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<div className={style.password}>
						<Input
							label='Senha'
							name='password'
							value={password}
							type='password'
							placeholder='Digite a senha'
							disable={false}
							handleChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							label='Confirmar senha'
							name='confirm_password'
							value={confirmPassword}
							type='password'
							placeholder='Confirme a senha'
							disable={false}
							handleChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<CheckBox
						name='actived'
						label='Ativo'
						value={actived}
						checked={actived && true}
						togleChange={togleActived}
					/>
					<div className={style.buttons}>
						<Button
							type='submt'
							height='2em'
							width='4em'
							marginTop='1em'
							disable={btnDisable && true}
							title='Clique para incluir um usuário!'
						>
							{nameBtn}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4.5em'
							marginTop='1em'
							handleClick={handleListUser}
							disable={btnDisable && true}
							title='Ir para lista de usuários!'
						>
							Usuários
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleNew}
							title='Clique limpar o formulário!'
						>
							Novo
						</Button>
					</div>
				</form>
				{message ? (
					<Message type={type} width='49em'>
						{message}
					</Message>
				) : (
					''
				)}
			</>
		)
	} else {
		return (
			<>
				<TableUser
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
				/>
				<Button
					handleClick={handleAddUser}
					fontSize='1em'
					width='8em'
					title='Cadastrar Usuário!'
				>
					Cadastrar Usuário
				</Button>
			</>
		)
	}
}

export default FormUser
