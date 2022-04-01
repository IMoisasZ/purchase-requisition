import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import TableUnity from './TableUnity'
import styles from '../unity/FormUnity.module.css'
import api from '../../api/api'

function FormUnity() {
	const [id, setId] = useState('')
	const [unity, setUnity] = useState('')
	const [description, setDescription] = useState('')
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')
	const [show, setShow] = useState('create')
	const [edit, setEdit] = useState({})
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')

	const handleId = (e) => {
		setId(() => e.target.value)
	}

	const handleUnity = (e) => {
		setUnity(() => e.target.value.toUpperCase())
	}

	const handleDescription = (e) => {
		setDescription(() => e.target.value.toUpperCase())
	}

	const togleActived = () => {
		setActived(!actived)
	}

	const handleListUnits = () => {
		setShow('units')
	}

	const handleNew = () => {
		setId('')
		setUnity('')
		setDescription('')
		setActived(true)
		setMessage(undefined)
		setType('')
		setNameBtn('Incluir')
		setState('Inclusão')
	}

	useEffect(() => {
		setId(edit.unity_id)
		setUnity(edit.unity_tag)
		setDescription(edit.description)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		setNameBtn('Incluir')
		setState('Inclusão')
	}, [])

	const submit = async (e) => {
		e.preventDefault()
		if (id === '') {
			try {
				await api.post('unity', {
					unity_tag: unity,
					description,
					actived,
				})
				setType('success')
				setMessage('Unidade cadastrada com sucesso!')
			} catch (error) {
				if (error.response.data.error === 'Validation error') {
					setType('error')
					setMessage('Unidade já cadastrada!')
				} else {
					setType('error')
					setMessage(error.response.data.error)
				}
			}
			setTimeout(() => {
				handleNew()
			}, 3000)
		} else {
			try {
				await api.patch('unity', {
					unity_id: id,
					unity_tag: unity,
					description,
					actived,
				})
				setType('edit')
				setMessage('Unidade alterada com sucesso!')
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Unidade já cadastrada!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			setTimeout(() => {
				handleNew()
			}, 2000)
		}
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
				<form onSubmit={submit} className={styles.container}>
					<Input
						name='id'
						label=''
						value=''
						type='numeric'
						handleChange={handleId}
						placeholder='ID'
						disable={true}
						width='32em'
						hide={true}
					/>
					<Input
						name='unity'
						label='Unidade'
						value={unity}
						type='text'
						handleChange={handleUnity}
						placeholder='Digite a unidade'
						width='32em'
					/>
					<Input
						name='description'
						label='Descrição'
						value={description}
						type='text'
						handleChange={handleDescription}
						placeholder='Digite a descrição da unidade'
						width='32em'
					/>
					<CheckBox
						name='actived'
						label='Ativo'
						value={actived}
						togleChange={togleActived}
						checked={actived && true}
					/>

					<div className={styles.btn}>
						<Button type='submt' height='2em' width='4em' marginTop='1em'>
							{nameBtn}
						</Button>
						<Button
							type='button'
							height='2em'
							width='5em'
							marginTop='1em'
							handleClick={handleListUnits}
						>
							Unidades
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleNew}
						>
							Novo
						</Button>
					</div>
				</form>
				{message ? (
					<Message type={type} width='34em'>
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
				<TableUnity
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
				/>
				<Button
					handleClick={() => setShow('create')}
					fontSize='1em'
					width='8em'
				>
					Cadastrar Unidade
				</Button>
			</>
		)
	}
}

export default FormUnity
