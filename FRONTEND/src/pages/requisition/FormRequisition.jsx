import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import TextArea from '../../components/textArea/MyTextArea'
import Select from '../../components/select/MySelect'
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

	return (
		<form className={style.container}>
			<section className={style.section_one}>
				<Input
					name='requisition_id'
					label='Numero requisição'
					value={id}
					type='numeric'
					handleChange={(e) => setId(e.current.value)}
					placeholder='Numero da requisição'
					disable={true}
				/>
				<Input
					name='date'
					label='Data'
					value={date}
					type='date'
					handleChange={(e) => setDate(e.currentTarget.date)}
					placeholder='Data'
					disable={true}
				/>
				<Input
					name='status'
					label='Status'
					value={status}
					type='text'
					handleChange={(e) => setStatus(e.currentTarget.value)}
					placeholder='Status'
					disable={true}
				/>
			</section>
			<section className={style.section_two}>
				<TextArea
					name='comments'
					text='Observação'
					value={comments}
					cols='158'
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
					placeholder='Unidade'
					disable={true}
				/>
				<Input
					name='quantity'
					label='Quantidade'
					value={quantity}
					type='numeric'
					handleChange={(e) => setQuantity(e.current.value)}
					placeholder='Quantidade'
				/>
				<Select
					text='Centro de Custos'
					name='cost_center'
					value={costCenter}
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
					handleChange={(e) => setDi(e.current.value)}
					placeholder='Digite a(s) DI(s)'
				/>
				<Input
					name='op'
					label='OP'
					value={op}
					type='text'
					handleChange={(e) => setOp(e.current.value)}
					placeholder='Digite a(s) OP(s)'
				/>
				<TextArea
					name='comments_item'
					text='Observação'
					value={commentsItem}
					cols='158'
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
					handleChange={(e) => setDeadLine(e.currentTarget.date)}
					placeholder='Data'
				/>
			</section>
		</form>
	)
}

export default FormRequisition
