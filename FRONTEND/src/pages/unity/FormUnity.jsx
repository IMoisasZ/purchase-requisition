import React, { useState } from 'react'
import Container from '../../components/MyContainer'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import TableUnity from './TableUity'
import styles from '../unity/FormUnity.module.css'
import api from '../../api/api'

function FormUnity() {
	const [id, setId] = useState('')
	const [unity, setUnity] = useState('')
	const [description, setDescription] = useState('')
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')
	const [editing, setEditing] = useState(false)
	const [show, setShow] = useState('create')

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

	const handleNew = () => {
		setId('')
		setUnity('')
		setDescription('')
		setActived(true)
		setMessage(undefined)
		setType('')
		setEditing(false)
	}

	const submit = async (e) => {
		e.preventDefault()
		if (!editing) {
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
				setType('success')
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
				<form onSubmit={submit} className={styles.container}>
					<Input
						name='id'
						label='ID'
						value={id}
						type='numeric'
						handleChange={handleId}
						placeholder='ID'
						disable={true}
						width='32em'
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
							Incluir
						</Button>
						<Button
							type='button'
							height='2em'
							width='5em'
							marginTop='1em'
							handleClick={() => setShow('units')}
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
			<Container minHeight='52vh'>
				<TableUnity />
			</Container>
		)
	}
}

export default FormUnity
