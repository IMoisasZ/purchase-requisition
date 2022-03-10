import React, { useEffect, useState } from 'react'
import Container from '../../components/MyContainer'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import TableSector from './TableSector'
import style from '../setor/FormSetor.module.css'
import api from '../../api/api'

function FormSetor() {
	// create
	const [id, setId] = useState('')
	const [setor, setSetor] = useState('')
	const [ativo, setAtivo] = useState('true')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [show, setShow] = useState('create')
	const [nameButton, setNameButton] = useState('Incluir')

	const [edit, setEdit] = useState({})
	const [typeHttp, setTypeHttp] = useState('post')

	// edit
	useEffect(() => {
		setId(edit.sector_id)
		setSetor(edit.sector)
		setAtivo(edit.actived)
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
	console.log(typeof id)

	// create
	const handleId = (e) => {
		setId(() => e.target.value)
	}

	const handleSetor = (e) => {
		setSetor(() => e.target.value.toUpperCase())
	}

	const togleAtivo = () => {
		setAtivo(!ativo)
	}

	const submit = async (e) => {
		e.preventDefault()
		if (typeHttp === 'post') {
			try {
				await api.post('sector', {
					sector: setor,
					actived: ativo,
				})

				setType('success')
				setMessage('Setor incluído com sucesso!')
				setTimeout(() => {
					handleNovo()
				}, 2000)
			} catch (error) {
				console.log(error.response.data.erros)
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Setor já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
				setTimeout(() => {
					handleNovo()
				}, 2000)
			}
		} else {
			try {
				await api.patch('sector', {
					sector_id: id,
					sector: setor,
					actived: ativo,
				})

				setType('edit')
				setMessage('Setor alterado com sucesso!')
				setTimeout(() => {
					handleNovo()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Setor já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
				setTimeout(() => {
					handleNovo()
				}, 2000)
			}
		}
	}

	// list
	const handleListSectors = () => {
		setShow('list')
	}

	const handleCadastrarSetor = () => {
		setShow('create')
	}

	const handleNovo = () => {
		setId('')
		setSetor('')
		setAtivo(true)
		setMessage(undefined)
		setType(undefined)
		setShow('create')
		setNameButton('Incluir')
		setEdit({})
		setTypeHttp('post')
	}

	if (show === 'create') {
		return (
			<Container minHeight='52.5vh'>
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
						label='ID'
						value={id}
						type='numeric'
						handleChange={handleId}
						placeholder='ID'
						disable={true}
					/>
					<Input
						name='setor'
						label='Setor'
						value={setor}
						type='text'
						handleChange={handleSetor}
						placeholder='Nome do setor'
						disable={false}
					/>
					<CheckBox
						name='ativo'
						label='Ativo'
						value={ativo}
						togleChange={togleAtivo}
						checked={ativo && true}
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
							handleClick={handleNovo}>
							Novo
						</Button>
					</div>
				</form>
				{message !== undefined ? <Message type={type}>{message}</Message> : ''}
			</Container>
		)
	} else {
		return (
			<Container minHeight='52.5vh'>
				<TableSector
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
				/>
				<Button handleClick={handleCadastrarSetor} fontSize='1em' width='8em'>
					Cadastrar Setor
				</Button>
			</Container>
		)
	}
}

export default FormSetor
