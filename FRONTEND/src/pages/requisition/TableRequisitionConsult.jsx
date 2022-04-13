import React, { useState, useEffect } from 'react'
import Input from '../../components/input/MyInput'
import newDate from '../../utils/date.utils'

function TableRequisitionConsult({ requisitionData }) {
	if (requisitionData) {
		requisitionData.date = newDate(requisitionData.date)
	} else {
		requisitionData = ''
	}
	return (
		<div>
			<table>
				<caption>Requisições</caption>
				<thead>
					<tr>
						<th>Seleção</th>
						<th>Requisição</th>
						<th>Data</th>
						<th>Observação</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{requisitionData.length === 0 ? (
						<p>Não há dados!</p>
					) : requisitionData.length > 1 ? (
						requisitionData.map((req) => {
							let newDt = newDate(req.date)
							return (
								<tr key={req.requisition_id}>
									<td>
										<Input
											name='selected'
											type='checkbox'
											value={req.requisition_id}
											width='1em'
											hide={requisitionData && false}
										/>
									</td>
									<td>{req.requisition_id}</td>
									<td>{newDt}</td>
									<td>{req.comments}</td>
									<td>{req.status}</td>
								</tr>
							)
						})
					) : (
						<tr>
							<td>
								<Input
									name='selected'
									type='checkbox'
									value={requisitionData.requisition_id}
									width='1em'
									hide={requisitionData && false}
								/>
							</td>
							<td>{requisitionData.requisition_id}</td>
							<td>{requisitionData.date}</td>
							<td>{requisitionData.comments}</td>
							<td>{requisitionData.status}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default TableRequisitionConsult
