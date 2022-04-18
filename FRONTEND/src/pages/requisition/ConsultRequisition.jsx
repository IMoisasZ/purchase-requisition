import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import TableRequisitionConsult from './TableRequisitionConsult'
import api from '../../api/api'
import style from './ConsultRequisition.module.css'

function ConsultRequisition() {
	const [initialDate, setInitialDate] = useState('')
	const [finalDate, setFinalDate] = useState('')
	const [requisitionId, setRequisitionId] = useState('')
	const [product, setProduct] = useState('')
	const [requisitionData, setRequisitionData] = useState([])

	useEffect(() => {
		try {
			const allRequisitions = async () => {
				const result = await api.get(
					`/requisition?requisition_id=${requisitionId}`,
				)
				if (result) {
					setRequisitionData(result.data)
				} else {
					setRequisitionData('')
				}
			}
			allRequisitions()
		} catch (error) {
			console.log({ error })
		}
	}, [requisitionId])

	return (
		<div className={style.container}>
			<fieldset>
				<legend>Filtros:</legend>
				<div className={style.div_date}>
					<Input
						name='initial_date'
						label='Data Inicial'
						type='date'
						value={initialDate}
						width='8em'
						handleChange={(e) => setInitialDate(e.target.value)}
					/>
					<Input
						name='final_date'
						label='Data Final'
						type='date'
						value={finalDate}
						width='8em'
						handleChange={(e) => setFinalDate(e.target.value)}
					/>
				</div>
				<hr />
				<div>
					<Input
						name='requisition_id'
						label='Requisição'
						type='numeric'
						value={requisitionId}
						width='14em'
						placeholder='Digite o numero da requisição!'
						handleChange={(e) => setRequisitionId(e.target.value)}
					/>
				</div>
				<hr />
				<div>
					<Select
						text='Produto'
						name='product'
						value={product}
						width='21em'
						initial_text='Selecione um produto...'
						handleChange={(e) => setProduct(e.target.value)}></Select>
				</div>
			</fieldset>

			<div>
				<TableRequisitionConsult requisitionData={requisitionData} />
			</div>
		</div>
	)
}

export default ConsultRequisition
