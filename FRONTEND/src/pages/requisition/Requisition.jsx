import React from 'react'
import Container from '../../components/container/MyContainer'
import FormRequisition from './FormRequisition'

function Requisition() {
	return (
		<>
			<Container
				minHeight='40em'
				maxWidth='89.7em'
				margin='0'
				padding='0'
				nameH1='Requisição'>
				<FormRequisition />
			</Container>
		</>
	)
}

export default Requisition
