import React, { useState, useEffect } from 'react'
import Input from '../../components/input/MyInput'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { RiMailSendLine } from 'react-icons/ri'
import { FaFileExcel } from 'react-icons/fa'
import TableRequisitionItensConsult from './TableRequisitionItensConsult'
import Table from '../../components/table/MyTable'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableSortLabel from '@mui/material/TableSortLabel'
import newDate from '../../utils/date.utils'
import api from '../../api/api'
import style from './TableRequisitionConsult.module.css'
import pdf from '../requisition_pdf/requisition_pdf'

function TableRequisitionConsult() {
	const [selectedRequisition, setSelectedRequisition] = useState('')
	const [requisitionItens, setRequisitonItens] = useState([])
	const [requisitionId, setRequisitionId] = useState('')
	const [requisitionData, setRequisitionData] = useState([])

	const togleSelected = (requisition_id) => {
		setSelectedRequisition(requisition_id)
	}

	useEffect(() => {
		try {
			const allRequisitions = async () => {
				if (requisitionId) {
					const result = await api.get(
						`/requisition?requisition_id=${requisitionId}`,
					)
					setRequisitionData(result.data)
				} else {
					const result = await api.get(`/requisition`)
					setRequisitionData(result.data)
				}
			}
			allRequisitions()
		} catch (error) {
			console.log({ error })
		}
	}, [requisitionId])

	useEffect(() => {
		const itens = async () => {
			const result = await api.get(
				`/requisition_itens/requisition/${selectedRequisition}`,
			)
			setRequisitonItens(result.data)
		}
		itens()
	}, [selectedRequisition])

	const gerarPdf = () => {
		pdf(requisitionItens, 1)
	}

	const gerarExcel = async (requisition_id) => {
		try {
			await api.post(`requisition_itens/requisition/excel/${requisition_id}`)
		} catch (error) {
			console.log({ error })
		}
	}

	const handleClear = () => {
		selectedRequisition('')
		setRequisitonItens([])
	}

	const sendEmail = async (requisition_id) => {
		try {
			pdf(requisitionItens)
			const result = await api.post(
				`/requisition_itens/requisition/send_email/${requisition_id}`,
			)
			alert('Email enviado com sucesso!')
		} catch (error) {
			console.log({ error })
			alert('Erro ao enviar email: ' + error)
		}
	}

	const headersTableRequisition = ['Sel', 'Req', 'Data', 'Status', 'Ações']

	return (
		<>
			<div>
				<Input
					flexDirection='row'
					name='requisition_id'
					label='Requisição'
					type='numeric'
					value={requisitionId}
					width='14em'
					placeholder='Digite o numero da requisição!'
					handleChange={(e) => {
						setRequisitionId(e.target.value)
					}}
				/>
			</div>
			<div className={style.container}>
				<div className={style.table_requisition}>
					<span>Lista de Requisições</span>
					<Table>
						<TableHead>
							<TableRow>
								{headersTableRequisition.map((head, index) => {
									return head === 'Ações' ? (
										<TableCell colSpan={3} align='center' key={index}>
											{head}
										</TableCell>
									) : (
										<TableCell align='center' key={index}>
											{head}
										</TableCell>
									)
								})}
							</TableRow>
						</TableHead>

						{requisitionData.map((req) => {
							return (
								<TableBody>
									<TableRow key={req.requisition_id}>
										<TableCell align='center'>
											<input
												name='selected'
												type='radio'
												value={req.requisition_id}
												hide={requisitionData && false}
												onChange={() => togleSelected(req.requisition_id)}
											/>
										</TableCell>
										<TableCell align='center'>{req.requisition_id}</TableCell>
										<TableCell align='center'>{req.date}</TableCell>
										<TableCell align='center'>{req.status}</TableCell>
										<TableCell align='center'>
											<button
												className={
													req.requisition_id === selectedRequisition && style.on
												}
												onClick={gerarPdf}
												disabled={
													req.requisition_id === selectedRequisition
														? false
														: true
												}
												title='Export PDF!'>
												<PictureAsPdfIcon />
											</button>
										</TableCell>
										<TableCell align='center'>
											<button
												id='excel'
												className={
													req.requisition_id === selectedRequisition
														? style.on_green
														: style.off_green
												}
												onClick={() => gerarExcel(req.requisition_id)}
												disabled={
													req.requisition_id === selectedRequisition
														? false
														: true
												}
												title='Export Excel!'>
												<FaFileExcel />
											</button>
										</TableCell>
										<TableCell align='center'>
											<button
												id='email'
												className={
													req.requisition_id === selectedRequisition
														? style.on_email
														: style.off_email
												}
												onClick={() => sendEmail(req.requisition_id)}
												disabled={
													req.requisition_id === selectedRequisition
														? false
														: true
												}
												title='Enviar email!'>
												<RiMailSendLine />
											</button>
										</TableCell>
									</TableRow>
								</TableBody>
							)
						})}
					</Table>
				</div>

				<TableRequisitionItensConsult itens={requisitionItens} />
			</div>
		</>

		// <div className={style.container_req}>
		// 	<div className={style.div_table}>
		// 		<table className={style.table_req}>
		// 			<caption>Requisições</caption>
		// 			<thead>
		// 				<tr>
		// 					<th>Sel</th>
		// 					<th>Req</th>
		// 					<th>Data</th>
		// 					<th>Status</th>
		// 					<th colSpan={3}>Ações</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{requisitionData.length === 0 && (
		// 					<tr>
		// 						<td>
		// 							<p>Não há dados!</p>
		// 						</td>
		// 					</tr>
		// 				)}
		// 				{requisitionData.length > 1 ? (
		// 					requisitionData.map((req) => {
		// 						return (
		// 							<tr key={req.requisition_id} title={req.comments}>
		// 								<td>
		// 									<input
		// 										name='selected'
		// 										type='radio'
		// 										value={req.requisition_id}
		// 										hide={requisitionData && false}
		// 										onChange={() => togleSelected(req.requisition_id)}
		// 									/>
		// 								</td>
		// 								<td>{req.requisition_id}</td>
		// 								<td>{req.date}</td>
		// 								<td>{req.status}</td>
		// 								<td>
		// 									<button
		// 										className={
		// 											req.requisition_id === selectedRequisition && style.on
		// 										}
		// 										onClick={gerarPdf}
		// 										disabled={
		// 											req.requisition_id === selectedRequisition
		// 												? false
		// 												: true
		// 										}
		// 										title='Export PDF!'>
		// 										<PictureAsPdfIcon />
		// 									</button>
		// 								</td>
		// 								<td>
		// 									<button
		// 										id='excel'
		// 										className={
		// 											req.requisition_id === selectedRequisition
		// 												? style.on_green
		// 												: style.off_green
		// 										}
		// 										onClick={() => gerarExcel(req.requisition_id)}
		// 										disabled={
		// 											req.requisition_id === selectedRequisition
		// 												? false
		// 												: true
		// 										}
		// 										title='Export Excel!'>
		// 										<FaFileExcel />
		// 									</button>
		// 								</td>
		// 								<td>
		// 									<button
		// 										id='email'
		// 										className={
		// 											req.requisition_id === selectedRequisition
		// 												? style.on_email
		// 												: style.off_email
		// 										}
		// 										onClick={() => sendEmail(req.requisition_id)}
		// 										disabled={
		// 											req.requisition_id === selectedRequisition
		// 												? false
		// 												: true
		// 										}
		// 										title='Enviar email!'>
		// 										<RiMailSendLine />
		// 									</button>
		// 								</td>
		// 							</tr>
		// 						)
		// 					})
		// 				) : (
		// 					<tr title={requisitionData.comments}>
		// 						<td>
		// 							<Input
		// 								name='selected'
		// 								type='radio'
		// 								value={requisitionData.requisition_id}
		// 								width='1em'
		// 								hide={requisitionData && false}
		// 								handleChange={() =>
		// 									togleSelected(requisitionData.requisition_id)
		// 								}
		// 							/>
		// 						</td>
		// 						<td>{requisitionData.requisition_id}</td>
		// 						<td>{requisitionData.date}</td>
		// 						<td>{requisitionData.status}</td>
		// 						<td>
		// 							<button
		// 								className={
		// 									requisitionData.requisition_id === selectedRequisition &&
		// 									style.on
		// 								}
		// 								onClick={gerarPdf}
		// 								disabled={
		// 									requisitionData.requisition_id === selectedRequisition
		// 										? false
		// 										: true
		// 								}>
		// 								<PictureAsPdfIcon />
		// 							</button>
		// 						</td>
		// 						<td>
		// 							<button
		// 								id='excel'
		// 								className={
		// 									requisitionData.requisition_id === selectedRequisition
		// 										? style.on_green
		// 										: style.off_green
		// 								}
		// 								onClick={() => gerarExcel(requisitionData.requisition_id)}
		// 								disabled={
		// 									requisitionData.requisition_id === selectedRequisition
		// 										? false
		// 										: true
		// 								}>
		// 								<FaFileExcel />
		// 							</button>
		// 						</td>
		// 					</tr>
		// 				)}
		// 			</tbody>
		// 		</table>
	)
}

export default TableRequisitionConsult
