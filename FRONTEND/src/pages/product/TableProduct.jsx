import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableProduct.module.css'

function TableProduct({ edit, show, msg, state, btn, status }) {
	const [listProducts, setListProducts] = useState([])
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(8)
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
			const statusProduct = await api.get(
				`/requisition_itens/product-requisition/${product_id}`,
			)

			edit(result.data)
			show('create')
			msg(undefined)
			state('Edição')
			btn('Editar')
			status(!statusProduct.data)
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

	const allProducts = async () => {
		const products = await api.get('/product')
		setListProducts(products.data)
	}

	useEffect(() => {
		allProducts()
	}, [])

	const handleDisableEnable = async (product_id, actived) => {
		console.log(product_id, actived)
		await api.put(`/product`, {
			product_id,
			actived: !actived,
		})
		allProducts()
	}

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
							<th colSpan={2}>Ações</th>
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
											handleClick={() => {
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
												handleDisableEnable(product.product_id, product.actived)
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
								</tr>
							)
						})}
					</tbody>
				</table>
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
				{message !== undefined ? (
					<Message type={type} width='40em'>
						{message}
					</Message>
				) : (
					''
				)}
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
