import React, { useState, useEffect } from 'react'
import Input from '../../components/input/MyInput'
import TableRequisitionItensConsult from './TableRequisitionItensConsult'
import newDate from '../../utils/date.utils'
import api from '../../api/api'
import style from './TableRequisitionConsult.module.css'

function TableRequisitionConsult({ requisitionData }) {
	const [selectedRequisition, setSelectedRequisition] = useState('')
	const [requisitionItens, setRequisitonItens] = useState([])

	const togleSelected = (requisition_id) => {
		setSelectedRequisition(requisition_id)
	}

	useEffect(() => {
		if (requisitionItens) {
			const itens = async () => {
				const result = await api.get(
					`/requisition_itens/requisition/${selectedRequisition}`,
				)
				setRequisitonItens(result.data)
			}
			itens()
		}
	}, [selectedRequisition])
	console.log(selectedRequisition)
	console.log(requisitionItens)

	if (requisitionData) {
		requisitionData.date = newDate(requisitionData.date)
	} else {
		requisitionData = ''
	}
	return (
		<div className={style.container}>
			<div className={style.div_table}>
				<table>
					<caption>Requisições</caption>
					<thead>
						<tr>
							<th>Seleção</th>
							<th>Requisição</th>
							<th>Data</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{requisitionData.length === 0 ? (
							<tr>
								<td>
									<p>Não há dados!</p>
								</td>
							</tr>
						) : requisitionData.length > 1 ? (
							requisitionData.map((req) => {
								let newDt = newDate(req.date)
								return (
									<tr key={req.requisition_id} title={req.comments}>
										<td>
											<Input
												name='selected'
												type='radio'
												value={req.requisition_id}
												width='1em'
												hide={requisitionData && false}
												handleChange={() => togleSelected(req.requisition_id)}
											/>
										</td>
										<td>{req.requisition_id}</td>
										<td>{newDt}</td>
										<td>{req.status}</td>
									</tr>
								)
							})
						) : (
							<tr title={requisitionData.comments}>
								<td>
									<Input
										name='selected'
										type='radio'
										value={requisitionData.requisition_id}
										width='1em'
										hide={requisitionData && false}
										handleChange={() =>
											togleSelected(requisitionData.requisition_id)
										}
									/>
								</td>
								<td>{requisitionData.requisition_id}</td>
								<td>{requisitionData.date}</td>
								<td>{requisitionData.status}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<TableRequisitionItensConsult itens={requisitionItens} />
		</div>
	)
}

export default TableRequisitionConsult
