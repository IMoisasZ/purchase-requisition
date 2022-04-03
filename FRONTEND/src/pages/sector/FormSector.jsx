import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import TableSector from './TableSector'
import style from './FormSector.module.css'
import api from '../../api/api'

function FormSector() {
	// create
	const [id, setId] = useState('')
	const [sector, setSector] = useState('')
	const [actived, setActived] = useState('true')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [show, setShow] = useState('create')
	const [nameButton, setNameButton] = useState('Incluir')

	const [edit, setEdit] = useState({})
	const [typeHttp, setTypeHttp] = useState('post')

	// edit
	useEffect(() => {
		setId(edit.sector_id)
		setSector(edit.sector)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		if (!id) {
			setTypeHttp('post')
			setNameButton('Incluir')
		} else {
			setTypeHttp('put')
			setNameButton('Editar')
		}
	}, [id])

	// create
	const handleId = (e) => {
		setId(() => e.target.value)
	}

	const handleSector = (e) => {
		setSector(() => e.target.value.toUpperCase())
	}

	const togleActived = () => {
		setActived(!actived)
	}

	const handleNew = () => {
		setId('')
		setSector('')
		setActived(true)
		setMessage(undefined)
		setType(undefined)
		setNameButton('Incluir')
		setEdit({})
		setTypeHttp('post')
	}

	const submit = async (e) => {
		e.preventDefault()
		if (typeHttp === 'post') {
			try {
				await api.post('sector', {
					sector: sector,
					actived,
				})

				setType('success')
				setMessage('Setor incluído com sucesso!')
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Setor já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.error)
				}
			}
		} else {
			try {
				await api.patch('sector', {
					sector_id: id,
					sector,
					actived,
				})

				setType('edit')
				setMessage('Setor alterado com sucesso!')
			} catch (error) {
				console.log({ error })
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Setor já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.error)
				}
			}
		}
	}

	// list
	const handleListSectors = () => {
		setShow('list')
	}

	const handleAddSector = () => {
		setShow('create')
	}

	if (show === 'create') {
		return (
			<>
				{typeHttp === 'post' ? (
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
						name='id'
						label=''
						value=''
						type='numeric'
						handleChange={handleId}
						placeholder='ID'
						disable={true}
						hide={true}
					/>
					<Input
						name='sector'
						label='Setor'
						value={sector}
						type='text'
						handleChange={handleSector}
						placeholder='Nome do setor'
						disable={false}
					/>
					<CheckBox
						name='ativo'
						label='Ativo'
						value={actived}
						togleChange={togleActived}
						checked={actived && true}
					/>
					<div className={style.buttons}>
						<Button type='submt' height='2em' width='4em' marginTop='1em'>
							{nameButton}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleListSectors}>
							Setores
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
				{message !== undefined ? <Message type={type}>{message}</Message> : ''}
			</>
		)
	} else {
		return (
			<>
				<TableSector
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
				/>
				<Button handleClick={handleAddSector} fontSize='1em' width='8em'>
					Cadastrar Setor
				</Button>
			</>
		)
	}
}

export default FormSector
