import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import TextArea from '../../components/textArea/MyTextArea'
import Select from '../../components/select/MySelect'
import Button from '../../components/button/MyButton'
import ShoppingCart from '../../components/shoppingCart/ShoppingCart'
import TableRequisition from './TableRequisition'
import Message from '../../components/message/Message'
import style from './FormRequisition.module.css'
import api from '../../api/api'

function FormRequisition() {
	// today
	const dateToday = new Date()
	const today =
		dateToday.getDate() +
		'/' +
		(dateToday.getMonth() + 1) +
		'/' +
		dateToday.getFullYear()

	// requisition
	const [id, setId] = useState(undefined)
	const [date, setDate] = useState(today)
	const [status, setStatus] = useState('Pendente')
	const [comments, setComments] = useState('')
	const [nameButton, setNameButton] = useState('Incluir')
	const [hide, setHide] = useState(true)

	// requisition itens
	const [requisitionItensId, setRequisitionItensId] = useState('')
	const [product, setProduct] = useState('')
	const [listProduct, setListProduct] = useState([])
	const [quantity, setQuantity] = useState('')
	const [unity, setUnity] = useState({})
	const [costCenter, setCostCenter] = useState('')
	const [listCostCenter, setListCostCenter] = useState([])
	const [di, setDi] = useState('')
	const [op, setOp] = useState('')
	const [commentsItem, setCommentsItem] = useState('')
	const [deadLine, setDeadLine] = useState('')
	const [listRequsitionItens, setListRequisitionItens] = useState([])

	// main
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)

	// edit item
	const [edit, setEdit] = useState([])

	useEffect(() => {
		setRequisitionItensId(edit.requisition_itens_id)
		setProduct(edit.product_id)
		setQuantity(edit.quantity)
		setCostCenter(edit.cost_center_id)
		setDi(edit.di)
		setOp(edit.op)
		setDeadLine(edit.dead_line)
		setCommentsItem(edit.comments)
	}, [edit])

	useEffect(() => {
		if (product) {
			const unityProduct = async () => {
				const result = await api.get(`/product/${product}`)
				setUnity(result.data.unity.unity_tag)
			}
			unityProduct()
		}
		setUnity('')
	}, [product])

	useEffect(() => {
		const allLists = async () => {
			const listProd = await api.get('/product')
			setListProduct(listProd.data)
			const listCostCenter = await api.get('/cost_center')
			setListCostCenter(listCostCenter.data)
		}
		allLists()
		allItens()
	}, [])

	const allItens = async () => {
		if (id !== undefined) {
			let result = await api.get(`/requisition_itens/requisition/${id}`)
			setListRequisitionItens(result.data)
		} else {
			let resultTemp = await api.get(`/requisition_itens_temp/requisition`)
			setListRequisitionItens(resultTemp.data)
		}
	}

	const truncateTable = async () => {
		const truncate = await api.delete('/requisition_itens_temp/truncate/table')
		console.log(truncate)
	}

	useEffect(() => {
		const handleHide = () => {
			if (listRequsitionItens.length > 0) {
				setHide(false)
			} else {
				setHide(true)
			}
		}
		handleHide()
	}, [listRequsitionItens])

	console.log(listRequsitionItens.length)

	const handleRequisitionItens = () => {
		setRequisitionItensId('')
		setProduct('')
		setUnity('')
		setQuantity('')
		setCostCenter('')
		setDi('')
		setOp('')
		setDeadLine(today)
		setNameButton('Incluir')
		setMessage(undefined)
	}

	// truncateTable()

	const submit = async (e) => {
		e.preventDefault()
		if (id === undefined) {
			if (nameButton === 'Incluir') {
				try {
					// insert in temporary table
					const result = await api.post('requisition_itens_temp', {
						product_id: product,
						quantity,
						cost_center_id: costCenter,
						di,
						op,
						dead_line: deadLine,
						comments: commentsItem,
					})
					setType('success')
					setMessage('Item incluído com sucesso!')
					allItens()
					setTimeout(() => {
						handleRequisitionItens()
					}, 1000)
				} catch (error) {
					setType('error')
					setMessage(
						error.response.data.error
							? error.response.data.error
							: error.response.data.erros,
					)
				}
			} else {
				try {
					// edit in temporary table
					await api.patch('/requisition_itens_temp', {
						requisition_itens_id: requisitionItensId,
						product_id: product,
						quantity,
						cost_center_id: costCenter,
						di,
						op,
						dead_line: deadLine.toString(),
						comments: commentsItem,
					})
					setType('edit')
					setMessage('Item alterado com sucesso!')
					setTimeout(() => {
						handleRequisitionItens()
					}, 1000)
				} catch (error) {
					setType('error')
					setMessage(error.data.response.error || error.data.response.erros)
				}
			}
		} //else
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<ShoppingCart quantityItens={listRequsitionItens.length} />
			</div>
			<form className={style.container} onSubmit={submit}>
				<section className={style.section_one}>
					<Input
						name='requisition_id'
						label='Numero requisição'
						value={id}
						type='numeric'
						width='12em'
						handleChange={(e) => setId(e.current.value)}
						placeholder='Numero da requisição'
						disable={true}
					/>
					<Input
						name='date'
						label='Data'
						value={date}
						width='12em'
						type='dateTime'
						handleChange={(e) => setDate(e.currentTarget.date)}
						placeholder='Data'
						disable={true}
					/>
					<Input
						name='status'
						label='Status'
						width='18em'
						value={status}
						type='text'
						handleChange={(e) => setStatus(e.currentTarget.value)}
						placeholder='Status'
						disable={true}
					/>
					<TextArea
						name='comments'
						text='Observação'
						value={comments}
						height='3.4em'
						cols='120'
						rows='2'
						handleChange={(e) => setComments(e.currentTarget.value)}
						placeholder='Observação'>
						{comments}
					</TextArea>
				</section>
				<hr />
				<section className={style.section_three}>
					<Select
						text='Produto'
						name='product'
						value={product}
						marginBottom='0'
						width='25em'
						handleChange={(e) => setProduct(e.target.value)}
						initial_text='Escolha um produto...'>
						{listProduct.map((prod) => {
							return (
								<option key={prod.product_id} value={prod.product_id}>
									{prod.description}
								</option>
							)
						})}
					</Select>
					<Input
						name='unity'
						label='Unidade'
						value={unity}
						type='text'
						width='5em'
						placeholder='Unidade'
						disable={true}
					/>
					<Input
						name='quantity'
						label='Quantidade'
						value={quantity}
						width='6em'
						type='numeric'
						handleChange={(e) => setQuantity(e.target.value)}
						placeholder='Quantidade'
					/>
					<Select
						text='Centro de Custos'
						name='cost_center'
						value={costCenter}
						marginBottom='0'
						width='25em'
						handleChange={(e) => setCostCenter(e.target.value)}
						initial_text='Escolha um centro de custos...'>
						{listCostCenter.map((cc) => {
							return (
								<option key={cc.cost_center_id} value={cc.cost_center_id}>
									{cc.description}
								</option>
							)
						})}
					</Select>
					<Input
						name='di'
						label='DI'
						value={di}
						type='text'
						width='20em'
						handleChange={(e) => setDi(e.target.value)}
						placeholder='Digite a(s) DI(s)'
					/>
					<Input
						name='op'
						label='OP'
						value={op}
						type='text'
						width='20em'
						handleChange={(e) => setOp(e.target.value)}
						placeholder='Digite a(s) OP(s)'
					/>
				</section>
				<section className={style.section_three}>
					<Input
						name='dead_line'
						label='Prazo'
						value={deadLine}
						type='date'
						width='10em'
						handleChange={(e) => setDeadLine(e.target.value)}
						placeholder='Prazo'
					/>
					<TextArea
						name='comments_item'
						text='Observação'
						value={commentsItem}
						height='3.4em'
						cols='140'
						rows='2'
						handleChange={(e) =>
							setCommentsItem(e.currentTarget.value.toUpperCase())
						}
						placeholder='Observação'>
						{commentsItem}
					</TextArea>
					<Button
						width='4em'
						height='1.5em'
						marginBottom='0'
						marginTop='0.7em'
						type='submit'>
						{nameButton}
					</Button>
					<Button
						width='9em'
						height='1.5em'
						marginBottom='0'
						marginTop='0.7em'
						type='button'
						hide={hide}>
						Salvar Requisição
					</Button>
				</section>
				{message !== undefined ? <Message type={type}>{message}</Message> : ''}
			</form>
			<TableRequisition
				dataTable={listRequsitionItens}
				edit={setEdit}
				allItens={allItens}
				nameButton={setNameButton}
			/>
		</>
	)
}

export default FormRequisition
