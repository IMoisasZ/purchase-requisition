import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import TableRole from './TableRole'
import api from '../../api/api'
import style from '../role/FormRole.module.css'
import Message from '../../components/message/Message'

function FormRole() {
	const [id, setId] = useState('')
	const [role, setRole] = useState('')
	const [actived, setActived] = useState(true)
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)
	const [edit, setEdit] = useState({})

	useEffect(() => {
		setId(edit.role_id)
		setRole(edit.role)
		setActived(edit.actived)
	}, [edit])

	const togleActived = () => {
		setActived(!actived)
	}

	const handleListRoles = () => {
		setShow('list')
	}

	const handleNew = () => {
		setId('')
		setRole('')
		setActived(true)
		setMessage(undefined)
		setType(undefined)
		setShow('create')
		setBtnDisable(false)
		setState('Inclusão')
		setNameBtn('Incluir')
		clearTimeout(time)
	}

	const time = () => {
		setBtnDisable(true)
		setTimeout(() => {
			handleNew()
		}, 2000)
	}

	const submit = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('role', {
					role,
					actived,
				})
				setType('success')
				setMessage('Perfil de usuário incluído com sucesso!')
				time()
			} catch (error) {
				console.log({ error })
				setType('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros === 'Validation error'
					? setMessage('Perfil de usuário já cadastrado!')
					: setMessage(error.response.data.error)
			}
			time()
		} else {
			try {
				await api.patch('role', {
					role_id: id,
					role,
					actived,
				})
				setType('edit')
				setMessage('Perfil de usuário alterado com sucesso!')
				time()
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Perfil de usuário já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			time()
		}
	}

	const handleAddRole = () => {
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
						}}>
						Inclusão
					</p>
				) : (
					<p
						style={{
							color: 'orange',
							fontSize: '1.5em',
							textAlign: 'center',
							margin: '0',
						}}>
						Edição
					</p>
				)}
				<form className={style.container} onSubmit={submit}>
					<Input
						label=''
						name='id'
						value=''
						type='numeric'
						placeholder='ID'
						disable={true}
						handleChange={(e) => setId(e.target.value)}
						hide={true}
					/>
					<Input
						label='Perfil de usuário'
						name='role'
						value={role}
						type='text'
						placeholder='Digite o perfil de usuário'
						disable={false}
						handleChange={(e) => setRole(e.target.value.toUpperCase())}
					/>
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
							disable={btnDisable && true}>
							{nameBtn}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleListRoles}
							disable={btnDisable && true}>
							Perfis
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleNew}>
							Novo
						</Button>
					</div>
				</form>
				{message ? (
					<Message type={type} width='29em'>
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
				<TableRole
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
				/>
				<Button handleClick={handleAddRole} fontSize='1em' width='8em'>
					Cadastrar Perfil de Usuário
				</Button>
			</>
		)
	}
}

export default FormRole
