import React from 'react'
import Container from '../../components/container/MyContainer'
import TableRequisitionConsult from './TableRequisitionConsult'

function ConsultRequisition() {
	return (
		<Container
			nameH1='Consulta Requisição'
			hideIcon={false}
			maxHeight='30%'
			minHeight='30em'
			maxWidth='100%'
			margin='0'
			padding='0'>
			<TableRequisitionConsult />
		</Container>
	)
}

export default ConsultRequisition
