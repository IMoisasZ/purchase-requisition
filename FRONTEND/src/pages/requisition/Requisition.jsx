import React from 'react'
import Container from '../../components/container/MyContainer'
import FormRequisition from './FormRequisition'

function Requisition() {
	return (
		<>
			<Container
				minHeight='69vh'
				maxWidth='100%'
				margin='0 auto'
				padding='0'
				nameH1='Requisição'>
				<FormRequisition />
			</Container>
		</>
	)
}

export default Requisition
