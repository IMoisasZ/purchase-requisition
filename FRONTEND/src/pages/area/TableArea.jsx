import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableArea.module.css'

function TableArea({ edit, show, msg, state, btn }) {
	const [listAreas, setListAreas] = useState([])
	const [disable, setDisable] = useState({})
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listAreas.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listAreas.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditArea = async (area_id) => {
		try {
			const result = await api.get(`/area/${area_id}`)
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
		const allAreas = async () => {
			const areas = await api.get('/area')
			setListAreas(areas.data)
		}
		allAreas()
	}, [])

	useEffect(() => {
		const disableArea = async () => {
			await api.put(`/area`, {
				area_id: disable,
				actived: actived,
			})
			const result = await api.get('/area')
			setListAreas(result.data)
		}
		disableArea()
	}, [actived, disable])

	if (listAreas.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de áreas</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Area</th>
							<th>Setor</th>
							<th>Ativo</th>
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((area) => {
							return (
								<tr key={area.area_id}>
									<td>{area.area_id}</td>
									<td>{area.area}</td>
									<td>{area.sector.sector}</td>
									<td>{area.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={area.area_id}
											handleClick={(e) => {
												handleEditArea(area.area_id)
											}}>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar area ${area.area}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={area.area_id}
											handleClick={() => {
												setDisable(area.area_id)
												setActived(!area.actived)
											}}>
											{area.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Area ${area.area} ativada!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Area ${area.area} desativada!`}
												/>
											)}
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

export default TableArea
