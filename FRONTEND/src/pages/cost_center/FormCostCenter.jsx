import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import TableCostCenter from './TableCostCenter'
import api from '../../api/api'
import style from '../cost_center/FormCostCenter.module.css'
import Message from '../../components/message/Message'

function FormCostCenter() {
	const [id, setId] = useState(undefined)
	const [costCenter, setCostCenter] = useState('')
	const [description, setDescription] = useState('')
	const [area, setArea] = useState('')
	const [listArea, setListArea] = useState([])
	const [actived, setActived] = useState(true)
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)
	const [edit, setEdit] = useState({})

	useEffect(() => {
		setId(edit.cost_center_id)
		setCostCenter(edit.cost_center)
		setDescription(edit.description)
		setArea(edit.area_id)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		const result = async () => {
			await allAreas()
		}
		result()
	}, [])

	useEffect(() => {
		setNameBtn('Incluir')
		setState('Inclusão')
	}, [])

	const togleActived = () => {
		setActived(!actived)
	}

	const allAreas = async () => {
		const result = await api.get('/area')
		setListArea(result.data)
		return result.data
	}

	const handleListCostCenter = () => {
		setShow('list')
	}

	const handleNew = async () => {
		setId(undefined)
		setCostCenter('')
		setDescription('')
		setListArea(await allAreas())
		setArea('Escolha uma área...')
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
		if (id === undefined) {
			try {
				await api.post('/cost_center', {
					cost_center: costCenter,
					description,
					area_id: area,
					actived,
				})
				setType('success')
				setMessage('Centro de custos incluído com sucesso!')
				time()
			} catch (error) {
				setType('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros === 'Validation error'
					? setMessage('Centro de custos já cadastrado!')
					: setMessage(error.response.data.error)
			}
			time()
		} else {
			try {
				console.log(id, costCenter, description, area, actived)
				await api.patch('/cost_center', {
					cost_center_id: id,
					cost_center: costCenter,
					description: description,
					area_id: area,
					actived,
				})
				setType('edit')
				setMessage('Centro de custos alterado com sucesso!')
				time()
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Centro de custos já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			time()
		}
	}

	const handleAddCostCenter = () => {
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
					<Input
						label='Centro de Custos'
						name='cost_center'
						value={costCenter}
						type='text'
						placeholder='Digite o centro de custos'
						disable={false}
						handleChange={(e) => setCostCenter(e.target.value)}
					/>
					<Input
						label='Descrição'
						name='description'
						value={description}
						type='text'
						placeholder='Digite a descrição'
						disable={false}
						handleChange={(e) => setDescription(e.target.value.toUpperCase())}
					/>
					<Select
						text='Área'
						name='area'
						value={area}
						handleChange={(e) => setArea(e.target.value)}
						initial_text='Escolha uma área...'
					>
						{listArea.map((ar) => {
							return (
								<option key={ar.area_id} value={ar.area_id}>
									{ar.area}
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
							{nameBtn}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4.5em'
							marginTop='1em'
							handleClick={handleListCostCenter}
							disable={btnDisable && true}
							title='Ir para lista de centro de custos!'
						>
							Lista CC
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
				<TableCostCenter
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
				/>
				<Button
					handleClick={handleAddCostCenter}
					fontSize='1em'
					width='8em'
					title='Cadastrar Centro de Custos!'
				>
					Cadastrar CC
				</Button>
			</>
		)
	}
}

export default FormCostCenter
