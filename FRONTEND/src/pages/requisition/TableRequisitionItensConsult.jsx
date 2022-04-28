import React from 'react'
import Table from '../../components/table/MyTable'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import style from './TableRequisitionItensConsult.module.css'

function TableRequisitionItensConsult({ itens }) {
	const headersTableRequisitionItens = [
		'#',
		'Produto',
		'Qtde',
		'Centro de Custos',
		'DI',
		'OP',
	]

	return (
		<div className={style.container}>
			<div className={style.div_table_itens}>
				<span>Itens da Requisições</span>
				<Table>
					<TableHead>
						<TableRow>
							{headersTableRequisitionItens.map((head, index) => {
								return (
									<TableCell align='center' key={index}>
										{head}
									</TableCell>
								)
							})}
						</TableRow>
					</TableHead>

					{itens.map((it, index) => {
						return (
							<TableBody>
								<TableRow key={it.requisition_itens_id}>
									<TableCell align='center'>{index + 1}</TableCell>
									<TableCell align='center'>{it.product.description}</TableCell>
									<TableCell align='center'>{it.quantity}</TableCell>
									<TableCell align='center'>
										{it.cost_center.description}
									</TableCell>
									<TableCell align='center'>{it.di}</TableCell>
									<TableCell align='center'>{it.op}</TableCell>
								</TableRow>
							</TableBody>
						)
					})}
				</Table>
			</div>
		</div>
	)
}
// 	<div className={style.container}>
// 		<div className={style.div_table_itens}>
// 			<table>
// 				<caption>Itens Requisição</caption>
// 				<thead>
// 					<tr>
// 						<th>#</th>
// 						<th>Produto</th>
// 						<th>Quantidade</th>
// 						<th>Centro de Custos</th>
// 						<th>DI</th>
// 						<th>OP</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{itens.map((it, index) => {
// 						return (
// 							<tr key={it.requisition_itens_id}>
// 								<td>{index + 1}</td>
// 								<td>{it.product.description}</td>
// 								<td>{it.quantity}</td>
// 								<td>{it.cost_center.description}</td>
// 								<td>{it.di}</td>
// 								<td>{it.op}</td>
// 							</tr>
// 						)
// 					})}
// 				</tbody>
// 			</table>
// 		</div>
// 	</div>
// )

export default TableRequisitionItensConsult
