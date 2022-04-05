import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import TableProduct from './TableProduct'
import api from '../../api/api'
import style from '../product/FormProduct.module.css'
import Message from '../../components/message/Message'

function FormProduct() {
	const [id, setId] = useState(undefined)
	const [codeDbcorp, setCodeDbcorp] = useState('')
	const [product, setProduct] = useState('')
	const [unity, setUnity] = useState('')
	const [actived, setActived] = useState(true)
	const [listUnity, setListUnity] = useState([])
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [state, setState] = useState('Inclusão')
	const [show, setShow] = useState('create')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)
	const [btnDisable, setBtnDisable] = useState(false)
	const [edit, setEdit] = useState({})
	const [statusProduct, setStatusProduct] = useState(true)

	useEffect(() => {
		setId(edit.product_id)
		setCodeDbcorp(edit.code_dbcorp)
		setProduct(edit.description)
		setUnity(edit.unity_id)
		setActived(edit.actived)
	}, [edit])

	useEffect(() => {
		allUnity()
	}, [])

	useEffect(() => {
		setNameBtn('Incluir')
		setState('Inclusão')
	}, [])

	const togleActived = () => {
		setActived(!actived)
	}

	const allUnity = async () => {
		const result = await api.get('/unity')
		setListUnity(result.data)
		return result.data
	}

	const handleListProducts = () => {
		setShow('list')
	}

	const handleDelete = async () => {
		try {
			const result = await api.delete(`/product/${id}`)
			setType('success')
			setMessage(result.data.msg)
			time()
		} catch (error) {
			console.log({ error })
			setType('error')
			setMessage(error.response.data.error)
			time()
		}
	}

	const handleNew = () => {
		setId(undefined)
		setCodeDbcorp('')
		setProduct('')
		setUnity(allUnity())
		setActived(true)
		setMessage(undefined)
		setType(undefined)
		setShow('create')
		setBtnDisable(false)
		setState('Inclusão')
		setNameBtn('Incluir')
		setStatusProduct(true)
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
			console.log(id)
			try {
				await api.post('product', {
					code_dbcorp: codeDbcorp,
					description: product,
					unity_id: unity,
					actived,
				})
				setType('success')
				setMessage('Produto incluído com sucesso!')
				time()
			} catch (error) {
				setType('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros === 'Validation error'
					? setMessage('Produto ou Código DBCORP já cadastrado!')
					: setMessage(error.response.data.error)
			}
			time()
		} else {
			try {
				await api.patch('product', {
					product_id: id,
					code_dbcorp: codeDbcorp,
					description: product,
					unity_id: unity,
					actived,
				})
				setType('edit')
				setMessage('Produto alterado com sucesso!')
				time()
			} catch (error) {
				if (error.response.data.erros === 'Validation error') {
					setType('error')
					setMessage('Produto já cadastrado!')
				} else {
					setType('error')
					setMessage(error.response.data.erros)
				}
			}
			time()
		}
	}

	const handleAddProduct = () => {
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
					<Button
						type='button'
						height='1.5em'
						width='2.1em'
						border='none'
						handleClick={handleDelete}
						hide={statusProduct}>
						<DeleteIcon
							style={{
								fontSize: '1.5em',
								color: 'red',
							}}
							titleAccess={`Excluir produto ${product}`}
						/>
					</Button>
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
						label='Código DBCorp'
						name='code_dbcorp'
						value={codeDbcorp}
						type='numeric'
						placeholder='Digite o produto'
						disable={false}
						handleChange={(e) => setCodeDbcorp(e.target.value)}
					/>
					<Input
						label='Produto'
						name='product'
						value={product}
						type='text'
						placeholder='Digite o produto'
						disable={false}
						handleChange={(e) => setProduct(e.target.value.toUpperCase())}
					/>
					<Select
						text='Unidade'
						name='unity'
						value={unity}
						handleChange={(e) => setUnity(e.target.value)}
						initial_text='Escolha uma unidade...'>
						{listUnity.map((un) => {
							return (
								<option key={un.unity_id} value={un.unity_id}>
									{un.unity_tag}
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
							disable={btnDisable && true}>
							{nameBtn}
						</Button>
						<Button
							type='button'
							height='2em'
							width='4.5em'
							marginTop='1em'
							handleClick={handleListProducts}
							disable={btnDisable && true}>
							Produtos
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
				<TableProduct
					edit={setEdit}
					value={edit}
					show={setShow}
					msg={setMessage}
					state={setState}
					btn={setNameBtn}
					status={setStatusProduct}
				/>
				<Button handleClick={handleAddProduct} fontSize='1em' width='8em'>
					Cadastrar Produto
				</Button>
			</>
		)
	}
}

export default FormProduct
