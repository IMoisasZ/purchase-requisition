import React from 'react'
import Container from '../../components/MyContainer'
import FormRequisition from './FormRequisition'

function Requisition() {
	return (
		<>
			<Container minHeight='40em'>
				<h1 style={{ textAlign: 'center', margin: '0' }}>Requisição</h1>
				<FormRequisition />
			</Container>
		</>
	)
}

export default Requisition
