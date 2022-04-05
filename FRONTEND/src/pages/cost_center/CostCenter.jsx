import React from 'react'
import Container from '../../components/MyContainer'
import FormCostCenter from './FormCostCenter'

function CostCenter() {
	return (
		<>
			<Container>
				<h1 style={{ textAlign: 'center' }}>Centro de Custos</h1>
				<FormCostCenter />
			</Container>
		</>
	)
}

export default CostCenter
