import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableResponsable.module.css'

function TableResponsable() {
	const [listResponsable, setListResponsable] = useState([])

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listResponsable.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listResponsable.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const allResponsable = async () => {
		const responsables = await api.get('/responsable')
		setListResponsable(responsables.data)
	}

	useEffect(() => {
		const result = async () => {
			await allResponsable()
		}
		result()
	}, [])
	console.log(listResponsable)
	const handleDisableEnable = async (responsable_id, actived) => {
		await api.put(`/responsable`, {
			responsable_id,
			actived: !actived,
		})
		await allResponsable()
	}

	if (listResponsable.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de responsáveis</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Responsável</th>
							<th>Ativo</th>
							<th colSpan={1}>Ação</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((resp) => {
							return (
								<tr key={resp.responsable_id}>
									<td>{resp.responsable_id}</td>
									<td>{`${resp.user.name} ${resp.user.last_name}`}</td>
									<td>{resp.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={resp.responsable_id}
											handleClick={() => {
												handleDisableEnable(resp.responsable_id, resp.actived)
											}}>
											{resp.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Responsável ${resp.user.name} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Responsável ${resp.user.name} desativado!`}
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

export default TableResponsable
