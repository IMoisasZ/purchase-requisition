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
	// requisition
	const [id, setId] = useState(undefined)
	const [date, setDate] = useState('06/04/2022')
	const [status, setStatus] = useState('Pendente')
	const [comments, setComments] = useState('')

	// requisition itens
	const [product, setProduct] = useState('')
	const [listProduct, setListProduct] = useState([])
	const [quantity, setQuantity] = useState('')
	const [unity, setUnity] = useState('')
	const [costCenter, setCostCenter] = useState('')
	const [listCostCenter, setListCostCenter] = useState([])
	const [di, setDi] = useState('')
	const [op, setOp] = useState('')
	const [commentsItem, setCommentsItem] = useState('')
	const [deadLine, setDeadLine] = useState('')

	// main
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState(undefined)

	// table
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
		const allLists = async () => {
			const listProd = await api.get('/product')
			setListProduct(listProd.data)
			const listCostCenter = await api.get('/cost_center')
			setListCostCenter(listCostCenter.data)
		}
		allLists()
	}, [])

	const handleProduct = (e) => {
		setProduct(e.target.value)
	}

	useEffect(() => {
		if (product !== 'Escolha um produto...') {
			setUnity(product.split(' - ')[1])
		} else {
			setUnity('')
		}
	}, [product])

	const handleQuantityItens = () => {}

	// object requisition
	let requisitionData = []
	console.log(requisitionData.length)
	// object requisition itens
	let requisitionItens = []
	const submit = async (e) => {
		e.preventDefault()
		// localStorage.clear()
		if (id === undefined) {
			if (product && quantity && costCenter && deadLine) {
				let newData = localStorage.getItem('data')
				if (!newData) {
					requisitionData.push({
						date: date,
						status: status,
						comments: comments,
					})
					requisitionItens.push({
						product_id: product.split(' - ')[0],
						quantity: quantity,
						cost_center_id: costCenter,
						di: di,
						op: op,
						comments: commentsItem,
						dead_line: deadLine,
					})
					setType('success')
					setMessage('Item incluído com sucesso!')
					setDataTable(requisitionItens)
					localStorage.setItem('data', JSON.stringify(requisitionData))
					localStorage.setItem('data_itens', JSON.stringify(requisitionItens))
					requisitionItens = []
					requisitionData = []
				} else {
					let newDataItem = localStorage.getItem('data_itens')
					console.log(newDataItem)
					requisitionItens = JSON.parse(newDataItem)
					requisitionItens.push({
						product_id: product.split(' - ')[0],
						quantity,
						cost_center_id: costCenter,
						di: di || '',
						op: op || '',
						comments: commentsItem || '',
						dead_line: deadLine,
					})
					setDataTable(requisitionItens)
					localStorage.setItem('data_itens', JSON.stringify(requisitionItens))
					requisitionItens = []
				}
			} else {
				setType('error')
				setMessage('Os campos são obrigatórios!')
			}
		}
	}
	console.log(requisitionData)

	console.log(message)

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<ShoppingCart quantityItens={handleQuantityItens || 0} />
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
						type='date'
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
				<section className={style.section_three}>
					<Select
						text='Produto'
						name='product'
						value={product}
						marginBottom='0'
						width='25em'
						handleChange={handleProduct}
						initial_text='Escolha um produto...'>
						{listProduct.map((prod) => {
							return (
								<option
									key={prod.product_id}
									value={prod.product_id + ' - ' + prod.unity.unity_tag}>
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
					<TextArea
						name='comments_item'
						text='Observação'
						value={commentsItem}
						height='3.4em'
						cols='180'
						rows='2'
						handleChange={(e) => setCommentsItem(e.currentTarget.value)}
						placeholder='Observação'>
						{commentsItem}
					</TextArea>
					<Input
						name='dead_line'
						label='Prazo'
						value={deadLine}
						type='date'
						width='10em'
						handleChange={(e) => setDeadLine(e.target.value)}
						placeholder='Data'
					/>
					<Button
						width='4em'
						height='1.5em'
						marginBottom='0'
						marginTop='0.7em'
						type='submit'>
						Incuir
					</Button>
				</section>
				{message !== undefined ? <Message type={type}>{message}</Message> : ''}
			</form>
			<TableRequisition dataTable={dataTable} />
		</>
	)
}

export default FormRequisition
