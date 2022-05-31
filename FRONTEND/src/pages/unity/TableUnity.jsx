import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import style from '../unity/TableUnity.module.css'
import api from '../../api/api'

function TableUnity({ edit, show, msg, state, btn }) {
	const [listUnity, setListUnity] = useState([])
	const [actived, setActived] = useState([])
	const [disable, setDisable] = useState('')
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(8)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listUnity.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listUnity.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	useEffect(() => {
		const allUnits = async () => {
			const result = await api.get('/unity')
			setListUnity(result.data)
		}
		allUnits()
	}, [])

	// disable or enable unity
	useEffect(() => {
		const disableUnity = async () => {
			await api.put('/unity', {
				unity_id: disable,
				actived,
			})
			const result = await api.get(`/unity`)
			setListUnity(result.data)
		}
		disableUnity()
	}, [actived, disable])

	// edit unity
	const handleEditUnity = async (unity_id) => {
		try {
			const result = await api.get(`/unity/${unity_id}`)
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

	if (listUnity.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de Unidades</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Unidade</th>
							<th>Descrição</th>
							<th>Ativo</th>
							<th colSpan={3}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((un) => {
							return (
								<>
									<tr key={un.unity_id}>
										<td>{un.unity_id}</td>
										<td>{un.unity_tag}</td>
										<td>{un.description}</td>
										<td>{un.actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												height='1.5em'
												width='1.5em'
												border='none'
												value={un.unity_id}
												handleClick={() => handleEditUnity(un.unity_id)}>
												<EditRoundedIcon
													style={{ color: 'orange' }}
													titleAccess={`Editar unidade ${un.unity_tag}`}
												/>
											</Button>
										</td>
										<td>
											<Button
												height='1.5em'
												width='1.5em'
												border='none'
												value={un.unity_id}
												handleClick={() => {
													setDisable(un.unity_id)
													setActived(!un.actived)
												}}>
												{un.actived ? (
													<CheckCircleIcon
														style={{ color: 'green' }}
														titleAccess={`Unidade ${un.unity_tag} ativada!`}
													/>
												) : (
													<DisabledByDefaultRoundedIcon
														style={{ color: 'red' }}
														titleAccess={`Undade ${un.unity_tag} desativada!`}
													/>
												)}
											</Button>
										</td>
									</tr>
								</>
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
				<p>Não há unidades cadastradas!</p>
			</div>
		)
	}
}

export default TableUnity
