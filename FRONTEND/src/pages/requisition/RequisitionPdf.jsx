import React from 'react'
import Container from '../../components/container/MyContainer'

function RequisitionPdf() {
	let dataPdf = localStorage.getItem('itens_pdf')
	dataPdf = JSON.parse(dataPdf)
	dataPdf = dataPdf.data

	console.log(dataPdf)
	return (
		<Container nameH1='Requisição de Compras'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				{/* <div style={{ display: 'flex' }}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<h5>Data:{dataPdf[0].requisition.date}</h5>
						<h5>Requisição Nº: {dataPdf[0].requisition.requisition_id}</h5>
					</div>
				</div> */}
				<div>
					<table style={{ width: '100em' }}>
						<thead>
							<tr>
								<th>Qtde</th>
								<th>Unidade</th>
								<th>Centro de Custo</th>
								<th>Produto</th>
								<th>DI</th>
								<th>OP</th>
								<th>Prazo</th>
								<th>Obs</th>
							</tr>
						</thead>
						<tbody>
							{dataPdf.map((itReq) => {
								return (
									<tr key={itReq.requisition_itens_id}>
										<td>{itReq.quantity}</td>
										<td>{itReq.product.unity.unity_tag}</td>
										<td>{`${itReq.cost_center.cost_center} - ${itReq.cost_center.description}`}</td>
										<td>{itReq.product.description}</td>
										<td>{itReq.di}</td>
										<td>{itReq.op}</td>
										<td>{itReq.dead_line}</td>
										<td>{itReq.comments}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</Container>
	)
}
// localStorage.clear('itens_pdf')

export default RequisitionPdf
