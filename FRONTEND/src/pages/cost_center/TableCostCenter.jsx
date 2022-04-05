import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableCostCenter.module.css'

function TableCostCenter({ edit, show, msg, state, btn }) {
	const [listCostCenter, setListCostCenter] = useState([])
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listCostCenter.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listCostCenter.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditCostCenter = async (cost_center_id) => {
		try {
			const result = await api.get(`/cost_center/${cost_center_id}`)
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

	const allCostCenter = async () => {
		const costCenter = await api.get('/cost_center')
		setListCostCenter(costCenter.data)
	}

	useEffect(() => {
		allCostCenter()
	}, [])

	const handleDisableEnable = async (cost_center_id, actived) => {
		await api.put(`/cost_center`, {
			cost_center_id,
			actived: !actived,
		})
		allCostCenter()
	}

	if (listCostCenter.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de centro de custos</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Centro de Custos</th>
							<th>Descrição</th>
							<th>Área</th>
							<th>Ativo</th>
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((cc) => {
							return (
								<tr key={cc.cost_center_id}>
									<td>{cc.cost_center_id}</td>
									<td>{cc.cost_center}</td>
									<td>{cc.description}</td>
									<td>{cc.area.area}</td>
									<td>{cc.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={cc.cost_center_id}
											handleClick={(e) => {
												handleEditCostCenter(cc.cost_center_id)
											}}>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar centro de custos ${cc.description}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={cc.cost_center_id}
											handleClick={() => {
												handleDisableEnable(cc.cost_center_id, cc.actived)
											}}>
											{cc.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Centro de custos ${cc.description} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Centro ${cc.description} desativado!`}
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

export default TableCostCenter
