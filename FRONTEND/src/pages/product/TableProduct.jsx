import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../../api/api'
import style from './TableProduct.module.css'

function TableProduct({ edit, show, msg, state, btn }) {
	const [listProducts, setListProducts] = useState([])
	const [disable, setDisable] = useState({})
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')
	const [productId, setProductId] = useState(undefined)

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listProducts.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listProducts.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditProduct = async (product_id) => {
		try {
			const result = await api.get(`/product/${product_id}`)
			edit(result.data)
			show('create')
			msg(undefined)
			state('Edição')
			btn('Editar')
		} catch (error) {
			setType('error')
			setMessage(
				setMessage(
					error.response.data.erros
						? error.response.data.erros
						: error.response.data.erro,
				),
			)
		}
	}

	useEffect(() => {
		const allProducts = async () => {
			const products = await api.get('/product')
			setListProducts(products.data)
		}
		allProducts()
	}, [])

	useEffect(() => {
		const disableProduct = async () => {
			if (disable) {
				await api.put(`/product`, {
					product_id: disable,
					actived: actived,
				})
				const result = await api.get('/product')
				setListProducts(result.data)
			}
			return
		}
		disableProduct()
	}, [actived, disable])
	console.log(typeof disable)
	useEffect(() => {
		const handleDelete = async (productId) => {
			if (productId !== undefined) {
				try {
					await api.delete(`/product/${productId}`)
					setType('success')
					setMessage('Produto excluído com sucesso!')
				} catch (error) {
					setType(error)
					setMessage(error.response.data.error)
				}
			}
			return
		}
		handleDelete()
	}, [productId])

	if (listProducts.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de produtos</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Código DBcorp</th>
							<th>Produto</th>
							<th>Unidade</th>
							<th>Ativo</th>
							<th colSpan={3}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((product) => {
							return (
								<tr key={product.product_id}>
									<td>{product.product_id}</td>
									<td>{product.code_dbcorp}</td>
									<td>{product.description}</td>
									<td>{product.unity.unity_tag}</td>
									<td>{product.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={product.product_id}
											handleClick={(e) => {
												handleEditProduct(product.product_id)
											}}>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar produto ${product.description}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={product.product_id}
											handleClick={() => {
												setDisable(product.product_id)
												setActived(!product.actived)
											}}>
											{product.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Produto ${product.description} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Produto ${product.description} desativado!`}
												/>
											)}
										</Button>
									</td>
									<td>
										<Button
											type='button'
											height='1.5em'
											width='1.5em'
											border='none'
											value={product.product_id}
											handleClick={setProductId(product.product_id)}>
											<DeleteIcon
												style={{ color: 'red' }}
												titleAccess={`Excluir ${product.description}`}
											/>
										</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				{message !== undefined ? (
					<Message type={type} width='40em'>
						{message}
					</Message>
				) : (
					''
				)}
				{/* pagination */}
				<div className={style.container_pagination}>
					<ButtonPagination
						pages={pages}
						currentPage={currentPage}
						handleCurrentPage={(e) =>
							setCurrentPage(Number(e.currentTarget.value))
						}
						handleOnFirstPage={() => setCurrentPage(0)}
						handleOnPrevPage={() => {
							return currentPage > 0 && setCurrentPage(currentPage - 1)
						}}
						handleOnNextPage={() => {
							return currentPage + 1 < pages && setCurrentPage(currentPage + 1)
						}}
						handleOnLastPage={() => {
							return setCurrentPage(pages - 1)
						}}
					/>
					<SelectPagination handleOnChange={handleSelectPagination} />
				</div>
			</div>
		)
	} else {
		return (
			<div className={style.container_sem_registros}>
				<p> Não há registros</p>
			</div>
		)
	}
}

export default TableProduct
