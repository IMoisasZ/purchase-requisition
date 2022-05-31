import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/Message'
import ButtonPagination from '../../components/pagination/ButtonPagination'
import SelectPagination from '../../components/pagination/SelectPagination'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import api from '../../api/api'
import style from './TableUser.module.css'

function TableUser({ edit, show, msg, state, btn }) {
	const [listUser, setListUser] = useState([])
	const [message, setMessage] = useState(undefined)
	const [type, setType] = useState('')

	// pagination
	const [itensPorPagina, setItensPorPagina] = useState(8)
	const [currentPage, setCurrentPage] = useState(0)
	const pages = Math.ceil(listUser.length / itensPorPagina)
	const startIndex = currentPage * itensPorPagina
	const endIndex = startIndex + itensPorPagina
	const currentItens = listUser.slice(startIndex, endIndex)

	const handleSelectPagination = (e) => {
		setItensPorPagina(Number(e.currentTarget.value))
		setCurrentPage(0)
	}

	const handleEditUser = async (user_id) => {
		try {
			const result = await api.get(`/user/${user_id}`)
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

	const allUsers = async () => {
		const users = await api.get('/user')
		setListUser(users.data)
	}
	console.log(listUser)
	useEffect(() => {
		const result = async () => {
			await allUsers()
		}
		result()
	}, [])

	const handleDisableEnable = async (user_id, actived) => {
		await api.put(`/user`, {
			user_id,
			actived: !actived,
		})
		await allUsers()
	}

	if (listUser.length > 0) {
		return (
			<div className={style.container}>
				<table>
					<caption>Lista de usuários</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
							<th>Setor</th>
							<th>Perfil</th>
							<th>Email</th>
							<th>Ativo</th>
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{currentItens.map((user) => {
							return (
								<tr key={user.user_id}>
									<td>{user.user_id}</td>
									<td>{user.name + ' ' + user.last_name}</td>
									<td>{user.sector.sector}</td>
									<td>{user.role.role}</td>
									<td>{user.email}</td>
									<td>{user.actived ? 'Sim' : 'Não'}</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={user.user_id}
											handleClick={() => {
												handleEditUser(user.user_id)
											}}>
											<EditRoundedIcon
												style={{ color: 'orange' }}
												titleAccess={`Editar usuário ${user.name}`}
											/>
										</Button>
									</td>
									<td>
										<Button
											height='1.5em'
											width='1.5em'
											border='none'
											value={user.user_id}
											handleClick={() => {
												handleDisableEnable(user.user_id, user.actived)
											}}>
											{user.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Usuário ${user.name} ativado!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Usuário ${user.name} desativado!`}
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

export default TableUser
