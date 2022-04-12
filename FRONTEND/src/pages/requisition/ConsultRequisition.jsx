import React, { useState } from 'react'
import Input from '../../components/input/MyInput'
import Button from '../../components/button/MyButton'
import Select from '../../components/select/MySelect'

function ConsultRequisition() {
	const [initialDate, setInitialDate] = useState('')
	const [finalDate, setFinalDate] = useState('')
	const [requisitionId, setRequisitionId] = useState('')
	const [product, setProduct] = useState('')
	return (
		<div
			style={{
				width: '80%',
				margin: '1em auto',
				display: 'flex',
				justifyContent: 'space-between',
			}}>
			<div
				style={{
					width: '25%',
					display: 'flex',
					justifyContent: 'space-between',
					border: '1px solid gray',
					borderRadius: '0.5em',
					padding: '1em',
				}}>
				<Input
					name='initial_date'
					label='Data Inicial'
					type='date'
					value={initialDate}
					width='10em'
					handleChange={(e) => setInitialDate(e.target.value)}
				/>
				<Input
					name='final_date'
					label='Data Final'
					type='date'
					value={finalDate}
					width='10em'
					handleChange={(e) => setFinalDate(e.target.value)}
				/>
			</div>
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
			<div>
				<Select
					text='Produto'
					name='product'
					value={product}
					width='14em'
					initial_text='Selecione um produto...'
					handleChange={(e) => setProduct(e.target.value)}></Select>
			</div>
			<Button>Pesquisar</Button>
		</div>
	)
}

export default ConsultRequisition
