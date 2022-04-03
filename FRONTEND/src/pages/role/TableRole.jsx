import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableRole.module.css'

function TableRole({ edit, show, msg, state, btn }) {
	const [listRoles, setListRoles] = useState([])
	const [disable, setDisable] = useState({})
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(2)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listRoles.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listRoles.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditRole = async (role_id) => {
		try {
			const result = await api.get(`/role/${role_id}`)
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
		const allRoles = async () => {
			const roles = await api.get('/role')
			setListRoles(roles.data)
		}
		allRoles()
	}, [])

	useEffect(() => {
		const disableRole = async () => {
			await api.put(`/role`, {
				role_id: disable,
				actived: actived,
			})
			const result = await api.get('/role')
			setListRoles(result.data)
		}
		disableRole()
	}, [actived, disable])

	if (listRoles.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de perfis de usuário</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Perfil</th>
							<th>Ativo</th>
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((role) => {
							return (
								<tr key={role.role_id}>
									<td>{role.role_id}</td>
									<td>{role.role}</td>
									<td>{role.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={role.role_id}
											handleClick={(e) => {
												handleEditRole(role.role_id)
											}}>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar perfil ${role.role}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={role.role_id}
											handleClick={() => {
												setDisable(role.role_id)
												setActived(!role.actived)
											}}>
											{role.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Perfil ${role.role} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Perfil ${role.role} desativado!`}
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

export default TableRole
