import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import newDate from '../../utils/date.utils'
import { format } from 'date-fns'

function pdf(requisition) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs

	const requisitionTitle = [
		{
			margin: [15, 20, 0, 45],
			alignment: 'justify',
			bold: true,
			columns: [
				{
					text: 'INJETAQ',
					alignment: 'left',
					fontSize: 15,
				},
				{
					text: 'Solicitação de Compras',
					alignment: 'center',
					fontSize: 15,
				},
				{
					text: 'Requisição Nº: ' + requisition[0].requisition_id,
					alignment: 'right',
					fontSize: 15,
					margin: [0, 0, 20, 0],
				},
			],
		},
	]

	const data = requisition.map((req, index) => {
		return [
			{ text: index + 1, style: 'tableHeader', fontSize: 10 },
			{ text: req.product.description, style: 'tableHeader', fontSize: 10 },
			{ text: req.product.unity.unity_tag, style: 'tableHeader', fontSize: 10 },
			{ text: req.quantity, style: 'tableHeader', fontSize: 10 },
			{
				text: req.cost_center.cost_center + ' -' + req.cost_center.description,
				style: 'tableHeader',
				fontSize: 10,
			},
			{ text: req.di, style: 'tableHeader', fontSize: 10 },
			{ text: req.op, style: 'tableHeader', fontSize: 10 },
			{ text: newDate(req.dead_line), style: 'tableHeader', fontSize: 10 },
			{ text: req.comments, style: 'tableHeader', fontSize: 10 },
		]
	})

	const details = [
		{
			table: {
				headerRows: 1,
				widths: [5, '*', 15, 30, '*', 70, 55, 55, '*'],
				border: [false, false, false, true],
				body: [
					[
						{ text: '#', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Produto', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Un', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Qtde', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Centro de Custo', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'DI', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'OP', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Prazo', fontSize: 10, margin: [0, 2, 0, 2] },
						{ text: 'Obs', fontSize: 10, margin: [0, 2, 0, 2] },
					],
					...data,
				],
			},
			layout: 'headerLineOnly',
		},
		{
			text: '______________________________________________________________________________________________________________________________________________________ ',
			alignment: 'center',
		},
		{
			columns: [
				{
					text: 'Qtde de itens da requisição: ' + requisition.length,
				},
				{
					text:
						'Requisitante: ' +
						requisition[0].requisition.user.name +
						' ' +
						requisition[0].requisition.user.last_name,
					alignment: 'right',
				},
			],
		},
	]

	const footer = (currentPage, pageCount) => {
		return [
			{
				columns: [
					{
						text: format(new Date(), 'dd-MM-yyyy'),
						alignment: 'left',
						margin: [20, 10, 0, 0],
						fontSize: 9,
					},
					{
						text: 'Requisição de Compras - Injetaq',
						alignment: 'center',
						margin: [0, 10, 0, 0],
						fontSize: 9,
					},
					{
						text: currentPage + ' / ' + pageCount,
						alignment: 'right',
						fontSize: 9,
						margin: [0, 10, 20, 0],
					},
				],
			},
		]
	}

	const docDefinitions = {
		pageSize: 'A4',
		pageMargins: [15, 50, 15, 40],
		pageOrientation: 'landscape',

		header: [requisitionTitle],
		content: [details],
		footer: footer,
	}

	pdfMake
		.createPdf(docDefinitions)
		.download(`requisicao_${requisition[0].requisition_id}.pdf`)
}
export default pdf
