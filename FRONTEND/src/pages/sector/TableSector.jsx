import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableSector.module.css'

function TableSector({ edit, show, msg }) {
	const [listSectors, setListSectors] = useState([])
	const [disable, setDisable] = useState({})
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listSectors.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listSectors.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditSector = async (sector_id) => {
		try {
			const result = await api.get(`/sector/${sector_id}`)
			edit(result.data)
			show('create')
			msg(undefined)
		} catch (error) {
			setType('error')
			setMessage(
				setMessage(
					error.response.data.erros
						? error.response.data.erros
						: error.response.data.erro
				)
			)
		}
	}

	useEffect(() => {
		const allSector = async () => {
			const sectors = await api.get('/sector')
			setListSectors(sectors.data)
		}
		allSector()
	}, [])

	useEffect(() => {
		const disableSector = async () => {
			await api.put(`/sector`, {
				sector_id: disable,
				actived: actived,
			})
			const result = await api.get('/sector')
			setListSectors(result.data)
		}
		disableSector()
	}, [actived, disable])

	if (listSectors.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de setores</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Setor</th>
							<th>Ativo</th>
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((sector) => {
							return (
								<tr key={sector.sector_id}>
									<td>{sector.sector_id}</td>
									<td>{sector.sector}</td>
									<td>{sector.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={sector.sector_id}
											handleClick={(e) => {
												handleEditSector(sector.sector_id)
											}}
										>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar setor ${sector.sector}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={sector.sector_id}
											handleClick={() => {
												setDisable(sector.sector_id)
												setActived(!sector.actived)
											}}
										>
											{sector.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Setor ${sector.sector} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Setor ${sector.sector} desativado!`}
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

export default TableSector
