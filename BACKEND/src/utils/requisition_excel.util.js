import excel from 'excel4node'
import path from 'path'

const createExcel = (requisition) => {
	const wb = new excel.Workbook()
	const ws = wb.addWorksheet(`Requisição nº ${requisition[0].requisition_id}`)
	console.log(requisition)

	const headers = [
		'#',
		'Produto',
		'Un',
		'Qtde',
		'Centro de Custo',
		'DI',
		'OP',
		'Prazo',
		'Obs',
	]

	let rows = []
	requisition.map((req, index) => {
		rows.push({
			id: (index + 1).toString(),
			Produto: req.product.description,
			Un: req.product.unity.unity_tag,
			Qtde: req.quantity.toString(),
			cc: req.cost_center.cost_center + ' - ' + req.cost_center.description,
			DI: req.di ? req.di : null,
			OP: req.op ? req.op : null,
			Prazo: req.dead_line,
			Obs: req.comments,
		})
	})

	let headerIndex = 1
	headers.forEach((header) => {
		ws.cell(1, headerIndex++).string(header)
	})

	let rowIndex = 2
	rows.forEach((req) => {
		let headerIndex = 1
		Object.keys(req).forEach((headerName) => {
			ws.cell(rowIndex, headerIndex++).string(req[headerName])
		})
		rowIndex++
	})

	wb.write(
		`c://Users/Moisas/Downloads/requisicao_${requisition[0].requisition_id}.xlsx`,
	)
}

export default createExcel
