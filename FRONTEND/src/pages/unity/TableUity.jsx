import React, { useState, useEffect } from 'react'
import Button from '../../components/button/MyButton'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import style from '../unity/TableUnity.module.css'
import api from '../../api/api'

function TableUnity() {
	const [listUnity, setListUnity] = useState([])

	useEffect(() => {
		const allUnits = async () => {
			const result = await api.get('/unity')
			setListUnity(result.data)
		}
		allUnits()
	}, [])

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
							<th colSpan={2}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{listUnity.map((un) => {
							return (
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
											handleClick={''}
										>
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
											handleClick={''}
										>
											{un.actived ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
													titleAccess={`Unidade ${un.unity_tag} ativada!`}
												/>
											) : (
												<DisabledByDefaultRoundedIcon
													style={{ color: 'red' }}
													titleAccess={`Unidade ${un.unity_tag} desativada!`}
												/>
											)}
										</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
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

export default TableUnity
