import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import api from '../../api/api'
import style from '../area/FormArea.module.css'
import Message from '../../components/message/Message'

function FormArea() {
	const [id, setId] = useState('')
	const [area, setArea] = useState('')
	const [sector, setSector] = useState('')
	const [actived, setActived] = useState(true)
	const [listSector, setListSector] = useState([])
	const [listArea, setListArea] = useState([])
	const [nameButton, setNameButton] = useState('Incluir')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)

	useEffect(() => {
		allSector()
	}, [])

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
		try {
			const result = await api.post('/area', {
				area,
				sector_id: sector,
			})
			setListArea(result.data)
			setType('success')
			setMessage('Area incluída com sucesso!')
			time()
		} catch (error) {
			setType('error')
			error.response.data.error
				? setMessage(error.response.data.error)
				: setMessage(error.response.data.erros)
		}
		time()
	}

	return (
		<>
			<form className={style.container} onSubmit={submit}>
				<Input
					label='ID'
					name='id'
					value={id}
					type='numeric'
					placeholder='ID'
					disable={true}
					handleChange={(e) => setId(e.target.value)}
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
					initial_text='Escolha um setor...'>
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
					togleChange={(e) => setActived(e.target.value)}
				/>
				<div className={style.buttons}>
					<Button
						type='submt'
						height='2em'
						width='4em'
						marginTop='1em'
						disable={btnDisable && true}>
						{nameButton}
					</Button>
					<Button
						type='button'
						height='2em'
						width='4em'
						marginTop='1em'
						handleClick={handleListAreas}>
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
}

export default FormArea
