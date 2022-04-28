import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import TableRequisitionConsult from './TableRequisitionConsult'
import api from '../../api/api'
import style from './ConsultRequisition.module.css'

function ConsultRequisition() {
	// const [requisitionId, setRequisitionId] = useState('')
	// const [requisitionData, setRequisitionData] = useState([])

	// useEffect(() => {
	// 	try {
	// 		const allRequisitions = async () => {
	// 			if (requisitionId) {
	// 				const result = await api.get(
	// 					`/requisition?requisition_id=${requisitionId}`,
	// 				)
	// 				setRequisitionData(result.data)
	// 			} else {
	// 				const result = await api.get(`/requisition`)
	// 				setRequisitionData(result.data)
	// 			}
	// 		}
	// 		allRequisitions()
	// 	} catch (error) {
	// 		console.log({ error })
	// 	}
	// }, [requisitionId])

	return (
		<>
			<div className={style.container}>
				{/* <div>
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
				</div> */}

				{/* <div>
					<TableRequisitionConsult requisitionData={requisitionData} />
				</div> */}
			</div>
		</>
	)
}

export default ConsultRequisition
