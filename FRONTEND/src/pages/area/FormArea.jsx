import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import TableArea from './TableArea'
import api from '../../api/api'
import style from '../area/FormArea.module.css'
import Message from '../../components/message/Message'

function FormArea() {
	const [id, setId] = useState('')
	const [area, setArea] = useState('')
	const [sector, setSector] = useState('')
	const [actived, setActived] = useState(true)
	const [listSector, setListSector] = useState([])
	// const [listArea, setListArea] = useState([])
	const [nameButton, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)
	const [edit, setEdit] = useState({})

	useEffect(() => {
		setId(edit.area_id)
		setArea(edit.area)
		setSector(edit.sector_id)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		allSector()
	}, [])

	useEffect(() => {
		setNameBtn('Incluir')
		setState('Inclusão')
	}, [])

	const togleActived = () => {
		setActived(!actived)
	}

	const allSector = async () => {
		const result = await api.get('/sector')
		setListSector(result.data)
		return result.data
	}

	const handleListAreas = () => {
		setShow('list')
	}

	const handleNew = () => {
		setId('')
		setArea('')
		setSector(allSector())
		setActived(true)
		setMessage(undefined)
		setType(undefined)
		setShow('create')
		setBtnDisable(false)
		setState('Inclusão')
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
		if (id === '') {
			try {
				await api.post('area', {
					area,
					sector_id: sector,
					actived,
				})
				// setListArea(result.data)
				setType('success')
				setMessage('Area incluída com sucesso!')
				// time()
			} catch (error) {
				console.log({ error })
				setType('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros === 'Validation error'
					? setMessage('Area já cadastrada!')
					: setMessage(error.response.data.error)
			}
			// time()
		} else {
			try {
				await api.patch('area', {
					area_id: id,
					area,
					sector_id: sector,
					actived,
				})
				setType('edit')
				setMessage('Área alterada com sucesso!')
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Área já cadastrada!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			// time()
		}
	}

	console.log(message)

	const handleAddArea = () => {
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
						value=''
						type='numeric'
						placeholder='ID'
						disable={true}
						handleChange={(e) => setId(e.target.value)}
						hide={true}
					/>
					<Input
						label='Area'
						name='area'
						value={area}
						type='text'
						placeholder='Digite a area'
						disable={false}
						handleChange={(e) => setArea(e.target.value.toUpperCase())}
					/>
					<Select
						text='Setor'
						name='sector'
						value={sector}
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
						>
							{nameButton}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4em'
							marginTop='1em'
							handleClick={handleListAreas}
						>
							Áreas
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
				<TableArea
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
				/>
				<Button handleClick={handleAddArea} fontSize='1em' width='8em'>
					Cadastrar Area
				</Button>
			</>
		)
	}
}

export default FormArea
