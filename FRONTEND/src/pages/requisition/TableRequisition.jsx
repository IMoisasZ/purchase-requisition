import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '../../components/button/MyButton'
import api from '../../api/api'
import style from './TableRequisition.module.css'

function TableRequisition({ dataTable, edit, allItens, nameButton }) {
	const handleEditItem = async (requisition_itens_id) => {
		const result = await api.get(
			`/requisition_itens_temp/${requisition_itens_id}`,
		)
		edit(result.data)
		console.log(result.data)
	}

	const handleDeleteItem = async (requisition_itens_id) => {
		await api.delete(`/requisition_itens_temp/${requisition_itens_id}`)
		allItens()
	}
	return (
		<div className={style.container}>
			<table>
				<thead>
					<tr>
						<th>ID Requisition</th>
						<th>Produto</th>
						<th>Unidade</th>
						<th>Qtde</th>
						<th>CC</th>
						<th>DI</th>
						<th>OP</th>
						<th>Prazo</th>
						<th colSpan={2}>Ações</th>
					</tr>
				</thead>
				<tbody>
					{dataTable.map((data) => {
						let deadLine = new Date(data.dead_line)
						let day =
							(deadLine.getDate() + 1).toString().length === 2
								? deadLine.getDate() + 1
								: 0 + '' + deadLine.getDate() + 1
						let month =
							(deadLine.getMonth() + 1).toString().length === 2
								? deadLine.getMonth() + 1
								: 0 + '' + (deadLine.getMonth() + 1)
						let year = deadLine.getFullYear()
						let newDeadLine = `${day}/${month}/${year}`
						return (
							<tr key={data.requisition_itens_id}>
								<td>{data.requisition_itens && data.requisition_itens}</td>
								<td>{data.product.description}</td>
								<td>{data.product.unity.unity_tag}</td>
								<td>{data.quantity}</td>
								<td>{data.cost_center.description}</td>
								<td>{data.di}</td>
								<td>{data.op}</td>
								<td>{newDeadLine}</td>
								<td>
									<Button
										height='1.5em'
										width='1.5em'
										border='none'
										value={data.requisition_itens_id}
										handleClick={(e) => {
											handleEditItem(data.requisition_itens_id)
											nameButton('Editar')
										}}>
										<EditRoundedIcon />
									</Button>
								</td>
								<td>
									<Button
										height='1.5em'
										width='1.5em'
										border='none'
										value={data.requisition_itens_id}
										handleClick={(e) => {
											handleDeleteItem(data.requisition_itens_id)
										}}>
										<DeleteIcon />
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TableRequisition
