import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/input/MyInput'
import { MdOutlineRestartAlt } from 'react-icons/md'
import TextArea from '../../components/textArea/MyTextArea'
import Select from '../../components/select/MySelect'
import Button from '../../components/button/MyButton'
import Modal from '../../components/modal/MyModal'
import ShoppingCart from '../../components/shoppingCart/ShoppingCart'
import TableRequisition from './TableRequisition'
import Message from '../../components/message/Message'
import style from './FormRequisition.module.css'
import api from '../../api/api'
import pdf from '../requisition_pdf/requisition_pdf'
import { format } from 'date-fns'
import TableRequisitionConsult from './TableRequisitionConsult'

function FormRequisition() {
	// main page
	const [whatDo, setWhatDo] = useState('')

	// today
	const dateToday = format(new Date(), 'dd-MM-yyyy').toString()

	// requisition
	const [id, setId] = useState(undefined)
	const [date, setDate] = useState('')
	const [status, setStatus] = useState('')
	const [comments, setComments] = useState('')
	const [nameButton, setNameButton] = useState('Incluir')
	const [hide, setHide] = useState(true)
	const [tempToReal, setTempToReal] = useState('temp')

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
	}, [])

	useEffect(() => {
		const real = async () => {
			await allItensReal()
		}
		real()
	}, [tempToReal])

	const allItensReal = async () => {
		let result = await api.get(`/requisition_itens/requisition/${id}`)
		setListRequisitionItens(result.data)
	}

	const allItensTemp = async () => {
		let resultTemp = await api.get(`/requisition_itens_temp/requisition`)
		setListRequisitionItens(resultTemp.data)
	}

	const truncateTable = async () => {
		const truncate = await api.delete('/requisition_itens_temp/truncate/table')
	}

	const handleRequisitionItensClear = () => {
		setId('')
		setRequisitionItensId('')
		setProduct('')
		setUnity('')
		setQuantity('')
		setCostCenter('')
		setDi('')
		setOp('')
		setDeadLine('')
		setNameButton('Incluir')
		setMessage(undefined)
		allItensTemp()
		setTempToReal('temp')
		setDate('')
		setStatus('')
		setComments('')
		truncateTable()
		setListRequisitionItens([])
	}
	console.log(id)

	// insert the products to table temp
	const submit = async (e) => {
		e.preventDefault()
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
				setHide(false)
				setType('success')
				setMessage('Item incluído com sucesso!')
				allItensTemp()
				setTimeout(() => {
					handleRequisitionItensClear()
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
					dead_line: deadLine,
					comments: commentsItem,
				})
				setType('edit')
				setMessage('Item alterado com sucesso!')
				setTimeout(() => {
					handleRequisitionItensClear()
				}, 1000)
			} catch (error) {
				setType('error')
				setMessage(error.data.response.error || error.data.response.erros)
			}
		}
	}

	// insert the produts to requisition temp to requisition real
	const handleSaveRequisition = async () => {
		const requisition = await api.post('/requisition', {
			user_id: 1,
			date: new Date(),
			comments,
			status: 'Incluída',
		})
		setId(requisition.data.requisition_id)
		setDate(requisition.data.date)
		setStatus(requisition.data.status)
		setComments(requisition.data.comments)
		listRequsitionItens.map((list) => {
			return api.post('/requisition_itens', {
				requisition_id: requisition.data.requisition_id,
				product_id: list.product_id,
				quantity: list.quantity,
				cost_center_id: list.cost_center_id,
				di: list.di,
				op: list.op,
				dead_line: list.dead_line,
				comments: list.comments,
			})
		})
		const listRequisitionPdf = await api.get(
			`/requisition_itens/requisition_pdf/${Number(
				requisition.data.requisition_id,
			)}`,
		)
		console.log(listRequisitionPdf)
		localStorage.setItem('itens_pdf', JSON.stringify(listRequisitionPdf))
		setTempToReal('real')
		truncateTable()
		setHide(true)

		await sendEmail(requisition.data.requisition_id)
		handleRequisitionItensClear()
	}

	const sendEmail = async (requisition_id) => {
		try {
			const requisitionItensData = await api.get(
				`/requisition_itens/requisition/${requisition_id}`,
			)
			pdf(requisitionItensData.data)
			const result = await api.post(
				`/requisition_itens/requisition/send_email/${requisition_id}`,
			)
			console.log({ result })
			alert('Email enviado com sucesso!')
		} catch (error) {
			console.log({ error })
			alert('Erro ao enviar email: ' + error)
		}
	}

	return (
		<>
			{whatDo === '' && (
				<>
					<h2 style={{ textAlign: 'center' }}>O que deseja fazer?</h2>
					<div>
						<div
							style={{
								width: '25%',
								margin: '0 auto',
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}>
							<Button handleClick={() => setWhatDo('create')}>
								Criar Requisição?
							</Button>
							<Link
								style={{ textDecoration: 'none' }}
								to='/requisition/consult'>
								<Button> Consultar Requisição?</Button>
							</Link>
						</div>
					</div>
				</>
			)}
			{whatDo === 'create' && (
				<>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<ShoppingCart quantityItens={listRequsitionItens.length} />
					</div>
					<div>
						<button
							className={style.new_requisition}
							onClick={handleRequisitionItensClear}
							hidden={false}
							title='Atualizar requisição!'>
							<MdOutlineRestartAlt />
						</button>
					</div>
					<form className={style.container} onSubmit={submit}>
						<section className={style.section_one}>
							<Input
								name='requisition_id'
								label='Numero requisição'
								value={id}
								type={id ? 'numeric' : 'text'}
								width='12em'
								handleChange={(e) => setId(e.currentTarget.value)}
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
								type='submit'
								disable={tempToReal === 'real' && true}
								title={tempToReal === 'real' && 'Botão desativado'}
								tempToReal={tempToReal}>
								{nameButton}
							</Button>
							<Modal
								requisition={handleSaveRequisition}
								hideButton={hide}
								message={setMessage}
								type={setType}
							/>
						</section>
						{message !== undefined ? (
							<Message type={type}>{message}</Message>
						) : (
							''
						)}
					</form>
					<TableRequisition
						dataTable={listRequsitionItens}
						edit={setEdit}
						allItensTemp={allItensTemp}
						nameButton={setNameButton}
						tempToReal={tempToReal}
					/>
				</>
			)}
			{whatDo === 'search' && <TableRequisitionConsult />}
		</>
	)
}

export default FormRequisition
